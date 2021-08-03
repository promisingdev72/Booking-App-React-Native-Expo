import React, { Component } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";

import { userData, apiCallGetBookingDetails } from "../../networkcall";

import AppointmentCell from "../../component/AppointmentCell";
import SnackView from "../../component/SnackView";
import SmallLoader from "../../component/SmallLoader";
const image = { uri: "https://reactjs.org/logo-og.png" };
export default class Appointment extends Component {
  state = {
    selectedTab: 1,
    loading: true,
    data: [],
    data_history: [],
  };

  componentDidMount() {
    this.onLoad();
  }

  onLoad() {
    this.setState({ loading: true });
    userData().then((data) => {
      apiCallGetBookingDetails(data.id, 0)
        .then((response) => {
          this.setState({ loading: false });
          let data = response.data;
          let status = data.status;
          let message = data.message;
          if (status) {
            this.setState({
              data: data.data,
              loading: false,
            });
          } else {
            this.setState(
              {
                data: [],
                loading: false,
              },
              () => {
                this.refSnackView.showSnack(message);
              }
            );
          }
        })
        .catch((error) => {
          this.setState(
            {
              data: [],
              loading: false,
            },
            () => {
              this.refSnackView.showSnack(error.message);
            }
          );
        });
    });
  }

  loadHistory() {
    this.setState({ loading: true });
    userData().then((data) => {
      apiCallGetBookingDetails(data.id, 1)
        .then((response) => {
          this.setState({ loading: false });
          let data = response.data;
          let status = data.status;
          let message = data.message;
          if (status) {
            this.setState({
              data_history: data.data,
              loading: false,
            });
          } else {
            this.setState(
              {
                data_history: [],
                loading: false,
              },
              () => {
                this.refSnackView.showSnack(message);
              }
            );
          }
        })
        .catch((error) => {
          this.setState(
            {
              data_history: [],
              loading: false,
            },
            () => {
              this.refSnackView.showSnack(error.message);
            }
          );
        });
    });
  }

  onMenuPress = () => {
    this.props.openDrawer();
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <View style={styles.container} source={IMAGE.splash} resizeMode="cover">
        <SafeAreaView />
        {this.renderStatusBar()}
        <View style={styles.navigationView}>
          <TouchableOpacity
            onPress={() => {
              this.onMenuPress();
            }}
            style={styles.navigationMenuContainer}
          >
            <Image source={IMAGE.menu} style={styles.navigationMenu} />
          </TouchableOpacity>
          <Text style={styles.navigationTitle}>Shop</Text>
        </View>
        <View style={styles.container}>
          <ImageBackground source={IMAGE.background_appo} style={styles.image}>
            <Text style={styles.text1}>Coming soon</Text>
            <Text style={styles.text2}>+447400 441991</Text>
            <Text style={styles.text3}>201 Whitecross Street EC1Y</Text>
            <Text style={styles.text3}>8QP London</Text>
          </ImageBackground>
        </View>
        {/* <View style={styles.topTabContainer}>
          <TouchableOpacity
            style={selectedTab == 1 ? styles.tabSelected : styles.tabDeselected}
            onPress={() => {
              this.setState({
                selectedTab: 1,
              });
              this.onLoad();
            }}
          >
            <Text
              style={selectedTab == 1 ? styles.tabSelectedTxt : styles.tabTxt}
            >
              {"UPCOMING"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedTab == 2 ? styles.tabSelected : styles.tabDeselected}
            onPress={() => {
              this.setState({
                selectedTab: 2,
              });
              this.loadHistory();
            }}
          >
            <Text
              style={selectedTab == 2 ? styles.tabSelectedTxt : styles.tabTxt}
            >
              {"PREVIOUS"}
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* {selectedTab == 1 ? this.renderUpcoming() : this.renderPrevious()} */}
        <SnackView ref={(refSnackView) => (this.refSnackView = refSnackView)} />
        <SafeAreaView />
      </View>
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

  renderUpcoming() {
    const { loading, data, data_history } = this.state;

    if (loading) {
      return (
        <View style={{ justifyContent: "center", height: 100 }}>
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            color="#fff"
            animating={true}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <AppointmentCell
                  item={item}
                  index={index}
                  onPress={(item) => {
                    this.props.navigation.navigate("BookedAppointment", {
                      name: item.barbar_name,
                      services: item.service_name,
                      times: item.time,
                      date: item.booking_date,
                      total: item.price,
                      is_from_appointment: true,
                    });
                  }}
                />
              );
            }}
          />
        ) : (
          <Text style={styles.emptyView}>No upcoming appointment found</Text>
        )}
      </View>
    );
  }

  renderPrevious() {
    const { loading, data_history } = this.state;

    if (loading) {
      return (
        <View style={{ justifyContent: "center", height: 100 }}>
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            color="#333"
            animating={true}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {data_history.length > 0 ? (
          <FlatList
            data={data_history}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <AppointmentCell
                  item={item}
                  index={index}
                  onPress={(item) => {
                    this.props.navigation.navigate("BookedAppointment", {
                      name: item.barbar_name,
                      services: item.service_name,
                      times: item.time,
                      date: item.booking_date,
                      total: item.price,
                      is_from_appointment: true,
                    });
                  }}
                />
              );
            }}
          />
        ) : (
          <Text style={styles.emptyView}>No appointment history found</Text>
        )}
      </View>
    );
  }
}
