import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, {
  delayResponse: 1000
});

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
    title: "title1"
  }]
};
mock.onGet("/project/projects").reply(200, tasks);