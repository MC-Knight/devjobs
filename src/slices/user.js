import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
    authToken: localStorage.getItem("xdaut"),
    loading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    loginUser: (state, action) => {
      const { access } = action.payload;
      state.authToken = access;
      localStorage.setItem("xdaut", access);
    },
    logoutUser: (state) => {
      state.user = null;
      state.authToken = null;
      localStorage.removeItem("xdaut");
    },
  },
});

export const { setUser, setUsers, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
