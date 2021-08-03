import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLOR } from "../colors";

import { FONT } from "../fonts";
import { IMAGE } from "../images";

function BarberCell(props) {
  const { item, index, selected, onPress } = props;

  const [modalInfoVisible, setModalInfoVisible] = useState(false);

  const renderModalBarberInfo = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalInfoVisible}
        onRequestClose={() => {
          setModalInfoVisible(false);
        }}
      >
        <SafeAreaView />
        <View style={styles.styleModalContainer}>
          <TouchableOpacity
            style={styles.styleModalCloseImageContainer}
            onPress={() => {
              setModalInfoVisible(false);
            }}
          >
            <Image source={IMAGE.close} style={styles.styleModalCloseImage} />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.styleModalDetailContainer}>
            <View>
              <Image source={item.pic} style={styles.styleModalBarberImage} />
              <Text
                style={{
                  marginTop: 16,
                  fontFamily: FONT.poppins_medium,
                  fontSize: 20,
                  color: COLOR.gold,
                  alignSelf: "center",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: FONT.poppins_regular,
                  fontSize: 14,
                  color: "#fff",
                  justifyContent: "center",
                  textAlign: "justify",
                  marginHorizontal: 16,
                }}
              >
                {item.description}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const content = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.container}
        onPress={() => {
          if (onPress) {
            onPress(index);
          } else {
            setModalInfoVisible(true);
          }
        }}
      >
        <Image style={styles.style_barber_pic} source={item.pic} />
        <View style={styles.style_barber_pic_layer}>
          {selected == index && <View style={styles.style_selected_icon} />}
          <Text style={styles.style_barber_name}>{item.name}</Text>
        </View>
        {renderModalBarberInfo()}
      </TouchableOpacity>
    );
  };

  return content();
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 2.1,
    height: Dimensions.get("window").width / 2,
    marginStart: 6,
    marginVertical: 4,
    overflow: "hidden",
  },
  style_barber_pic: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  style_barber_pic_layer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  style_barber_name: {
    color: COLOR.gold,
    fontFamily: FONT.poppins_light,
    fontSize: 15,
    position: "absolute",
    bottom: 2,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignSelf: "center",
    width: "100%",
    textAlign: "center",
    paddingBottom: 8,
    paddingTop: 16,
    marginBottom: -5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  style_modal_info_container: {
    backgroundColor: "white",
  },
  style_selected_icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLOR.gold,
    position: "absolute",
    right: 8,
    top: 8,
  },
  styleModalContainer: {
    flex: 1.0,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,1)",
  },
  styleModalDetailContainer: {
    backgroundColor: "#000",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1.0,
    marginTop: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  styleModalBarberImage: {
    width: "100%",
    height: 250,
  },
  styleModalCloseImageContainer: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginEnd: -24,
  },
  styleModalCloseImage: {
    width: 15,
    height: 15,
    resizeMode: "center",
  },
});
export default BarberCell;
