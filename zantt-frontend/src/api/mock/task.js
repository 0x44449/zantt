import mock from "@/api/mock";

/** @type {Zantt.ApiResponse<Zantt.TaskModelType[]>} */
const tasks1 = {
  success: true,
  data: [{
    taskId: "1",
    projectId: "1",
    title: "title1"
  }, {
    taskId: "2",
    projectId: "1",
    title: "title2"
  }, {
    taskId: "3",
    projectId: "1",
    title: "title3"
  }, {
    taskId: "4",
    projectId: "1",
    title: "title4"
  }, {
    taskId: "5",
    projectId: "1",
    title: "title5"
  }]
};
const tasks2 = {
  success: true,
  data: [{
    taskId: "1",
    projectId: "2",
    title: "title1-1"
  }, {
    taskId: "2",
    projectId: "2",
    title: "title2-1"
  }, {
    taskId: "3",
    projectId: "2",
    title: "title3-1"
  }, {
    taskId: "4",
    projectId: "2",
    title: "title4-1"
  }, {
    taskId: "5",
    projectId: "2",
    title: "title5-1"
  }]
};
mock.onGet("/task/tasks", { params: { projectId: "1" } }).reply(200, tasks1);
mock.onGet("/task/tasks").reply(200, tasks2);