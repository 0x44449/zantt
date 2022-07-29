import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ProjectState {
  projectId: string;
  projects: Zantt.ProjectModelType[];
  projectQueryStatus: string;
}

const initialState: ProjectState = {
  projectId: "",
  projects: [],
  projectQueryStatus: "",
}

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
    setProjects: (state, action: PayloadAction<Zantt.ProjectModelType[]>) => {
      state.projects = action.payload;
    },
    setProjectQueryStatus: (state, action: PayloadAction<string>) => {
      state.projectQueryStatus = action.payload;
    }
  }
});

export const {
  setProjectId,
  setProjects,
  setProjectQueryStatus,
} = projectSlice.actions;

export default projectSlice.reducer;