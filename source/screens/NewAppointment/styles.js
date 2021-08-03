import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
import { COLOR } from "../../colors";
import { FONT } from "../../fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLOR.screenBackground,
  },
  navigationView: {
    marginTop: Platform.OS == "ios" ? 0 : 8,
    height: Platform.OS == "ios" ? 44 : 56,
    flexDirection: "row",
  },
  navigationTitle: {
    fontFamily: FONT.poppins_medium,
    color: COLOR.gold,
    fontSize: 20,
    marginHorizontal: 8,
    alignSelf: "center",
  },
  navigationMenuContainer: {
    height: Platform.OS == "ios" ? 44 : 56,
    width: Platform.OS == "ios" ? 44 : 56,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationMenu: {
    height: 25,
    width: 25,
    resizeMode: "center",
    tintColor: COLOR.gold,
  },
  progressView: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  progressImage: {
    height: 20,
    width: 20,
    backgroundColor: COLOR.gold,
    borderRadius: 10,
    justifyContent: "center",
  },
  progressIcon: {
    alignSelf: "center",
    height: 10,
    tintColor: "#fff",
    width: 10,
  },
  progressLine: {
    backgroundColor: COLOR.gold,
    height: 1,
    width: Dimensions.get("window").width / 7,
    alignSelf: "center",
  },
  progressTextContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  progressTxt: {
    textAlign: "center",
    color: "#e5e5e5",
    fontFamily: FONT.poppins_regular,
    fontSize: 10,
  },
  fotterView: {
    height: 65,
    flexDirection: "row",
    backgroundColor: "#000",
  },
  fotterText: {
    flex: 1.0,
    color: "#fff",
    fontSize: 17,
    fontFamily: FONT.poppins_medium,
    alignSelf: "center",
    marginHorizontal: 20,
  },
  timingView: {
    backgroundColor: "#141414",
    width: (Dimensions.get("window").width - 50) / 3,
    padding: 10,
    justifyContent: "center",
    marginLeft: 10,
    marginVertical: 4,
    borderRadius: 6,
  },
  timingTxt: {
    alignSelf: "center",
    fontFamily: FONT.poppins_semibold,
    fontSize: 15,
    color: "#fff",
  },
  button: {
    marginRight: 20,
    backgroundColor: COLOR.gold,
    borderRadius: 20,
    justifyContent: "center",
    height: 44,
    width: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonTxt: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: FONT.poppins_medium,
  },
  inputBox: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#141414",
    borderRadius: 7,
    height: 44,
    padding: 8,
  },
  inputField: {
    flex: 1.0,
    color: "#ffffff",
    fontFamily: FONT.poppins_semibold,
    fontSize: 15,
  },
  label: {
    color: COLOR.gold,
    marginStart: 24,
    fontFamily: FONT.poppins_semibold,
    marginBottom: -8,
    marginTop: 16,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginLeft: 25,
  },
  checkButton: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 20,
  },
  checkText: {
    color: COLOR.gold,
    marginStart: 24,
    fontFamily: FONT.poppins_semibold,
  },
});

export default styles;
