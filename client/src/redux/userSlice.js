import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:null,
  email:null,
  profileImage:null
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    createUser:(state,actions)=>{
      state.email = actions.payload.email
      state.name = actions.payload.name
      state.profileImage = actions.payload.profileImage
    },
    Userlogout : (state) => {
      state.email = null
      state.name = null
      state.profileImage = null
    }
  }
})

export const {createUser,Userlogout} = userSlice.actions
export default userSlice.reducer 