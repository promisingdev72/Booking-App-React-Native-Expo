import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacityBase,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
  StatusBar,
} from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";
import { FONT } from "../../fonts";

import NewsCell from "../../component/NewsCell";
import TreadingCell from "../../component/TreadingCell";
import BarberCell from "../../component/BarberCell";

export default class Welcome extends Component {
  onPress = () => {
    this.props.navigation.navigate("Login");
  };

  onMenuPress = () => {
    this.props.openDrawer();
  };

  renderHeaderLine = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.poppins_medium,
            fontSize: 20,
            color: COLOR.gold,
            marginBottom: 10,
          }}
        >
          CRISTIAN
        </Text>
        <Text
          style={{
            fontFamily: FONT.poppins_regular,
            fontSize: 14,
            color: "#fff",
            justifyContent: "center",
            textAlign: "center",
            marginHorizontal: 16,
          }}
        >
          {
            "is the owner of salon who has versatile experience on all types of hair styles & beard. He is passionate to give style on any face with modern technique "
          }
        </Text>
      </View>
    );
  };

  render() {
    let barbers_data = [
      {
        name: "Cristian",
        pic: IMAGE.barber_three,
        description:
          "My experience means my speciality and experience with bardening. I started when I was sixteen and I have been learning new techniques all the time.\n\nI try to do my best!!!!",
      },
      {
        name: "TCB",
        pic: IMAGE.tcb,
        description:
          "My experience means my speciality and experience with bardening. I started when I was sixteen and I have been learning new techniques all the time.\n\nI try to do my best!!!!",
      },
      {
        name: "TCB2",
        pic: IMAGE.tcb,
        description:
          "My experience means my speciality and experience with bardening. I started when I was sixteen and I have been learning new techniques all the time.\n\nI try to do my best!!!!",
      },
      {
        name: "TCB3",
        pic: IMAGE.tcb,
        description:
          "My experience means my speciality and experience with bardening. I started when I was sixteen and I have been learning new techniques all the time.\n\nI try to do my best!!!!",
      },
    ];

    let beried_and_haircut_data = [
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/1.jpeg" },
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/2.jpeg" },
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/3.jpeg" },
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/4.jpeg" },
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/5.jpeg" },
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/6.jpeg" },
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/7.jpeg" },
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/8.jpeg" },
      { pic: "https://cristianlivolsi.co.uk/assets/app_img/9.jpeg" },
      
    ];

    return (
      <View style={styles.container}>
        <SafeAreaView />
        {this.renderStatusBar()}
        <FlatList
          data={barbers_data}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          numColumns={2}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return <BarberCell item={item} index={index} />;
          }}
          ListHeaderComponent={
            <View>
              <View style={styles.navigationView}>
                <TouchableOpacity
                  onPress={() => {
                    this.onMenuPress();
                  }}
                  style={styles.navigationMenuContainer}
                >
                  <Image source={IMAGE.menu} style={styles.navigationMenu} />
                </TouchableOpacity>
                <Text style={styles.navigationTitle}>Home</Text>
              </View>
              {this.renderHeaderLine()}
              <Text
                style={{
                  marginTop: 16,
                  fontFamily: FONT.poppins_medium,
                  fontSize: 20,
                  color: COLOR.gold,
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              >
                Barbers
              </Text>
            </View>
          }
          ListFooterComponent={
            <View>
              <Text
                style={{
                  marginTop: 32,
                  marginBottom: 16,
                  fontFamily: FONT.poppins_medium,
                  fontSize: 20,
                  color: COLOR.gold,
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              >
                Our work
              </Text>
              <FlatList
                data={beried_and_haircut_data}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                numColumns={3}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                  return <TreadingCell item={item} index={index} />;
                }}
              />
            </View>
          }
        />
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

  renderTreding() {
    return (
      <>
        <View style={styles.tradingHeader}>
          <Text style={styles.navigationTitle}>Treding Haircuts</Text>
        </View>
        <FlatList
          data={["", "", "", "", ""]}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <TreadingCell item={item} index={index} />;
          }}
        />
      </>
    );
  }
}
