const createProductReview = (productId,review) => async (dispatch, getState) => {
    try {
        dispatch(productCreateReviewrequest())
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        const { data } = await axios.post(`/api/products/${productId}/reviews`,review,config)
        
         dispatch(productCreateReviewsuccess(data));
      
        
    } catch (error) {
        dispatch(productCreateReviewfailure(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
      
    }
}
