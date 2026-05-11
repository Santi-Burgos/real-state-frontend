import { axiosInstance } from "../apiFrontend";

export const getAllTicketsById = async({id}) =>{
  try{
    const res = await axiosInstance.get(
      `tickets/customer/${id}`
    );
    console.log('res',res);
    return res.data;
  }catch(error){
    throw error;
  }
}