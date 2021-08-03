import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, Platform, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Image, StatusBar } from 'react-native';

import { CommonActions } from '@react-navigation/native';

import styles from './styles'
import { COLOR } from '../../colors'
import { IMAGE } from '../../images'
import { FONT } from '../../fonts'
import { Storage } from '../../constants/GPStorage'
import { apiCallSignUp } from '../../networkcall'
import SnackView from '../../component/SnackView'
import SmallLoader from '../../component/SmallLoader'
import { ScrollView } from 'react-native-gesture-handler';


export default class Register extends Component {

  state = {
    username: '',
    email: '',
    number: '',
    password: '',
    confirm_password: '',
    loading: false,
    is_accept_policy: false
  }

  onPressBack = () => {
    this.props.navigation.goBack()
  }

  onPressPolicies = () => {
    this.props.navigation.navigate('Webview')
  }

  onPressAccept = () => {
    const { is_accept_policy } = this.state
    this.setState({
      is_accept_policy: !is_accept_policy
    })
  }

  onPressSignup = () => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!this.state.username) {
      this.refSnackView.showSnack("Please enter user name");
      return
    }

    if (!this.state.email) {
      this.refSnackView.showSnack("Please enter email address");
      return
    } else if (!reg.test(this.state.email)) {
      this.refSnackView.showSnack("Please enter valid email address");
      return
    }

    if (!this.state.number) {
      this.refSnackView.showSnack("Please enter phone number");
      return
    }
    else if (this.state.number.length < 10) {
      this.refSnackView.showSnack('Please enter valid mobile number')
      return
    }

    if (!this.state.password) {
      this.refSnackView.showSnack("Please enter password");
      return
    }

    if (!this.state.confirm_password) {
      this.refSnackView.showSnack("Please enter confirm password");
      return
    }

    if (this.state.password != this.state.confirm_password) {
      this.refSnackView.showSnack('Password and Confirm password dose not match')
      return
    }


    this.setState({ loading: true });
    apiCallSignUp(
      this.state.username,
      this.state.number,
      this.state.email,
      this.state.password)
      .then((response) => {
        this.setState({ loading: false })

        console.log(response.data);
        let data = response.data;
        let status = data.status;
        let message = data.message;

        if (status) {
          let userData = data.data[0];
          Storage.setAsyncItem('userData', { 'data': userData })  //Store session
          this.props.navigation.dispatch(state => {          //Navigate Tabbar screen
            return CommonActions.reset({
              index: 0,
              routes: [{ name: 'Tabbar' }]
            })
          })
        } else {
          this.refSnackView.showSnack(message)
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false })
      })

  }

  render() {
    const { username, email, number, password, confirm_password, is_accept_policy } = this.state
    return (

      <ImageBackground style={styles.container}
        source={IMAGE.splash}
        resizeMode='cover'>
        <KeyboardAvoidingView
          style={{ flex: 1.0 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
          enabled={Platform.OS === "ios" ? true : false}>
          <SafeAreaView />
          <ScrollView contentContainerStyle={{ flex: 1.0 }}>
            {this.renderStatusBar()}
            <View style={styles.navigationView}>
              <TouchableOpacity style={styles.backButton}
                onPress={this.onPressBack}>
                <Image style={styles.backIcon}
                  source={IMAGE.back} />
              </TouchableOpacity>
            </View>
            <View style={styles.loginItemContainer}>
              <Text style={styles.welcomeTxt}>{`Sign up`}</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder='Username'
                  value={username}
                  onChangeText={(text) => this.setState({ username: text })} />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder='Email'
                  value={email}
                  keyboardType='email-address'
                  onChangeText={(text) => this.setState({ email: text })} />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder='Mobile Number'
                  value={number}
                  keyboardType='phone-pad'
                  onChangeText={(text) => this.setState({ number: text })} />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder='Password'
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ password: text })} />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputField}
                  placeholder='Confirm Password'
                  value={confirm_password}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ confirm_password: text })} />
              </View>
              <View style={[styles.privacyContainer]}>
                <TouchableOpacity style={styles.privacyBox}
                  onPress={this.onPressAccept}>
                  {is_accept_policy == true &&
                    <Image
                      style={styles.checkboxImage}
                      source={IMAGE.check} />
                  }
                </TouchableOpacity>
                <Text style={styles.singupMessage}>{`accept our `}</Text>
                <TouchableOpacity
                  onPress={this.onPressPolicies}>
                  <Text style={styles.privayTxt}>{`Privacy Policies`}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button}
                onPress={this.onPressSignup}>
                <Text style={styles.buttonTxt}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.singupContainer}
          onPress={this.onPressBack}>
          <Text style={styles.singupMessage}>{`Already have an account? `}</Text>
          <Text style={styles.singupTxt}>{`Log in`}</Text>
        </TouchableOpacity>
        <SafeAreaView />
        <SnackView ref={(refSnackView) => this.refSnackView = refSnackView} />
        <SmallLoader loading={this.state.loading} />
      </ImageBackground>

    )
  }

  renderStatusBar() {
    return (
      <StatusBar
        barStyle='light-content'
        backgroundColor={COLOR.gold} />
    )
  }
}
