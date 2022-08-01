import { useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { RootState } from "@/apps/moo/stores";
import { createSelector } from "@reduxjs/toolkit";

type Selector<S> = (state: RootState) => S;

export const selectIsProjectFetching = (): Selector<boolean> => createSelector(
  [(state: RootState) => state.project.projectQueryStatus],
  (projectQueryStatus) => {
    if (projectQueryStatus === "success") {
      return false;
    }
    return true;
  }
)

export const useIsProjectFetchingSelector = () => {
  return useAppSelector(selectIsProjectFetching());
}

export const selectCurrentProject = (): Selector<Zantt.ProjectModelType | null> => createSelector(
  [(state: RootState) => state.project.projectId, (state: RootState) => state.project.projects],
  (projectId, projects) => {
    if (projectId === "") {
      return null;
    }
    if (!projects || projects.length === 0) {
      return null;
    }
    for (let project of projects) {
      if (project.projectId === projectId) {
        return project;
      }
    }
    return null;
  }
);

export const useCurrentProjectSelector = () => {
  return useAppSelector(selectCurrentProject());
}

export const selectCurrentTask = (): Selector<Zantt.TaskModelType | null> => createSelector(
  [(state: RootState) => state.task.taskId, (state: RootState) => state.task.tasks],
  (taskId, tasks) => {
    if (taskId === "") {
      return null;
    }
    if (!tasks || tasks.length === 0) {
      return null;
    }
    for (let task of tasks) {
      if (task.taskId === taskId) {
        return task;
      }
    }
    return null;
  }
)

export const useCurrentTaskSelector = () => {
  return useAppSelector(selectCurrentTask());
}