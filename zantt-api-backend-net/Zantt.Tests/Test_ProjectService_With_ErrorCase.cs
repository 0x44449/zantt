#pragma warning disable CS8625

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Zantt.Contexts;
using Zantt.Entities;
using Zantt.Exceptions;
using Zantt.Repositories;
using Zantt.Services;

namespace Zantt.Tests;

[TestFixture]
public class Test_ProjectService_With_ErrorCase
{
    private ProjectService projectService;
    private IServiceScope scope;
    private WebApplicationFactory<Program> app;

    public class NullRetunProjectRepository : ProjectRepository
    {
        public NullRetunProjectRepository(ILogger<ProjectRepository> logger, ZanttContext zanttContext) : base(logger, zanttContext)
        {
        }

        public override ProjectEntity? AddProject(ProjectEntity project) => null;

        public override ProjectEntity? UpdateProjectByProjectId(string projectId, string name) => null;

        public override ProjectEntity? GetProjectByProjectId(string projectId) => null;
    }

    [OneTimeSetUp]
    public void Test_Setup()
    {
        app = new WebApplicationFactory<Program>();
        scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        projectService = new ProjectService(
            services.GetRequiredService<ILogger<ProjectService>>(),
            new NullRetunProjectRepository(
                services.GetRequiredService<ILogger<ProjectRepository>>(),
                null));
    }

    [OneTimeTearDown]
    public void Test_Cleanup()
    {
        if (scope != null)
        {
            scope.Dispose();
        }
        if (app != null)
        {
            app.Dispose();
        }
    }

    [Test]
    public void ThrowException_AddProject_ReturnNull()
    {
        Assert.That(() => projectService.AddProject("This is test sample"), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void ThrowException_UpdateProject_ReturnNull()
    {
        Assert.That(() => projectService.UpdateProject("Sample-Project-Id", "This is test sample"), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void ThrowException_AddProject_NullName()
    {
        Assert.That(() => projectService.AddProject(null), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void ThrowException_UpdateProject_NullName()
    {
        Assert.That(() => projectService.UpdateProject("Sample-Project-Id", null), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void ThrowException_UpdateProject_NullProjectId()
    {
        Assert.That(() => projectService.UpdateProject(null, "This is test sample"), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void ThrowException_DeleteProject_NullProjectId()
    {
        Assert.That(() => projectService.DeleteProject(null), Throws.TypeOf<WellKnownApiException>());
    }
}
