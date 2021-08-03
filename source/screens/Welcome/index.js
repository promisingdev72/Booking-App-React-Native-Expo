import React, { Component } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";
import { isLogin } from "../../networkcall";
import { CommonActions } from "@react-navigation/native";

export default class Welcome extends Component {
  onPress = () => {
    this.props.navigation.navigate("Login");
  };

  componentDidMount() {
    isLogin().then((flag) => {
      if (flag) {
        this.props.navigation.dispatch((state) => {
          //Navigate Tabbar screen
          return CommonActions.reset({
            index: 0,
            routes: [{ name: "Tabbar" }],
          });
        });
      }
    });
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={IMAGE.getStartedScreen}
        resizeMode="cover"
      >
        {this.renderStatusBar()}
        <View style={styles.container}>
          <Image style={styles.logo} resizeMode="contain" source={IMAGE.logo} />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text style={styles.buttonTxt}>Get Started</Text>
        </TouchableOpacity>
        <SafeAreaView />
      </ImageBackground>
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
