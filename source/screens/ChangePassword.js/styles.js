import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
import { COLOR } from "../../colors";
import { FONT } from "../../fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: "#000",
  },
  navigationView: {
    marginTop: Platform.OS == "ios" ? 20 : 8,
    height: Platform.OS == "ios" ? 44 : 56,
    flexDirection: "row",
  },
  backButton: {
    height: Platform.OS == "ios" ? 44 : 56,
    width: Platform.OS == "ios" ? 44 : 56,
    justifyContent: "center",
  },
  backIcon: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
  loginItemContainer: {
    flex: 1.0,
    marginTop: 20,
  },
  welcomeTxt: {
    fontFamily: FONT.poppins_semibold,
    fontSize: 20,
    color: "#fff",
    marginHorizontal: 20,
  },
  welcomeMessage: {
    fontFamily: FONT.poppins_regular,
    fontSize: 14,
    color: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputBox: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 7,
    height: 44,
    padding: 8,
  },
  inputField: {
    flex: 1.0,
    color: "#555555",
    fontFamily: FONT.poppins_semibold,
    fontSize: 15,
  },
  forgotPasswordContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    alignSelf: "flex-end",
  },
  forgotPasswordTxt: {
    color: COLOR.gold,
    fontFamily: FONT.poppins_regular,
    fontSize: 15,
  },
  buttonContainer: {
    flex: 1.0,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: COLOR.gold,
    borderRadius: 7,
    justifyContent: "center",
    height: 44,
  },
  buttonTxt: {
    color: "#fff",
    alignSelf: "center",
  },
  singupContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  singupMessage: {
    fontFamily: FONT.poppins_medium,
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
  },
  singupTxt: {
    fontFamily: FONT.poppins_medium,
    fontSize: 16,
    color: COLOR.gold,
    alignSelf: "center",
  },
});

export default styles;
