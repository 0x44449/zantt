import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TaskState {
  taskId: string;
  tasks: Zantt.TaskModelType[];
}

const initialState: TaskState = {
  taskId: "",
  tasks: [],
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
  }
});

export const {
  setTaskId,
  setTasks,
} = taskSlice.actions;

export default taskSlice.reducer;