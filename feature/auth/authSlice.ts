import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  id: string;
  email: string;
  passwordChangedAt?: Date;
  needsPasswordChange: false;
  status: "in-progress" | "blocked" | undefined;
  isDeleted: boolean;
  roles: ("admin" | "student" | "hr" | "instructor" | "superAdmin" | "admitted")[] | undefined;
};

type InitialState = {
  data: any;
  user: User;
  refresh: boolean;
};

const initialState: InitialState = {
  data: null,
  user: {
    _id: "",
    id: "",
    email: "",
    needsPasswordChange: false,
    status: "in-progress",
    isDeleted: false,
    roles: undefined,
  },
  refresh: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.refresh = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.refresh = false;
    },
    refresher: (state) => {
      state.refresh = true;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { signin, logout, refresher, setUserData } = authSlice.actions;
