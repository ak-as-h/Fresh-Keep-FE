import axiosConfig from "./AxiosConfig";
import { BASEURL } from "./BaseURL";

export const addFoodItem = async (reqBody) => {
  return await axiosConfig("post", `${BASEURL}/foodDatas`, reqBody);
};
export const getFoodItem = async () => {
  return await axiosConfig("get", `${BASEURL}/foodDatas`, "");
};

export const deleteFoodItem = async (id) => {
  return await axiosConfig("delete", `${BASEURL}/foodDatas/${id}`, "");
};

export const getSingleFoodItem = async (id) => {
  return await axiosConfig("get", `${BASEURL}/foodDatas/${id}`, "");
};

export const updateFoodItem = async (id, reqBody) => {
  return await axiosConfig("put", `${BASEURL}/foodDatas/${id}`, reqBody);
};
