import {createSlice} from "@reduxjs/toolkit" ;

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0 
};

const cartSlice = createSlice({
    name:"cart" ,
    initialState:initialState,
    reducers:{
        setToatalItems(state,value){
            state.totalItems = value.payload;
        },
        //add to carrt
        //remove from cart
        // reset cart
    },
});

export const {setToatalItems} = cartSlice.actions ;
export default cartSlice.reducer ;