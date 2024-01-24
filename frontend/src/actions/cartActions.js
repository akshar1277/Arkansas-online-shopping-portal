const deliverOrder = (order) => async () => {
    try {
        dispatch(orderdeliverrequest())
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
  
        }
        const { data } = await axios.put(`/api/orders/${order._id}/deliver/`, {}, config)
        dispatch(orderdeliverssuccess(data))
        
  
    } catch (error) {
        dispatch(orderdeliverfail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
      
    }
  }