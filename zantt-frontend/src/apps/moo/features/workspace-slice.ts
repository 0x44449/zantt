import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WorkspaceState {
  workspaceId: string;
  workspaces: Zantt.WorkspaceModelType[];
}

const initialState: WorkspaceState = {
  workspaceId: "",
  workspaces: []
}

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceId: (state, action: PayloadAction<string>) => {
      state.workspaceId = action.payload;
    },
    setWorkspaces: (state, action: PayloadAction<Zantt.WorkspaceModelType[]>) => {
      state.workspaces = action.payload;
    }
  }
});

export const {
  setWorkspaceId,
  setWorkspaces,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;