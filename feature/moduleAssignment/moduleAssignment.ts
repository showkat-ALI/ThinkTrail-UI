import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModuleAssignments = {
  data: {
    _id: string;
    assignment: {
      _id: string;
      name: string;
    };
    module: string;
    __v: number;
  }[];
};

type InitialState = {
  moduleAssignments: ModuleAssignments;
  refresh: boolean;
};

const initialState: InitialState = {
  moduleAssignments: {
    data: [], // Initially, the data array is empty
  },
  refresh: false, // Refresh flag to trigger re-fetching or re-rendering
};

const ModuleAssignmentSlice = createSlice({
  name: "moduleAssignments",
  initialState,
  reducers: {
    moduleAssignments: (state, action: PayloadAction<ModuleAssignments>) => {
      state.moduleAssignments = action.payload;

      state.refresh = true;
    },
    SuccessCreate: (state) => {
      // Reset the moduleAssignments state to its initial state
      state.moduleAssignments = {
        data: [],
      };
      // EditCourse: (state, action: PayloadAction<CourseEdit>) => {
      //   state.courseEdit = action.payload;
      //   state.refresh = true;
      // },
    },
  },
});

export default ModuleAssignmentSlice.reducer;
export const { moduleAssignments, SuccessCreate } =
  ModuleAssignmentSlice.actions;
