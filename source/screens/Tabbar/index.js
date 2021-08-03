import React, { Component } from "react";
import { View, Image, Text, SafeAreaView, StatusBar } from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";

import Drawer from "react-native-drawer";
import { EventRegister } from "react-native-event-listeners";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { apiCallUpdateDeviceToken } from "../../networkcall";

import News from "../News";
import Appointment from "../Appointment";
import NewAppointment from "../NewAppointment";
import Products from "../Products";
import Profile from "../Profile";
import Menu from "../Menu";

import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();

export default class Tabbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expoPushToken: "",
    };

    this.registerForPushNotificationsAsync().then((token) =>
      this.setState({ expoPushToken: token }, () => {
        apiCallUpdateDeviceToken(token).then((response) => {
          console.log(response.data);
        });
      })
    );

    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // setNotification(notification);
        console.log(notification.request.content.title);
        console.log(notification.request.content.body);
      }
    );

    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        };
      },
    });

    this.responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener("open_drawer", () => {
      this.drawerOpen();
    });
  }

  registerForPushNotificationsAsync = async () => {
    let token;

    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    console.log(token);
    return token;
  };

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
  }

  drawerOpen() {
    EventRegister.emit("myCustomEvent", "it works!!!");
    this._drawer.open();
    this._menu.fetchUserData();
  }

  drawerClose() {
    this._drawer.close();
  }

  render() {
    return (
      <Drawer
        styles={{
          drawer: {
            shadowColor: "#000000",
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 4,
          },
        }}
        ref={(ref) => (this._drawer = ref)}
        type="overlay"
        negotiatePan={true}
        acceptTap={true}
        openDrawerOffset={0.2}
        panOpenMask={0.5}
        tapToClose={true}
        onOpen={() => {}}
        content={
          <Menu
            ref={(ref) => (this._menu = ref)}
            onClose={() => {
              this.drawerClose();
            }}
            navigation={this.props.navigation}
          />
        }
      >
        <View style={{ flex: 1.0, backgroundColor: "#000" }}>
          {this.mainView()}
        </View>
      </Drawer>
    );
  }

  mainView() {
    return (
      <Tab.Navigator
        initialRouteName={"News"}
        tabBarOptions={{
          allowFontScaling: false,
          showLabel: false,
          style: {
            backgroundColor: "#000",
            // height: 56
          },
        }}
      >
        {this.renderNews()}
        {this.renderAppointMent()}
        {this.renderNewAppointment()}
        {this.renderProducts()}
        {this.renderProfile()}
      </Tab.Navigator>
    );
  }

  _this = this;
  renderNews() {
    return (
      <Tab.Screen
        name="Home"
        children={() => (
          <News
            openDrawer={() => {
              this._this.drawerOpen();
            }}
            navigation={this.props.navigation}
          />
        )}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => {
            return renderImage(focused, IMAGE.home, "Home");
          },
        }}
      />
    );
  }
  
  renderAppointMent() {
    return (
      <Tab.Screen
        name="Appointment"
        children={() => (
          <Appointment
            openDrawer={() => {
              this._this.drawerOpen();
            }}
            navigation={this.props.navigation}
          />
        )}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => {
            return renderImage(focused, IMAGE.calender, "Appointment");
          },
        }}
      />
    );
  }

  renderNewAppointment() {
    return (
      <Tab.Screen
        name="NewAppointment"
        children={() => (
          <NewAppointment
            openDrawer={() => {
              this._this.drawerOpen();
            }}
            navigation={this.props.navigation}
          />
        )}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => {
            return renderImage(focused, IMAGE.new_appo, "New Appointment");
          },
        }}
      />
    );
  }

  renderProducts() {
    return (
      <Tab.Screen
        name="Products"
        children={() => (
          <Products
            openDrawer={() => {
              this._this.drawerOpen();
            }}
            navigation={this.props.navigation}
          />
        )}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => {
            return renderImage(focused, IMAGE.product, "Products");
          },
        }}
      />
    );
  }

  renderProfile() {
    return (
      <Tab.Screen
        name="Profile"
        children={() => (
          <Profile
            openDrawer={() => {
              this._this.drawerOpen();
            }}
            navigation={this.props.navigation}
          />
        )}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => {
            return renderImage(focused, IMAGE.profile, "Profile");
          },
        }}
      />
    );
  }
}

function renderImage(focused, image, title) {
  return (
    <View style={{ flex: 1.0, justifyContent: "center" }}>
      {title == "New Appointment" ? (
        <View style={styles.tabround}>
          <Image
            style={styles.tabroundImage}
            source={image}
            resizeMode={"contain"}
          />
        </View>
      ) : (
        <View style={{ marginTop: 4 }}>
          <Image
            style={focused == false ? styles.image : styles.imageTint}
            source={image}
            resizeMode={"contain"}
          />
        </View>
      )}
    </View>
  );
}
