import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, {
  delayResponse: 1000
});

/** @type {Zantt.ApiResponse<Zantt.ProjectModelType[]>} */
const projects = {
  success: true,
  data: [{
    projectId: "1",
    name: "name1"
  }, {
    projectId: "2",
    name: "name2"
  }]
};
mock.onGet("/project/projects").reply(200, projects);