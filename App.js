import React, { Component } from "react";
import { ActivityIndicator, View, LogBox } from "react-native";
import * as Font from "expo-font";
LogBox.ignoreAllLogs(true);
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Splash from "./source/screens/Welcome";
import Login from "./source/screens/Login";
import Register from "./source/screens/Register";
import ForgotPassword from "./source/screens/ForgotPassword";
import Tabbar from "./source/screens/Tabbar";
import BookedAppointment from "./source/screens/BookedAppointment";
import PayPalWebview from "./source/screens/NewAppointment/PayPalWebview";
import Webview from "./source/screens/Register/Webview";
import ChangePassword from "./source/screens/ChangePassword.js";

export default class App extends Component {
  state = {
    loaded: false,
  };

  _loadFontsAsync = async () => {
    // loadAsync returns true | error
    await Font.loadAsync({
      Poppins_Light: require("./assets/fonts/Poppins-Light.ttf"),
      Poppins_Medium: require("./assets/fonts/Poppins-Medium.ttf"),
      Poppins_Regular: require("./assets/fonts/Poppins-Regular.ttf"),
      Poppins_SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    });
    this.setState({ loaded: true });
  };

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View
          style={{
            flex: 1.0,
            backgroundColor: "#000",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            color="#fff"
            animating={true}
          />
        </View>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
          <Stack.Screen
            name="BookedAppointment"
            component={BookedAppointment}
          />
          <Stack.Screen name="PayPalWebview" component={PayPalWebview} />
          <Stack.Screen name="Webview" component={Webview} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
