import { userDetailSuccess } from "../features/userDetailSlice"

const updateUser=(user)=>async()=>{
    try{
        dispatch(userupdateadminrequest())
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }

        }
        const {data} = await axios.put(`/api/users/update/${id}/`,user,config)
        dispatch(userupdateadminsuccess())
        dispatch(userDetailSuccess(data))
       
    }catch(error){
        dispatch( userupdateadminfail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
        
    }
}
  
