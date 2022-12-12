import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  userId: [],
};
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUser: (state, actions) => {
      state.userId = actions.payload;
    },
  },
});

export const {updateUser} = userInfoSlice.actions;

export const userInfo = state => state?.userId?.userId;

export default userInfoSlice.reducer;
