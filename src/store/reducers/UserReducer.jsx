import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: [
        {
            isLoggedIn : false
        }
    ]
}


export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoggedIn: (state, actions) => {
            state.user 
        }
    },
})

export default UserSlice.reducer;

export const {userdelete} = UserSlice.actions