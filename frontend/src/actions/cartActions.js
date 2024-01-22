const listUsers=()=>async()=>{
    try{
        dispatch(userListRequest())
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }

        }
        const {data} = await axios.get(`/api/users/`,config)
        dispatch(userListSucess(data))
       
    }catch(error){
        dispatch( userListFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
        
    }
}
