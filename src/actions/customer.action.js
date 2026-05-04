import { axiosInstance } from "../apiFrontend"; 

export const getAllCustomer = async() =>{
  try{
    const res = await axiosInstance.get(
      "customers/",
    );
    return res.data.data;
  }catch(error){
    console.error("Error get all customer: ", error);
    throw error
  }
} 

export const createCustomer = async() =>{
  try{
    const res = await axiosInstance.post(
      "customers/",
      { email, phone, customerName, customerType } 
    );
  }catch(error){
    throw error;
  }
}