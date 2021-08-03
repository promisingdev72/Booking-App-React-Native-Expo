import React, { Component } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import styles from "./styles";

import { COLOR } from "../../colors";
import { IMAGE } from "../../images";
import ServicesCell from "../../component/ServicesCell";

export default class Welcome extends Component {
  onPress = () => {
    this.props.navigation.navigate("Login");
  };

  renderServices() {
    let services_data = [
      { name: "Scissors cut", priceTxt: "£ 28.00", price: 28.0 },
      { name: "Skin Fade With Haircut", priceTxt: "£ 25.00", price: 25.0 },
      { name: "Haircut", priceTxt: "£ 22.00", price: 22.0 },
      { name: "Under 16", priceTxt: "£ 18.00", price: 18.0 },
      { name: "Only sides and back", priceTxt: "£ 18.00", price: 18.0 },
      { name: "Bold Haircut", priceTxt: "£ 16.00", price: 16.0 },
      {
        name: "Beard trim Hot towel treatment",
        priceTxt: "£ 15.00",
        price: 15.0,
      },
      { name: "Beard Trim", priceTxt: "£ 8.00", price: 8.0 },
      { name: "Eyebrows", priceTxt: "£ 8.00", price: 8.0 },
      
    ];

    return (
      <View style={styles.container}>
        <FlatList
          data={services_data}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ServicesCell
                show_only={true}
                item={item}
                index={index}
                selected={[]}
                onPress={(index) => {
                  if (selected_services.includes(index)) {
                    var array = selected_services.filter((e) => {
                      return e != index;
                    });
                    this.setState({ selected_services: array });
                  } else {
                    selected_services.push(index);
                    this.setState({ selected_services: selected_services });
                  }
                }}
              />
            );
          }}
        />
      </View>
    );
  }

  onMenuPress = () => {
    this.props.openDrawer();
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        {this.renderStatusBar()}
        <View style={styles.navigationView}>
          <TouchableOpacity
            onPress={() => {
              this.onMenuPress();
            }}
            style={styles.navigationMenuContainer}
          >
            <Image source={IMAGE.menu} style={styles.navigationMenu} />
          </TouchableOpacity>
          <Text style={styles.navigationTitle}>Services</Text>
        </View>
        {this.renderServices()}
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
}
