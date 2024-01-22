
const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch(productDeleteStart())
        // const userInfo = getState().userLogin;
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        const { data } = await axios.delete(`/api/products/delet/${id}`,config)
        
         dispatch(productDeleteSuccess(data));
      

    } catch (error) {
        dispatch(productDeleteFailure(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
      
    }
}