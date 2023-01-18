import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_id: null,
        user_nikname: null,
    },
    reducers: {
        GET_USER: (state, action) => {
            state. user_id = action.payload.id
            state.user_nikname = action.payload.nikname
        },
        DELETE_USER: (state) => {
            state. user_id = null
            state.user_nikname = null     
        },
    }
})

export const { GET_USER, DELETE_USER } = userSlice.actions;

export default userSlice.reducer;