import React, { Component } from "react";
import { Text, View, SafeAreaView, FlatList, Image } from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";

import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class AppointmentCell extends Component {
  render() {
    const { index, item } = this.props;
    let date = moment(
      item.booking_date + " " + item.time,
      "YYYY-MM-DD HH:mm:ss"
    );
    let dateStr = date.format("MMMM DD");
    let time = date.format("ddd hh:mm a");
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.containerView,
          {
            backgroundColor: index % 2 == 0 ? "rgba(251,234,182,1.0)" : "#fff",
          },
        ]}
        onPress={() => {
          this.props.onPress(item);
        }}
      >
        <View style={styles.dateContainer}>
          <Text style={styles.dateTitle}>{dateStr}</Text>
          <Text style={styles.dayText}>{time}</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileShadowView}>
            {this.renderImage()}
            <View style={styles.profileDescView}>
              <Text style={styles.profileTitle}>{item.barbar_name}</Text>
              <Text style={styles.profileDesc}>{item.service_name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderImage() {
    return <Image style={styles.profileImage} />;
  }
}
