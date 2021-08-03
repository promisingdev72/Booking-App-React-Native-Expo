import React, { Component } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import styles from "./styles";
import { userData, apiCallGetUserDetail } from "../../networkcall";
import { COLOR } from "../../colors";
import { IMAGE } from "../../images";
import { CommonActions } from "@react-navigation/native";
import { Storage } from "../../constants/GPStorage";
import { EventRegister } from "react-native-event-listeners";

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      profile_image: "",
    };
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener("myCustomEvent", (datas) => {
      this.fetchUserData();
    });

    this.fetchUserData();
  }

  fetchUserData() {
    apiCallGetUserDetail()
      .then((response) => {
        this.setState({ loading: false });
        let data = response.data;
        let status = data.status;
        let message = data.message;
        if (status) {
          let user_data = data.data[0];
          this.setState({
            user_name: user_data.username,
            profile_image: user_data.profile_image,
          });
        } else {
          userData()
            .then((data) => {
              this.setState({
                user_name: data.username,
                profile_image: data.profile_image,
              });
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        userData()
          .then((data) => {
            this.setState({
              user_name: data.username,
              profile_image: data.profile_image,
            });
          })
          .catch((error) => console.log(error));
      });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  onPress = () => {
    this.props.navigation.navigate("Login");
  };

  navigation = this.props.navigation;

  menuItems = [
    {
      label: "Home",
      icon: IMAGE.home,
      callBack: () => {
        this.navigation.navigate("Home");
      },
    },
    {
      label: "Shop",
      icon: IMAGE.calender,
      callBack: () => {
        this.navigation.navigate("Appointment");
      },
    },
    {
      label: "Book an appointment",
      icon: IMAGE.new_appo,
      callBack: () => {
        this.navigation.navigate("NewAppointment");
      },
    },
    {
      label: "Services",
      icon: IMAGE.product,
      callBack: () => {
        this.navigation.navigate("Products");
      },
    },
    {
      label: "Change Password",
      icon: IMAGE.changePassword,
      callBack: () => {
        this.navigation.navigate("ChangePassword");
      },
    },
    {
      label: "My Account",
      icon: IMAGE.profile,
      callBack: () => {
        this.navigation.navigate("Profile");
      },
    },
    {
      label: "Logout",
      icon: IMAGE.logout,
      callBack: () => {
        Storage.clearAsyncItem("userData");
        this.navigation.dispatch((state) => {
          //Navigate Tabbar screen
          return CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        });
      },
    },
  ];

  render() {
    let navigation = this.navigation;

    return (
      <View style={styles.container} source={IMAGE.splash} resizeMode="cover">
        {this.renderStatusBar()}
        <SafeAreaView />

        {this.renderProfilePic()}
        {this.renderMenu()}
      </View>
    );
  }

  renderMenu() {
    return (
      <View style={{ flex: 1.0 }}>
        <ScrollView contentContainerStyle={{ flex: 1.0 }}>
          <View style={{ flex: 1.0 }}>
            {this.menuItems.map((element) => (
              <View style={styles.menuItemBg}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.onClose(), element.callBack();
                  }}
                  style={styles.menuSideBar}
                >
                  <Image
                    source={element.icon}
                    style={styles.sidebarMenuImage}
                  />
                  <Text style={styles.menuText}>{element.label}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <Image source={IMAGE.logo} style={styles.sideBarLogo} />
      </View>
    );
  }

  renderProfilePic() {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => {
          this.props.onClose();
          this.navigation.navigate("Profile");
        }}
        style={styles.userProPicContainer}
      >
        {this.state.profile_image ? (
          <View>
            <Image
              style={styles.userProPic}
              source={{ uri: this.state.profile_image }}
            />
          </View>
        ) : null}

        {!this.state.profile_image ? (
          <View>
            <Image
              style={styles.userProPicPlaceHolder}
              source={IMAGE.propic_place}
            />
          </View>
        ) : null}

        <View style={{ flex: 1.0 }}>
          <Text style={styles.userName}>{this.state.user_name}</Text>
          <Text style={styles.my_account}>My Account</Text>
        </View>
        <Image source={IMAGE.next} style={styles.next} />
      </TouchableOpacity>
    );
  }

  renderStatusBar() {
    return (
      <StatusBar
        currentHeight={20}
        barStyle="light-content"
        backgroundColor={COLOR.gold}
      />
    );
  }
}
