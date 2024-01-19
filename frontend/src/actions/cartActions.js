const payOrder = (id,paymentResult) => async () => {
  try {
      dispatch(orderpayrequest())
      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }

      }
      const { data } = await axios.put(`/api/orders/${id}/pay/`, paymentResult, config)
      dispatch(orderpayssuccess(data))
    

  } catch (error) {
      dispatch(orderpayfail(
          error.response && error.response.data.detail ? error.response.data.detail : error.message,
      ))
    
  }
}