import axios from "axios";
import api from "../../config/api";

export async function getAllItems(pageNo) {
  return await axios.get(`${api.getAllItems}`,{
    params:{
        dataType:'Branded',
        pageSize: 20,
        pageNumber: `${pageNo}`,
        api_key: process.env.REACT_APP_API_KEY
    }
   })
   
  }
export async function getBySearch(props){
  return await axios.get(`${api.getBySearch}`, {
    params:{
      query:`${props?.input}`,
      dataType:'Branded',
      pageSize: 20,
      pageNumber: `${props.pageNo}`,
      api_key: process.env.REACT_APP_API_KEY
    }
  })
}  