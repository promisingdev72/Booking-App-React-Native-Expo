import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, SafeAreaView, TextInput, Platform, StatusBar } from 'react-native';
import styles from './styles'

import { COLOR } from '../../colors'
import { IMAGE } from '../../images'

import { userData, apiCallGetUserDetail, apiCallUpdateProfile } from '../../networkcall'
import SmallLoader from '../../component/SmallLoader'
import SnackView from '../../component/SnackView'
import { Storage } from '../../constants/GPStorage'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { EventRegister } from 'react-native-event-listeners'


export default class Welcome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      loading: '',
      profile_image: ''
    }
  }

  componentDidMount() {
    this.fetchUserData()
  }

  updateProfile() {


    const { name, email, phone, profile_image } = this.state

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!this.state.name) {
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

    if (!this.state.phone) {
      this.refSnackView.showSnack("Please enter phone number");
      return
    }
    else if (this.state.phone.length < 10) {
      this.refSnackView.showSnack('Please enter valid mobile number')
      return
    }


    this.setState({ loading: true })
    apiCallUpdateProfile(name, phone, email, profile_image)
      .then((response) => {
        this.setState({ loading: false })
        let data = response.data;
        let status = data.status;
        let message = data.message;

        if (status) {
          console.log(data)
          let user_data = data.UserInfo
          this.setState({
            name: user_data.username,
            email: user_data.email,
            phone: user_data.phone,
            profile_image: user_data.profile_image
          })

          Storage.setAsyncItem('userData', { 'data': user_data })
          this.refSnackView.showSnack(message)
          EventRegister.emit('myCustomEvent', 'it works!!!')


        } else {
          this.setState({
            loading: false
          }, () => {
            this.refSnackView.showSnack(message)
          })
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        this.refSnackView.showSnack(error.message)
      })
  }

  fetchUserData() {
    this.setState({ loading: true })
    apiCallGetUserDetail()
      .then((response) => {
        this.setState({ loading: false })
        let data = response.data;
        let status = data.status;
        let message = data.message;
        if (status) {
          let user_data = data.data[0]
          this.setState({
            name: user_data.username,
            email: user_data.email,
            phone: user_data.phone,
            profile_image: user_data.profile_image
          })
        } else {
          this.setState({ loading: false }, () => {
            this.refSnackView.showSnack(message)
          })
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      })
  }

  onLoad() {
    userData().then((data) => {
      this.setState({
        name: data.username,
        email: data.email,
        phone: data.phone
      })
    })
  }

  render() {

    return (
      <View style={styles.container}
        source={IMAGE.splash}
        resizeMode='cover'>
        <SafeAreaView/>
        {this.renderHeader()}
        {this.renderStatusBar()}
        {this.renderTextField()}
        <SmallLoader loading={this.state.loading} />
        <SnackView ref={(refSnackView) => this.refSnackView = refSnackView} />
        <SafeAreaView />
      </View>
    )
  }

  renderHeader() {

    const onMenuPress = () => {
      this.props.openDrawer();
    }

    return (
      <View style={styles.navigationView}>
        <TouchableOpacity
          onPress={() => { onMenuPress() }}
          style={styles.navigationMenuContainer}>
          <Image source={IMAGE.menu} style={styles.navigationMenu} />
        </TouchableOpacity>
        <Text style={styles.navigationTitle}>My Account</Text>
      </View>
    )
  }

  renderStatusBar() {
    if (Platform.OS == 'ios') {
      return (
        <StatusBar
         barStyle='light-content' />
      )
    }
    else {
      return (
        <StatusBar
          currentHeight={20}
          barStyle='light-content'
          backgroundColor={COLOR.gold} />
      )
    }
  }

  renderLabel = (label) => {
    return (
      <Text style={styles.label}>{label}</Text>
    )
  }
  renderTextField() {
    const { name, email, phone, profile_image } = this.state


    const pickImagePermission = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status != 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        pickImage();
      }
    }
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        let resizedImage = await resizeImage(result)
        console.log("URI=>", result.uri)
        this.setState({ profile_image: resizedImage.uri })
        this.updateProfile();
      }
    };

    const resizeImage = async (pickedImage) => {
      const operations = [];
      // for Android only - check exif info and do pre-rotate
      // this fixes for Galaxy S and maybe others
      if (Platform.OS === 'android' && pickedImage.exif && pickedImage.exif.Orientation > 1) {
        let rotateOperation;
        let orientation = pickedImage.exif.Orientation;
        // landscape - upside down
        if (orientation === 3) {
          rotateOperation = { rotate: 180 };
        }
        // portrait - right side up
        if (orientation === 6) {
          rotateOperation = { rotate: 90 };
        }
        // portrait - upside down
        if (orientation === 8) {
          rotateOperation = { rotate: -90 };
        }

        if (rotateOperation) {
          operations.push(rotateOperation);
        }
      }

      // add resize op as last op
      let resizeObj = {};
      if (pickedImage.height > pickedImage.width) {
        resizeObj = { height: 640 };
      } else {
        resizeObj = { width: 640 };
      }
      operations.push({ resize: resizeObj })
      let manipResult = await ImageManipulator.manipulateAsync(
        pickedImage.uri,
        operations,
        {
          format: 'jpeg',
        }
      );

      return {
        uri: manipResult.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
        width: manipResult.width,
        height: manipResult.height,
      };
    }

    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={() => {
            pickImagePermission();
          }}>
          {
            profile_image ?
              <Image style={styles.imageView}
                source={{ uri: profile_image }} />
              :
              <Image style={styles.imageView}
                source={IMAGE.propic_place} />
          }
          <Image source={IMAGE.camera} style={styles.editIcon} />
        </TouchableOpacity>

        {/* <Text style={styles.username}>{name}</Text> */}
        {this.renderLabel('Name')}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputField}
            placeholder='Your Name'
            value={name}
            editable={true}
            onChangeText={(text) => this.setState({ name: text })} />
        </View>
        {this.renderLabel('Phone number')}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputField}
            placeholder='Phone'
            value={phone}
            keyboardType='number-pad'
            editable={true}
            onChangeText={(text) => this.setState({ phone: text })} />
        </View>
        {this.renderLabel('Email Address')}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputField}
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            editable={false}
            onChangeText={(text) => this.setState({ email: text })} />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.updateProfile();
          }}
          style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
