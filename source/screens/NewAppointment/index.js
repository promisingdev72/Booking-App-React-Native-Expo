import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
  CheckBox,
} from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";

import ServicesCell from "../../component/ServicesCell";
import BarberCell from "../../component/BarberCell";
import SnackView from "../../component/SnackView";
import SmallLoader from "../../component/SmallLoader";
import PayPalWebView from "./PayPalWebview";

import {
  userData,
  apiCallBookAppointment,
  apiCallUpdateBooking,
} from "../../networkcall";

import { Calendar } from "react-native-calendars";

import moment from "moment";
import { FONT } from "../../fonts";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    const key = moment().format("YYYY-MM-DD");
    const item = {};
    item[key] = { selected: true, selectedColor: COLOR.gold };
    this.state = {
      loading: false,
      check: false,
      selected_index: 0,
      selected: -1,
      selected_barber: -1,
      selected_services: [],
      selected_date: moment().format("YYYY-MM-DD"),
      selected_times: [],
      timing: [
        "08:00-10:30",
        "10:30-13:00",
        "13:00-15:30",
        "15:30-18:00",
      ],
      marked_date: item,
      name: "",
      email: "",
      phone: "",
      coupon: "",
      is_student: 0,
      service_time_sum: "",
    };
  }

  componentDidMount() {
    this.onLoad();
  }

  onLoad() {
    userData().then((data) => {
      this.setState({
        name: data.username,
        email: data.email,
        phone: data.phone,
        // coupon: data.coupon,
        // is_student: data.is_student,
      });
    });
  }

  onPressPrevious = () => {
    const { selected_index } = this.state;
    if (selected_index > 0) {
      this.setState({
        selected_index: selected_index - 1,
      });
    }
  };

  onPressNext = (for_payment, data) => {
    const {
      selected_index,
      selected_barber,
      selected_services,
      selected_times,
    } = this.state;

    if (selected_index == 0 && selected_services.length == 0) {
      this.refSnackView.showSnack("Please select services");
      return;
    }

    if (selected_index == 1 && selected_barber == -1) {
      this.refSnackView.showSnack("Please select barber");
      return;
    }

    if (selected_index == 3 && selected_times.length == 0) {
      this.refSnackView.showSnack("Please select select time");
      return;
    }

    if (selected_index < 4) {
      this.setState({
        selected_index: selected_index + 1,
      });
    } else if (selected_index == 4) {
      const { name, email, phone, selected_date } = this.state;
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (name.trim() == "") {
        this.refSnackView.showSnack("Please enter your name");
      } else if (phone.trim() == "") {
        this.refSnackView.showSnack("Please enter phone");
      } else if (phone.length < 10) {
        this.refSnackView.showSnack("Please enter valid mobile number");
        return;
      } else if (email.trim() == "") {
        this.refSnackView.showSnack("Please enter email");
      } else if (!reg.test(email)) {
        this.refSnackView.showSnack("Please enter valid email address");
      } else {
        
        var barbar = selected_barber + 1;
        var services = selected_services
          .map((e) => {
            return services_data[e].name;
          })
          .join(",");
        var times = selected_times.join(",");
        var total = 0.0;
        selected_services.map((a) => (total += services_data[a].price));

        if (!for_payment) {
          
          this.setState({ loading: true });
          console.log(":::data:::", data);
          apiCallUpdateBooking(
            data?.user_id,
            data?.booking_id,
            data?.transaction_no,
            "success"
          )
            .then((res) => {
              this.setState({ loading: false });
              if (res.status === 200) {
                this.props.navigation.navigate("BookedAppointment", {
                  name: data.username,
                  services: data.service_items.join(","),
                  times: data.time,
                  date: selected_date,
                  total: data.total_price,
                });
              } else {
                this.refSnackView.showSnack(message);
              }
            })
            .catch((err) => {
              this.setState({ loading: false });
              console.log(err);
            });

          return;
        }

        // var total = 0.0;
        // selected_services.map((a) => (total += services_data[a].price));

        this.setState({ loading: true });
        userData().then((data) => {
          console.log(
            data.id,
            selected_date,
            services,
            times,
            barbar,
            "",
            total,
            this.state.check ? 1 : 0,
            this.state.coupon,
            total
          );
          apiCallBookAppointment(
            data.id,
            selected_date,
            services,
            times,
            barbar,
            total,
            this.state.check ? 1 : 0,
            this.state.coupon,
            total
          )
            .then((response) => {
              console.log("Response====>", response);
              this.setState({ loading: false });
              let data = response.data;
              let status = data.status;
              let message = data.message;

              if (response.status == 200 && response.data?.data?.total_price) {
                // this.props.navigation.navigate("BookedAppointment", {
                //   name: name,
                //   services: services,
                //   times: times,
                //   date: selected_date,
                //   total: total,
                // });

                this.props.navigation.navigate("PayPalWebview", {
                  amount: response.data.data.total_price,
                  email: email,
                  name: name,
                  services: services,
                  phone: phone,
                  date: selected_date,
                  times:times,
                  // email: response.data.data.
                  onReturn: (transaction_no) => {
                    this.onPressNext(false, {
                      ...response.data.data,
                      transaction_no,
                    });
                  },
                });
              } else {
                this.refSnackView.showSnack(message);
              }
            })
            .catch((error) => {
              console.log(error);
              this.setState({ loading: false });
            });
        });
      }
    }
  };

  render() {
    const { selected_index } = this.state;
    return (
      // <View style={styles.container}>
      //   {this.renderStatusBar()}
      //   {this.renderProgressView()}
      //   {selected_index == 0 && this.renderServices()}
      //   {selected_index == 1 && this.renderBarber()}
      //   {selected_index == 2 && this.renderCalender()}
      //   {selected_index == 3 && this.renderTimes()}
      //   {selected_index == 4 && this.renderPayments()}
      //   {this.renderFotter()}
      //   <SnackView ref={(refSnackView) => (this.refSnackView = refSnackView)} />
      //   <SmallLoader loading={this.state.loading} />
      //   <SafeAreaView />
      // </View>
      <PayPalWebView navigation = {this.props.navigation} />
    );
  }

  renderStatusBar() {
    if (Platform.OS == "ios") {
      return <StatusBar barStyle="light-content" />;
    } else {
      return (
        <StatusBar
          currentHeight={20}
          barStyle="light-content"
          backgroundColor={COLOR.gold}
        />
      );
    }
  }

  renderProgressView() {
    const { selected_index } = this.state;

    const onMenuPress = () => {
      this.props.openDrawer();
    };
    return (
      <>
        <SafeAreaView />
        <View style={styles.navigationView}>
          <TouchableOpacity
            onPress={() => {
              onMenuPress();
            }}
            style={styles.navigationMenuContainer}
          >
            <Image source={IMAGE.menu} style={styles.navigationMenu} />
          </TouchableOpacity>
          <Text style={styles.navigationTitle}>Book an appointment</Text>
        </View>
        <View style={styles.progressView}>
          <View
            style={[
              styles.progressImage,
              {
                backgroundColor: selected_index == 0 ? COLOR.gold : "#fff",
              },
            ]}
          >
            <Image
              style={[
                styles.progressIcon,
                {
                  tintColor: selected_index == 0 ? "#fff" : "#000",
                },
              ]}
              source={IMAGE.check}
            />
          </View>
          <View style={styles.progressLine} />
          <View
            style={[
              styles.progressImage,
              {
                backgroundColor: selected_index == 1 ? COLOR.gold : "#fff",
              },
            ]}
          >
            <Image
              style={[
                styles.progressIcon,
                {
                  tintColor: selected_index == 1 ? "#fff" : "#000",
                },
              ]}
              source={IMAGE.check}
            />
          </View>
          <View style={styles.progressLine} />
          <View
            style={[
              styles.progressImage,
              {
                backgroundColor: selected_index == 2 ? COLOR.gold : "#fff",
              },
            ]}
          >
            <Image
              style={[
                styles.progressIcon,
                {
                  tintColor: selected_index == 2 ? "#fff" : "#000",
                },
              ]}
              source={IMAGE.check}
            />
          </View>
          <View style={styles.progressLine} />
          <View
            style={[
              styles.progressImage,
              {
                backgroundColor: selected_index == 3 ? COLOR.gold : "#fff",
              },
            ]}
          >
            <Image
              style={[
                styles.progressIcon,
                {
                  tintColor: selected_index == 3 ? "#fff" : "#000",
                },
              ]}
              source={IMAGE.check}
            />
          </View>
          <View style={styles.progressLine} />
          <View
            style={[
              styles.progressImage,
              {
                backgroundColor: selected_index == 4 ? COLOR.gold : "#fff",
              },
            ]}
          >
            <Image
              style={[
                styles.progressIcon,
                {
                  tintColor: selected_index == 4 ? "#fff" : "#000",
                },
              ]}
              source={IMAGE.check}
            />
          </View>
        </View>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressTxt}>{`Select\nServices`}</Text>
          <Text style={styles.progressTxt}>{`Select\nBarber`}</Text>
          <Text style={styles.progressTxt}>{`Select\nDate`}</Text>
          <Text style={styles.progressTxt}>{`Select\nTime`}</Text>
          <Text style={styles.progressTxt}>{`Set\nPayment`}</Text>
        </View>
      </>
    );
  }

  renderServices() {
    const { selected_services } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={services_data}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ServicesCell
                item={item}
                index={index}
                selected={selected_services}
                onPress={(index) => {
                  if (selected_services.includes(index)) {
                    var array = selected_services.filter((e) => {
                      return e != index;
                    });
                    this.setState({ selected_services: array });
                  } else {
                    selected_services.push(index);
                    this.setState({ selected_services: selected_services });
                  }
                }}
              />
            );
          }}
        />
      </View>
    );
  }

  renderBarber() {
    const { selected_barber } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={barbers_data}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <BarberCell
                item={item}
                index={index}
                selected={selected_barber}
                onPress={(index) => {
                  this.setState({ selected_barber: index });
                }}
              />
            );
          }}
        />
      </View>
    );
  }

  renderCalender() {
    const { marked_date } = this.state;
    return (
      <View
        style={[
          styles.container,
          {
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
        ]}
      >
        <Calendar
          markedDates={marked_date}
          onDayPress={(day) => {
            const key = day.dateString;
            const item = {};
            item[key] = { selected: true, selectedColor: COLOR.gold };
            this.setState({
              selected_date: key,
              marked_date: item,
            });
          }}
          theme={{
            calendarBackground: "transparent",
            dayTextColor: "#fff",
            textSectionTitleColor: "#fff",
            selectedDayBackgroundColor: "#7D1723",
            selectedDayTextColor: "#fff",
            textDisabledColor: "#808080",
            todayTextColor: "#fff",
            arrowColor: "#fff",
            disabledArrowColor: "#d9e1e8",
            monthTextColor: "#fff",
            indicatorColor: "#fff",
          }}
        />
      </View>
    );
  }

  renderTimes() {
    const { timing, selected_times } = this.state;
    return (
      <View style={[styles.container, { marginTop: 10 }]}>
        <FlatList
          data={timing}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  
                  let selected_times = [];
                  this.setState({ selected_times: [item] });
                }}
              >
                {selected_times.includes(item) ? (
                  <View
                    style={[styles.timingView, { backgroundColor: COLOR.gold }]}
                  >
                    <Text style={[styles.timingTxt, { color: "#fff" }]}>
                      {item}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.timingView}>
                    <Text style={styles.timingTxt}>{item}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  onPressCheckBox = () => {
    this.setState({ check: !this.state.check });
  };

  renderPayments() {
    const { name, email, phone, coupon, check } = this.state;

    const renderLabel = (label) => {
      return <Text style={styles.label}>{label}</Text>;
    };

    return (
      <ScrollView>
        <View style={[styles.container, { marginTop: 20 }]}>
          {renderLabel("Name")}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputField}
              placeholder="Your Name"
              value={name}
              onChangeText={(text) => this.setState({ name: text })}
            />
          </View>
          {renderLabel("Phone no.")}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputField}
              placeholder="Phone"
              value={phone}
              keyboardType="number-pad"
              onChangeText={(text) => this.setState({ phone: text })}
            />
          </View>
          {renderLabel("Email")}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          {renderLabel("Discount Coupon")}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputField}
              placeholder="Discount Coupon"
              value={coupon}
              onChangeText={(text) => this.setState({ coupon: text })}
            />
          </View>
          <View style={styles.checkBoxContainer}>
            <TouchableOpacity
              onPress={() => this.onPressCheckBox()}
              style={styles.checkButton}
            >
              {check && (
                <Image
                  source={IMAGE.check}
                  resizeMode={"contain"}
                  style={{ height: 10, width: 10 }}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>
              Please click here only if you are student
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  renderFotter() {
    const { selected_index, selected_services } = this.state;
    var total = 0.0;
    selected_services.map((a) => (total += services_data[a].price));
    if (this.state.check) {
      total = total - (total * 10) / 100;
    }
    return (
      <View style={styles.fotterView}>
        <Text style={styles.fotterText}>{`£ ${total.toFixed(2)}`}</Text>
        {selected_index > 0 && (
          <TouchableOpacity
            style={[styles.button, { marginRight: 10 }]}
            onPress={this.onPressPrevious}
          >
            <Text style={styles.buttonTxt}>Previous</Text>
          </TouchableOpacity>
        )}
        {selected_index < 4 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.onPressNext(true, "");
            }}
          >
            <Text style={styles.buttonTxt}>Next</Text>
          </TouchableOpacity>
        )}
        {selected_index == 4 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.onPressNext(true, "");
            }}
          >
            <Text style={styles.buttonTxt}>Book</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

let barbers_data = [
  {
    name: "Cristian",
    pic: IMAGE.barber_three,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
  },
  {
    name: "TCB",
    pic: IMAGE.tcb,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
  },
  {
    name: "TCB1",
    pic: IMAGE.tcb,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
  },
  {
    name: "TCB2",
    pic: IMAGE.tcb,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting",
  },
];

let services_data = [
  { name: "Haircut", priceTxt: "£ 22.00", price: 22.0 },
  { name: "Skin Fade With Haircut", priceTxt: "£ 25.00", price: 25.0 },
  { name: "Beard Trim", priceTxt: "£ 8.00", price: 8.0 },
  { name: "Beard trim Hot towel treatment", priceTxt: "£ 15.00", price: 15.0 },
  { name: "Eyebrows", priceTxt: "£ 8.00", price: 8.0 },
  { name: "Under 16", priceTxt: "£ 18.00", price: 18.0 },
  { name: "Scissors cut", priceTxt: "£ 28.00", price: 28.0 },
  { name: "Bold Haircut", priceTxt: "£ 16.00", price: 16.0 },
  { name: "Only sides and back", priceTxt: "£ 18.00", price: 18.0 },
];
