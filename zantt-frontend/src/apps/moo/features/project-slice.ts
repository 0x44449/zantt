import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ProjectState {
  projectId: string;
  projects: Zantt.ProjectModelType[];
}

const initialState: ProjectState = {
  projectId: "",
  projects: []
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
    }
  }
});

export const {
  setProjectId,
  setProjects,
} = projectSlice.actions;

export default projectSlice.reducer;