import mock from "@/api/mock";

/** @type {Zantt.ApiResponse<Zantt.ProjectModelType[]>} */
const projects = {
  success: true,
  data: [{
    projectId: "1",
    name: "name1longnamelongname"
  }, {
    projectId: "2",
    name: "name2"
  }]
};
mock.onGet("/project/projects").reply(200, projects);