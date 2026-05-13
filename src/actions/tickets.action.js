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

export const getAllTickets = async() =>{
  try{
    const res = await axiosInstance.get('tickets');
    console.log('gat', res);
    return res.data
  }catch(error){
    throw error;
  }
}