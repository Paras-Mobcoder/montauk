import axios from "axios";
import api from "../../config/api";


export const getFoodListService = (
  query: string,
  pageSize: number,
  pageNumber: number,
  mineralsCheck?: boolean,
  carbsCheck?: boolean,
  protienCheck?: boolean,
  fatsCheck?: boolean,
  vitaminsCheck?: boolean,
  dietFibreCheck?: boolean
) => {
  if (!query) {
    return axios.get(
      `${api.SEARCH}?query=${carbsCheck ? "Carbohydrate" : ""}${
        protienCheck ? "Protein" : ""
      }${fatsCheck ? "Fats" : ""}${vitaminsCheck ? "Vitamin" : ""}${
        mineralsCheck ? "Mineral" : ""
      }${dietFibreCheck ? "Dietary Fibre" : ""}
      &api_key=${
        api.KEY
      }&dataType=&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  } else {
    return axios.get(
      `${api.SEARCH}?query=${query}&api_key=${api.KEY}&dataType=&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }
};