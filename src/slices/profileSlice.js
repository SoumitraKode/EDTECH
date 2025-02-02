import {createSlice} from "@reduxjs/toolkit" ;

const initialState = {
    user:null,
};

const authSlice = createSlice({
    name:"profile" ,
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },
});

export const {setUser ,setLoading} = authSlice.actions ;
export default authSlice.reducer ;