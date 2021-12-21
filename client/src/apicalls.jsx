import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {

    const res = await axios.post(`http://localhost:5656/api/auth/login`,userCredentials);
        
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
} catch (err) {
             console.log('err:', err)
             dispatch({type: "LOGIN_FAILURE", payload: err})


     }
}