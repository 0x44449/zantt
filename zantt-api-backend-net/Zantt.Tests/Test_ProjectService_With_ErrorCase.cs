#pragma warning disable CS8625

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using Zantt.Contexts;
using Zantt.Entities;
using Zantt.Exceptions;
using Zantt.Repositories;
using Zantt.Services;

namespace Zantt.Tests;

[TestFixture]
public class Test_ProjectService_With_ErrorCase
{
    private AppPack appPack = AppPack.Create();
    private ProjectService projectService;

    [OneTimeSetUp]
    public void Test_Setup()
    {
        ProjectEntity? expect = null;
        var mockProjectRepository = new Mock<ProjectRepository>(
            Mock.Of<ILogger<ProjectRepository>>(),
            appPack.ServiceProvider.GetRequiredService<ZanttContext>())
        {
            CallBase = true,
        };
        mockProjectRepository.Setup(x => x.AddProject(It.IsAny<string>())).Returns(expect);
        mockProjectRepository.Setup(x => x.UpdateProjectByProjectId(It.IsAny<string>(), It.IsAny<string>())).Returns(expect);
        mockProjectRepository.Setup(x => x.GetProjectByProjectId(It.IsAny<string>())).Returns(expect);

        projectService = new ProjectService(
            appPack.ServiceProvider.GetRequiredService<ILogger<ProjectService>>(),
            mockProjectRepository.Object);
    }

    [OneTimeTearDown]
    public void Test_Cleanup()
    {
        appPack.Dispose();
    }

    [Test]
    public void Pass_GetProject_ReturnNull()
    {
        Assert.That(projectService.GetProject("This is test sample"), Is.Null);
    }

    [Test]
    public void Pass_AddProject_ReturnNull()
    {
        Assert.That(projectService.AddProject("This is test sample"), Is.Null);
    }

    [Test]
    public void Pass_UpdateProject_ReturnNull()
    {
        Assert.That(projectService.UpdateProject("Sample-Project-Id", "This is test sample"), Is.Null);
    }

    [Test]
    public void ThrowException_AddProject_NameIsNull()
    {
        Assert.That(() => projectService.AddProject(null), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void ThrowException_UpdateProject_NameIsNull()
    {
        Assert.That(() => projectService.UpdateProject("Sample-Project-Id", null), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void ThrowException_UpdateProject_ProjectIdIsNull()
    {
        Assert.That(() => projectService.UpdateProject(null, "This is test sample"), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void ThrowException_DeleteProject_ProjectIdIsNull()
    {
        Assert.That(() => projectService.DeleteProject(null), Throws.TypeOf<WellKnownApiException>());
    }
}
