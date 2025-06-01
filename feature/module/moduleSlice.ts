import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Module = {
  _id: string;
  name: string;
  createdBy: string;
  course:string
};


type InitialState = {
  module: Module;
  refresh: boolean;
};

const initialState: InitialState = {
  module: {
    _id: "",
    name: "",
    createdBy: "",
    course:""
  },
 
  refresh: false,
};

const ModuleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    Module: (state, action: PayloadAction<Module>) => {
      state.module = action.payload;
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
    SuccessCreate: (state) => {
      (state.module._id = ""), (state.module.name = "");
      state.module.createdBy = "";state.module.course=""
    },
    // EditCourse: (state, action: PayloadAction<CourseEdit>) => {
    //   state.courseEdit = action.payload;
    //   state.refresh = true;
    // },
   
  },
});

export default ModuleSlice.reducer;
export const { Module, SuccessCreate, } =
ModuleSlice.actions;
