import axios from "axios";

const API_BASE = "https://rickandmortyapi.com/api/character";

export const getCharacters = async () => {
  const response = await axios.get(API_BASE);
  return response.data.results;
};
