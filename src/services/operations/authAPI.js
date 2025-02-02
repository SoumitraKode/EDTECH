import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { userEndpoints } from "../apis";
import {apiConnector} from "../apiconnector"
import { setUser } from "../../slices/profileSlice";
import {  } from "react-router-dom";
// import { userEndpoints } from "../apis";


export const sendOtp = (email,navigate)=>{
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true)) ;
        try {
            const response = await apiConnector("POST",userEndpoints.SEND_OTP_API,
              {
                email,
                checkUserPresent: true,
              }
            )
            console.log("SENDOTP API RESPONSE............", response)
            console.log(response.data.success) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            toast.success("OTP Sent Successfully") ;
            //Navigating to new page to verify OTP
            navigate("/verify-email") ;
        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false)) ;
        toast.dismiss(toastId)
    }
}
//login
export function login(email, password, navigate) {
    return async (dispatch) => {
      // const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", userEndpoints.SIGN_IN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        
        dispatch(setToken(response.data.token)) ; 
        const userImage = response.data?.prev_User?.image
          ? response.data.prev_User.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.prev_User.FirstName} ${response.data.prev_User.LastName}`
        dispatch(setUser({ ...response.data.prev_User, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        toast.success("Login Successful") ;
        navigate("/dashboard/my-profile") ;
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false)) ;
      // toast.dismiss(toastId)
    }
  }
//sign up
export function signUp(
    accountType,
    FirstName,
    LastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", userEndpoints.SIGN_UP_API, {
          accountType,
          FirstName,
          LastName,
          email,
          password,
          confirmPassword,
          otp,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  // Logout == >
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null)) ; 
      dispatch(setUser(null)) ;
      // dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/") ;
    }
  }
//reset-password-token
export function resetPasswordToken(email,setEmailSent,navigate){
  // const toastId = toast.loading("Loading...") ;
  return async (dispatch)=>{
    console.log("Reset Pasword Token Api function starting executing : ") ;
    dispatch(setLoading(true)) ;
    try {
      //call the corresponding function
      console.log("Calling the Reset token mail funct")
      const response = await apiConnector("POST",userEndpoints.RESET_PASS_TKN_API,{
        email,
      }) ;

      console.log("Reset password Token API Response ... ",response) ;
      if(!response.data.success){
        throw new Error(response.data.message) ;
      }
      setEmailSent(true) ;
      toast.success("Reset link mailed successfully") ;
    } catch (error) {
      console.log("Error in Sending Mail............", error)
        toast.error("Reset Password failed")
        navigate("/signup") ;
    }
    dispatch(setLoading(false)) ;
    // toast.dismiss(toastId) ; 
  }
}

export function resetPassword(password,confirmPassword,token,navigate){
  
  return async (dispatch)=>{
    try {
        const response = apiConnector("POST",userEndpoints.RESET_PASS_API,{
          password,
          confirmPassword,
          token,
        }) ;
    
        console.log("Update Password Response ...",response) ;
    
        if(!response.data.success){
          throw new Error(response.data.message) ;
        }
        console.log("Password updated successfully : ") ;
        toast.success("Password Updated successfully") ;
        
      } catch (error) {
        console.log("Error in Updating Password............", error)
        toast.error("Update Password failed")
        navigate("/signup") ;
      }
      dispatch(setLoading(false)) ;
  }
}