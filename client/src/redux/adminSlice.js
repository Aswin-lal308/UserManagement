import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email : null
}

const adminSlice = createSlice({
  name : "admin",
  initialState,
  reducers : {
    createAdmin : (state,actions)=>{
      state.email = actions.payload.email 
    },
    Adminlogout : (state)=>{
      state.email = null;
    }
  }
})

export const {login,Adminlogout} = adminSlice.actions
export default adminSlice.reducer
