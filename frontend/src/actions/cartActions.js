const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderListrequest())
        // const userInfo = getState().userLogin;
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        const { data } = await axios.get(`/api/orders/`,config)
        
         dispatch(orderListssuccess(data));
      

    } catch (error) {
        dispatch(orderListfail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
      
    }
}
