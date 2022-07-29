import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TaskState {
  taskId: string;
  tasks: Zantt.TaskModelType[];
  taskQueryStatus: string;
}

const initialState: TaskState = {
  taskId: "",
  tasks: [],
  taskQueryStatus: "",
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskId: (state, action: PayloadAction<string>) => {
      state.taskId = action.payload;
    },
    setTasks: (state, action: PayloadAction<Zantt.TaskModelType[]>) => {
      state.tasks = action.payload;
    },
    setTaskQueryStatus: (state, action: PayloadAction<string>) => {
      state.taskQueryStatus = action.payload;
    }
  }
});

export const {
  setTaskId,
  setTasks,
  setTaskQueryStatus,
} = taskSlice.actions;

export default taskSlice.reducer;