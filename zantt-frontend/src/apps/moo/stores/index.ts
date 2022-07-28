import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "@/apps/moo/features/project-slice";
import taskReducer from "@/apps/moo/features/task-slice";
import workspaceReducer from "@/apps/moo/features/workspace-slice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
    workspace: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;