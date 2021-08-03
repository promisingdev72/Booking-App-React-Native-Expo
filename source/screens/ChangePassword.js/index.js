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
import { apiCallChangePassword } from "../../networkcall";
import SnackView from "../../component/SnackView";
import SmallLoader from "../../component/SmallLoader";

export default class ChangePassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    loading: false,
  };

  onPressBack = () => {
    this.props.navigation.goBack();
  };

  onPressChangePassword = () => {
    this.setState({ loading: true });
    const { password, confirmPassword } = this.state;
    apiCallChangePassword(password, confirmPassword)
      .then((res) => {
        this.setState({ loading: false });
        if (res.data.status == true) {
          this.refSnackView.showSnack(res.data.message);
          setTimeout(() => {
            this.props.navigation.goBack();
          }, 800);
        } else {
          this.refSnackView.showSnack(res.data.message);
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    const { password, confirmPassword } = this.state;
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
          <Text style={styles.welcomeTxt}>{`Change Passowrd`}</Text>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputField}
              placeholder="New Password"
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputField}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => this.setState({ confirmPassword: text })}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPressChangePassword()}
          >
            <Text style={styles.buttonTxt}>Change Passowrd</Text>
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
