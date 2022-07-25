import mock from "@/api/mock";

/** @type {Zantt.ApiResponse<Zantt.TaskModelType[]>} */
const tasks = {
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
mock.onGet("/task/tasks").reply(200, tasks);