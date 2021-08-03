import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";

import { userData } from "../../networkcall";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";

export default class BookedAppointment extends Component {
  constructor(props) {
    super(props);
    let name = this.props.route.params.name;
    let services = this.props.route.params.services;
    let times = this.props.route.params.times;
    let selected_date = this.props.route.params.date;
    let total = this.props.route.params.total;
    let is_from_appointment = this.props.route.params.is_from_appointment;

    let date = moment(selected_date + " " + times, "YYYY-MM-DD HH:mm:ss");
    let dateStr = date.format("MMMM DD");
    let time = date.format("ddd hh:mm a");

    this.state = {
      name: name,
      services: services,
      times: time,
      date: dateStr,
      total: total,
      is_from_appointment:
        is_from_appointment != undefined ? is_from_appointment : false,
    };
  }

  componentDidMount() {}

  onPressBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container} source={IMAGE.splash} resizeMode="cover">
        {this.renderStatusBar()}
        {this.renderTextField()}
        <SafeAreaView />
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

  renderTextField() {
    const {
      is_from_appointment,
      name,
      services,
      times,
      total,
      date,
    } = this.state;
    return (
      <View style={[styles.container, { marginTop: 20 }]}>
        <SafeAreaView />
        {is_from_appointment == true && (
          <View style={styles.navigationView}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.onPressBack}
            >
              <Image style={styles.backIcon} source={IMAGE.back} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.imageView}>
          <Image
            style={[{ flex: 1.0, alignSelf: "center", tintColor: "#fff" }]}
            source={IMAGE.check}
            resizeMode="contain"
          />
        </View>
        {is_from_appointment == false ? (
          <View>
            <Text style={styles.title}>{"Thank You for choosing us"}</Text>
            <Text style={styles.subTitle}>
              {"We'll see you on appointment day"}
            </Text>
            <View style={styles.devider} />
          </View>
        ) : (
          <View style={{ height: 14 }} />
        )}
        <Text style={styles.summayTitle}>{"Appointment Summary"}</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowTitle}>{"Date :"}</Text>
            <Text style={styles.summaryRowValue}>{`${date}`}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowTitle}>{"Time :"}</Text>
            <Text style={styles.summaryRowValue}>{`${times}`}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowTitle}>{"Services :"}</Text>
            <Text style={styles.summaryRowValue}>{services}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowTitle}>{"Name :"}</Text>
            <Text style={styles.summaryRowValue}>{name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowTitle}>{"Payment :"}</Text>
            <Text style={styles.summaryRowValue}>{`£ ${total}`}</Text>
          </View>
        </View>
        {is_from_appointment == false && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.dispatch((state) => {
                //Navigate Tabbar screen
                return CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Tabbar" }],
                });
              });
            }}
          >
            <Text style={styles.buttonTxt}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
