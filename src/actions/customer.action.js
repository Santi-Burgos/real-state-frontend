import { axiosInstance } from "../apiFrontend"; 

export const getAllCustomer = async({type, sort, valueSelector}) =>{
  try{
    const res = await axiosInstance.get(
      "customers/",{
        params:{
          type: type,
          sort: sort,
          selector: valueSelector,
        }
      }
    );
    return res.data.data;
  }catch(error){
    console.error("Error get all customer: ", error);
    throw error
  }
} 

export const createCustomer = async({email, phone, customerName, customerType}) =>{
  try{
    const res = await axiosInstance.post(
      "customers/",
      { email, phone, customerName, customerType } 
    );
    return res.data;
  }catch(error){
    throw error;
  }
}