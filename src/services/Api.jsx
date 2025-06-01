import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getHotCollections = async () => {
  const results = await axios.get(`${BASE_URL}/hotCollections`);
  return results.data;
};

export const getNewItems = async () => {
  const results = await axios.get(`${BASE_URL}/newItems`);
  return results.data;
};

export const getTopSellers = async () =>{
    const results = await axios.get(`${BASE_URL}/topSellers`)
    return results.data
}

export const getExplore = async () =>{
    const results = await axios.get(`${BASE_URL}/explore`)
    return results.data
}

export const getExploreByFilter = async (query) =>{
    const results = await axios.get(`${BASE_URL}/explore?filter=${query}`)
    return results.data
}

export const getAuthorById = async (authId) =>{
    const results = await axios.get(`${BASE_URL}/authors?author=${authId}`)
    return results.data
}
export const getItemDetailsById = async (itemId) =>{
    const results = await axios.get(`${BASE_URL}/itemDetails?nftId=${itemId}`)
    return results.data
}