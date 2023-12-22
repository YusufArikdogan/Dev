import { createSlice } from "@reduxjs/toolkit"
import { getMenuItems, getProfileMenu } from "../../helpers/function/user-menu";


const initialState = {
    user: null,
    isUserLogin: false,
    menu: [],
    profileMenu: []
}
 
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.isUserLogin = true;
            state.user = action.payload;
            state.menu = getMenuItems(action.payload.role)
            state.profileMenu = getProfileMenu(action.payload.role)
        },
        logout: (state) => {
            state.isUserLogin = false;
            state.user = null;
            state.menu = [];
        },
    }
})

export const { login, logout} = authSlice.actions;
export default authSlice.reducer;