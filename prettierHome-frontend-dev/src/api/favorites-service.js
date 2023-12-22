import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";


const baseURL = config.api.baseUrl;


// K01 It will get authenticated user`s favorites
export const getFavorites = async () => {

    const resp = await axios.get(`${baseURL}/favorites/auth`, {
        headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
};

// K03 it will add or remove a favorite

export const deleteFavorite = async (id) => {
   const resp =  await axios.delete(`${baseURL}/favorites/${id}`, {
        headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
};

// total fav count for the spesific user's advert
export const getFavoritesCount = async (id) => {
    const resp = await axios.get(`${baseURL}/favorites/auth/countFav/${id}`, {
        headers: getAuthHeader(),
    });

    return resp.data;

}
