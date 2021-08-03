import React, { Component } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";
import { FONT } from "../../fonts";
import { apiCallForgotPassword } from "../../networkcall";
import SnackView from "../../component/SnackView";
import SmallLoader from "../../component/SmallLoader";

export default class ForgotPassword extends Component {
  state = {
    email: "",
    loading: false,
  };

  onPressBack = () => {
    this.props.navigation.goBack();
  };

  onPressForgotButton = () => {
    this.setState({ loading: true });
    const { email } = this.state;
    apiCallForgotPassword(email)
      .then((res) => {
        this.setState({ loading: false });
        if (res.data.status === true) {
          this.refSnackView.showSnack(res.data.message);
          setTimeout(() => {
            this.props.navigation.goBack();
          }, 800);
        } else {
          this.refSnackView.showSnack(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { email } = this.state;
    return (
      <ImageBackground
        style={styles.container}
        source={IMAGE.splash}
        resizeMode="cover"
      >
        <SafeAreaView />
        {this.renderStatusBar()}
        <View style={styles.navigationView}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this.onPressBack}
          >
            <Image style={styles.backIcon} source={IMAGE.back} />
          </TouchableOpacity>
        </View>
        <View style={styles.loginItemContainer}>
          <Text style={styles.welcomeTxt}>{`Forgot Passowrd`}</Text>
          <Text
            style={styles.welcomeMessage}
          >{`Please enter your email address you will received a link to create a new password via email`}</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputField}
              placeholder="Recovery Email"
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPressForgotButton()}
          >
            <Text style={styles.buttonTxt}>Send</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView />
        <SnackView ref={(refSnackView) => (this.refSnackView = refSnackView)} />
        <SmallLoader loading={this.state.loading} />
      </ImageBackground>
    );
  }

  renderStatusBar() {
    return <StatusBar barStyle="light-content" backgroundColor={COLOR.gold} />;
  }
}
