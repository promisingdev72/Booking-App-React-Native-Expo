import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity, Text, View, SafeAreaView, TextInput, StatusBar } from 'react-native';

import { CommonActions } from '@react-navigation/native';

import styles from './styles'
import { COLOR } from '../../colors'
import { IMAGE } from '../../images'
import { FONT } from '../../fonts'
import { Storage } from '../../constants/GPStorage'
import { apiCallLogin } from '../../networkcall'
import SnackView from '../../component/SnackView'
import SmallLoader from '../../component/SmallLoader'


export default class Login extends Component {

  state = {
    username: '',
    password: '',
    loading: false
  }

  onPressForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword')
  }

  onPressLogin = () => {

    if (!this.state.username) {
      this.refSnackView.showSnack("Please enter email address");
      return
    }

    if (!this.state.password) {
      this.refSnackView.showSnack("Please enter password");
      return
    }

    this.setState({ loading: true });

    apiCallLogin(
      this.state.username,
      this.state.password)
      .then((response) => {
        this.setState({ loading: false })
        let data = response.data;
        let status = data.status;
        let message = data.message;
        console.log(data);
        if (status) {
          let userData = data.data;
          Storage.setAsyncItem('userData', { 'data': userData })  //Store session
          this.props.navigation.dispatch(state => {              //Navigate Tabbar screen
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

  onPressFacebook = () => {

  }

  onPressGoogle = () => {

  }

  onPressSingup = () => {
    this.props.navigation.navigate('Register')
  }

  render() {
    const { username, password } = this.state
    return (
      <ImageBackground style={styles.container}
        source={IMAGE.splash}
        resizeMode='cover'>
        <SafeAreaView />
        {this.renderStatusBar()}
        <View style={styles.loginItemContainer}>
          <Text style={styles.welcomeTxt}>{`Hi\nWelcome back!`}</Text>
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
              placeholder='Password'
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })} />
          </View>
          <TouchableOpacity style={styles.forgotPasswordContainer}
            onPress={this.onPressForgotPassword}>
            <Text style={styles.forgotPasswordTxt}>{`Forgot Your Password?`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
            onPress={this.onPressLogin}>
            <Text style={styles.buttonTxt}>Log In</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.button, { backgroundColor: '#134DE3' }]}
            onPress={this.onPressFacebook}>
            <Text style={styles.buttonTxt}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#E62E38' }]}
            onPress={this.onPressGoogle}>
            <Text style={styles.buttonTxt}>Google</Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.singupContainer}
          onPress={this.onPressSingup}>
          <Text style={styles.singupMessage}>{`Don't have an account? `}</Text>
          <Text style={styles.singupTxt}>{`Sign up`}</Text>
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
        currentHeight={20}
        barStyle='light-content'
        backgroundColor={COLOR.gold} />
    )
  }
}
