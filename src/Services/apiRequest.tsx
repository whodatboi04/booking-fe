import axios from "axios";
import config from "../config/app.config";

const apiVersion = "/v1";

export const getRoomTypes = async () => {
  const response = await axios(config.apiUrl + apiVersion + "/room-types");
  return response.data;
};
