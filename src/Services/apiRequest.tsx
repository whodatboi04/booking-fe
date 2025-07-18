import axios from "axios";

const apiUrl = "http://192.168.123.147:8080/api";
const apiVersion = "/v1";

export const getRoomTypes = async () => {
  const response = await axios(apiUrl + apiVersion + "/room-types");
  return response.data;
};
