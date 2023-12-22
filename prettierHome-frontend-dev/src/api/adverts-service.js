import axios from "axios";
import { config } from "../helpers/config";
import { formdataHeader, getAuthHeader } from "./auth-header";
import { prepareRequestParams } from "../helpers/function/request-param-converter";

const baseURL = config.api.baseUrl;

/**
 * Retrieves advertising data based on the provided slug.
 * @param {string} slug - The slug of the advertising data to retrieve.
 * @returns {Promise<Object>} - The advertising data.
 */
export const getAdvertsBySlug = async (slug) => {
  // Send a GET request to the API endpoint with the provided slug
  const resp = await axios.get(`${baseURL}/adverts/${slug}`, {
    headers: getAuthHeader(),
  });
  
  // Extract the data from the response
  const data = resp.data;

  // Return the extracted data
  return data;
};
export const saveTourRequest = async (payload) => {
  try {
    const resp = await axios.post(`${baseURL}/tour-requests`, payload, {
      headers: getAuthHeader(),
    });
    const data = resp.data;
    return data;
  } catch (error) {
    console.error("Error in saveTourRequest:", error);
    throw error;
  }
};
export const getAllImagesByAdvertId = async (id) => {
  try {
    const resp = await axios.get(`${baseURL}/images/advert/${id}`, {
      headers: getAuthHeader(),
    });
    const data = resp.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in getAllImagesByAdvertId", error);
    throw error;
  }
};

//A05 get all adverts of the authenticated user
// export const getAdverts = async (page=0, size=20, sort="category_id", type="asc") => {

//   const resp = await axios.get(`${baseURL}/adverts/auth?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
//     headers: getAuthHeader()
//   });
//   const data = await resp.data;
//   return data;
//   console.log(data + "serise geldi")
// };



export const getAdverts = async (page = 0, size = 20, sort = "category_id", type = "asc") => {
  const resp = await axios.get(`${baseURL}/adverts/auth?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
    headers: getAuthHeader(),
  });

  const data = await resp.data;
  return data;
};

// TODO T01 GET ADVERT TYPES

export const getAdvertTypes = async () => {
  const resp = await axios.get(`${baseURL}/advert-types`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO C01 GET CATEGORIES
export const getCategories = async () => {
  const resp = await axios.get(`${baseURL}/categories`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO  U01 GET ALL COUNTRIES
export const getAllCountries = async () => {
  const resp = await axios.get(`${baseURL}/countries`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO   GET ALL CITIES BY COUNTRY
export const getAllCityByCountry = async (countryId) => {
  const resp = await axios.get(`${baseURL}/cities/${countryId}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO   GET ALL DISTRICTS BY CITY
export const getAllDistrictsByCity = async (cityId) => {
  const resp = await axios.get(`${baseURL}/districts/${cityId}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

//A13- delete advert
export const deleteAdvert = async (id) => {
  const resp = await axios.delete(`${baseURL}/adverts/${id}`, {
    headers: getAuthHeader(),
  });

  const data = resp.data;
  return data;
};

//A11- update advert for customer
export const updateAdvert = async (id, payload) => {
  const resp = await axios.put(`${baseURL}/auth/${id}`, payload, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO   GET ALL PROPERTIES
export const getCategoryPropertyKeysByCategory = async (categoryId) => {
  const resp = await axios.get(
    `${baseURL}/categoriesKey/${categoryId}/properties`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};

// TODO A10  SAVE ADVERT
export const saveAdvert = async (formdata) => {
  const resp = await axios.post(`${baseURL}/adverts`, formdata, {
    headers: formdataHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A08  GET ADVERT
export const getAdvertById = async (advertId) => {
  const resp = await axios.get(`${baseURL}/adverts/${advertId}/auth`, {
    headers: formdataHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A11  UPDATE ADVERT
export const updateAdvertByCustomer = async (advertId, values) => {
  const resp = await axios.put(`${baseURL}/adverts/auth/${advertId}`, values, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};


export const getByAdvertsPage = async (search, page = 0, size = 20, sort = "category.id", type = "asc") => {
  const queryString = prepareRequestParams(search);
  const separator = queryString ? '&' : '';
  const resp = await axios.get(`${baseURL}/adverts/search?${queryString}${separator}page=${page}&size=${size}&sort=${sort}&type=${type}`, {

    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A02  GET ADVERTS BY CITIES
export const getAdvertsByCities = async () => {
  const resp = await axios.get(`${baseURL}/adverts/cities`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO A03  GET ADVERTS BY CATEGORIES
export const getAdvertsByCategories = async () => {
  const resp = await axios.get(`${baseURL}/adverts/categories`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};


// TODO A04 GET MOST POPULAR ADVERTS
export const getMostPopularAdverts = async (amount) => {
  const resp = await axios.get(`${baseURL}/adverts/popular/${amount}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};


//TODO getAdvertsForAdminPage
export const getAdvertsForAdmin = async (
  values,
  page = 0,
  size = 10,
  sort = "category.id",
  type = "asc"
) => {
  const resp = await axios.get(
    `${baseURL}/adverts/admin?q=${values?.query}&category.id=${values.categoryId}&advert_type_id=${values.advertTypeId}&price_start=${values.priceStart}&price_end=${values.priceEnd}&status=${values.status}&page=${page}&size=${size}&sort=${sort}&type=${type}`,
    {
      headers: getAuthHeader(),
    }
  );
  const data = await resp.data;
  return data;
};


// TODO A09 GET ADVERT FOR ADMIN
export const findAdvertForAdmin = async (id) => {
  const resp = await axios.get(`${baseURL}/adverts/${id}/admin`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};


// TODO A12  UPDATE ADVERT FOR ADMİN
export const updateAdvertByAdmin = async (advertId, values) => {
  const resp = await axios.put(`${baseURL}/adverts/admin/${advertId}`, values, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};




