import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ProjectState {
  needProjectFetch: boolean;
  projectId: string;
  projects: Zantt.ProjectModelType[];
  projectQueryStatus: string;
}

const initialState: ProjectState = {
  needProjectFetch: true,
  projectId: "",
  projects: [],
  projectQueryStatus: "",
}

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setNeedProjectFetch: (state, action: PayloadAction<boolean>) => {
      state.needProjectFetch = action.payload;
    },
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
  setNeedProjectFetch,
  setProjectId,
  setProjects,
  setProjectQueryStatus,
} = projectSlice.actions;

export default projectSlice.reducer;