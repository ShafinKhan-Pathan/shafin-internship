import axios from "axios";

const BASE_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net";

export const getHotCollections = async () => {
  const results = await axios.get(`${BASE_URL}/hotCollections`);
  return results.data;
};

export const getNewItems = async () => {
  const results = await axios.get(`${BASE_URL}/newItems`);
  return results.data;
};
