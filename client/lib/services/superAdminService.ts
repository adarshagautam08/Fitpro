import api from "../api";
//get all the admins
export const getAllAdmins=async()=>
{
    const res=await api.get('/superAdmin/getAllAdmins')
    return res.data
}
//create all the admins
export const createAdmins=async(data:{name:string,email:string,password:string})=>
{
    const res=await api.post('/superAdmin/create-admin',data)
    return res
}
//delete admin by id
export const deleteAdminByid=async(id:string)=>
{
    const res=await api.delete(`/superAdmin/deleteAdmin/${id}`)
    return res
}
