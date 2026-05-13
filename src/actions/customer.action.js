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

export const createCustomer = async({email, phone, customerName, customerType, customerStatusPayment}) =>{
  try{
    const res = await axiosInstance.post(
      "customers/",
      { email, phone, customerName, customerType, customerStatusPayment } 
    );
    return res.data;
  }catch(error){
    throw error;
  }
}

export const deleteCustomerById = async({ customerId }) =>{
  try{
    const res = await axiosInstance.delete(
      `customers/${customerId}`
    )
    return res.data;
  }catch(error){
    throw error
  }
}

export const getSpecificCustomer = async({ id }) =>{
  try{
    const res = await axiosInstance.get(
      `customers/${id}`
    );
    console.log('c', res.data);
    return res.data
  }catch(error){
    throw error;
  }
}
export const updateCustomer = async({ id, email, phone, customerName, customerType, customerStatusPayment }) =>{
  try{
    const res = await axiosInstance.patch(
      `customers/${id}`,
      { email, phone, customerName, customerType, customerStatusPayment }
    );
    return res.data;
  }catch(error){
    throw error;
  }
}
