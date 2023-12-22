import axios from "axios";

import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

//C04
export const saveCategory = async (payload) => {
   const resp = await axios.post(`${baseURL}/categories`, payload, {
      headers: getAuthHeader(),
   });
      
   const data = resp.data;
   return data;
} 

//C02  get all categories without properties
export const getAdminCategory = async (page=0, size=10, sort="seq", type="asc", query="") => {
    const resp = await axios.get(`${baseURL}/categories/admin?page=${page}&size=${size}&sort=${sort}&type=${type}&query=${query}`, {
       headers: getAuthHeader(),
    });
    const data = await resp.data;
    return data;
};

//C06
export const deleteCategory = async (id) => {
  const resp= await axios.delete(`${baseURL}/categories/${id}`, {
    headers: getAuthHeader()
  });

  const data = resp.data;
  return data;
};

//C03
export const getCategoryById = async (id) => {
   const resp = await axios.get(`${baseURL}/categories/${id}`, {
      headers: getAuthHeader(),
   });
         
   const data = resp.data;
   return data;
};

//C05
export const updateCategory = async (id, payload) => {
   const resp = await axios.put(`${baseURL}/categories/${id}`, payload, {
      headers: getAuthHeader(),
   });
      
   const data = resp.data;
   return data;
};