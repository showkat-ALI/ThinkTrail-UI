import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  email: string;
  passwordChangedAt?: Date;
  needsPasswordChange: false;

  status: "in-progress" | "blocked" | undefined;
  isDeleted: boolean;
  roles:
    | ("admin" | "student" | "hr" | "instructor" | "superAdmin")[]
    | undefined;
};

type InitialState = {
  data: any;
  user: User;
  refresh: boolean;
};

const initialState: InitialState = {
  data: null,
  user: {
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
      // state.user.id = action.payload.id
      // state.user.userName = action.payload.userName
      // state.user.email = action.payload.email
      // state.user.avatar = action.payload.avatar
      // state.user.status = action.payload.status
      // state.user.title = action.payload.title
      // state.user.firstName = action.payload.firstName
      // state.user.lastName = action.payload.lastName
      // state.user.gender = action.payload.gender
      // state.user.phone = action.payload.phone
      // state.user.state = action.payload.state
      // state.user.country = action.payload.country
      // state.user.currentJob = action.payload.currentJob
      // state.user.studentType = action.payload.studentType
      // state.user.highestStudy = action.payload.highestStudy
      // state.user.roles = action.payload.roles
      state.refresh = true;
    },
    logout: (state) => {
      state.user.id = "";
      state.user.email = "";
      state.user.needsPasswordChange = false;
      state.user.roles = [];
      state.user.isDeleted = false;
      state.user.status = undefined;
    },
    refresher: (state) => {
      state.refresh = true;
    },
  },
});

export default authSlice.reducer;
export const { signin, logout, refresher } = authSlice.actions;
