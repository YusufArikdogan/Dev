import React from "react";
import { config } from "../helpers/config";
import axios from "axios";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getFavoriteAdvertIdList = async () => {
  const resp = await axios.get(`${baseURL}/users/fav`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const getUsers = async (query, page=0, size=20, sort="id", type="asc") => {
  console.log(query)
  const resp = await axios.get(`${baseURL}/users/admin?q=${query}&page=${page}&size=${size}&sort=${sort}&type=${type}`, {
    
      headers: getAuthHeader(),
    }
    
  );
  console.log(resp)
  const data = await resp.data;
  return data;
};

export const deleteUser = async (id) => {
  const resp = await axios.delete(`${baseURL}/users/${id}/admin`, {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

export const getOneUser = async (id) => {
  const resp = await axios.get(`${baseURL}/users/${id}/admin`, {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

export const updateOneUser = async (id, payload) => {
  const resp = await axios.patch(`${baseURL}/users/${id}/admin`, payload, {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

