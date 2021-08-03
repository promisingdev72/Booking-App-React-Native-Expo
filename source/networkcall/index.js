import { Platform } from "react-native";
import Axios from "axios";
import { Storage } from "../constants/GPStorage";

const BASE_URL = "https://cristianlivolsi.co.uk/web_services/";

export const TANDC_URL = "";
export const PP_URL = "";
export const ABOUT_US_RL = "";
export const CONTACT_UC_URL = "";
export const FAQ = "";
export const ABOUT = "";

/**
 * Fetch the userData from preferance
 */
export const userData = async () => {
  let data = await Storage.getAsyncItem("userData");
  if (data) {
    console.log(JSON.stringify(data.data));
    return data.data;
  } else {
    return null;
  }
};

export const isLogin = async () => {
  let data = await userData();
  return data != null;
};

export const apiCallLogin = (user_email, password) => {
  var bodyFormData = new FormData();
  bodyFormData.append("user_email", user_email);
  bodyFormData.append("password", password);
  return Axios.post(`${BASE_URL}/login.php`, bodyFormData);
};

export const apiCallSignUp = (username, mobile_number, email, password) => {
  var bodyFormData = new FormData();
  bodyFormData.append("username", username);
  bodyFormData.append("mobile_number", mobile_number);
  bodyFormData.append("email", email);
  bodyFormData.append("password", password);
  return Axios.post(`${BASE_URL}/register.php`, bodyFormData);
};

export const apiCallBookAppointment = (
  user_id,
  date,
  services,
  time,
  barbar,
  price,
  is_student,
  coupon_code,
  service_time_sum
) => {
  var bodyFormData = new FormData();
  bodyFormData.append("user_id", user_id);
  bodyFormData.append("date", date);
  bodyFormData.append("time", time);
  bodyFormData.append("barbar", barbar);
  bodyFormData.append("services", services);
  // bodyFormData.append("transaction_id", transaction_id);
  // bodyFormData.append("payment_status", payment_status);
  bodyFormData.append("price", price);
  bodyFormData.append("service_time_sum", service_time_sum);
  bodyFormData.append("coupon_code", coupon_code);
  bodyFormData.append("is_student", is_student);
  console.log("=====>::::", bodyFormData);
  return Axios.post(`${BASE_URL}/book_appointement.php`, bodyFormData);
};

export const apiCallGetBookingDetails = (user_id, history) => {
  var bodyFormData = new FormData();
  bodyFormData.append("user_id", user_id);
  bodyFormData.append("history", history);
  if (history == "1") {
    return Axios.post(`${BASE_URL}/previous_appointement.php`, bodyFormData);
  } else {
    return Axios.post(`${BASE_URL}/next_appointement.php`, bodyFormData);
  }
};

export const apiCallGetUserDetail = async () => {
  let data = await userData();
  var bodyFormData = new FormData();
  bodyFormData.append("user_id", data.id);
  return Axios.post(`${BASE_URL}/get_user_details.php`, bodyFormData);
};

export const apiCallUpdateProfile = async (
  username,
  phone,
  email,
  profile_image
) => {
  let data = await userData();
  var bodyFormData = new FormData();

  const startsWith = (str, word) => {
    return str.lastIndexOf(word, 0) === 0;
  };

  bodyFormData.append("user_id", data.id);
  bodyFormData.append("username", username);
  bodyFormData.append("phone", phone);
  bodyFormData.append("email", email);

  if (profile_image) {
    // if (!startsWith(profile_image, "http")) {
    const newFile = {
      name: "NewLook" + Date.now() + ".jpg",
      uri: profile_image,
      type: "image/jpg",
    };
    bodyFormData.append("profile_image", newFile);
    // }
  }

  return Axios.post(`${BASE_URL}/update_profile.php`, bodyFormData);
};

export const apiCallUpdateDeviceToken = async (expoDeviceToken) => {
  let data = await userData();
  var bodyFormData = new FormData();
  bodyFormData.append("user_id", data.id);
  bodyFormData.append("device_token", expoDeviceToken);
  bodyFormData.append("user_token", data.id);
  return Axios.post(`${BASE_URL}/update_device_token.php`, bodyFormData);
};

export const apiCallUpdateBooking = async (
  user_id,
  booking_id,
  transaction_id,
  payment_status
) => {
  let data = await userData();
  var bodyFormData = new FormData();
  bodyFormData.append("user_id", data.id);
  bodyFormData.append("booking_id", booking_id);
  bodyFormData.append("transaction_id", transaction_id);
  bodyFormData.append("payment_status", payment_status);
  return Axios.post(`${BASE_URL}/update_payment_status.php`, bodyFormData);
};

export const apiCallChangePassword = async (password, confirmPassword) => {
  let data = await userData();
  var bodyFormData = new FormData();
  bodyFormData.append("user_id", data.id);
  bodyFormData.append("password", password);
  bodyFormData.append("confirm_password", confirmPassword);

  return Axios.post(`${BASE_URL}/change_password.php`, bodyFormData);
};

export const apiCallForgotPassword = async (email) => {
  let data = await userData();
  var bodyFormData = new FormData();
  bodyFormData.append("email", email);

  return Axios.post(`${BASE_URL}/forgot_password.php`, bodyFormData);
};
