using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Zantt.Entities;
using Zantt.Exceptions;
using Zantt.Services;

namespace Zantt.Tests;

[TestFixture]
public class Test_ProjectService
{
    private ProjectService projectService;
    private IServiceScope scope;
    private WebApplicationFactory<Program> app;

    [OneTimeSetUp]
    public void Test_Setup()
    {
        app = new WebApplicationFactory<Program>();
        scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        projectService = services.GetRequiredService<ProjectService>();
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
    public void Check_Simple_CRUD_Operations()
    {
        var project = new ProjectEntity
        {
            Name = "This is 테스트, ❤️🎉"
        };

        // * Add
        var addResult = projectService.AddProject(project.Name);

        Assert.That(addResult, Is.Not.Null);
        Assert.That(addResult.Name, Is.EqualTo(project.Name));

        project = addResult;

        // * Get
        var getResult = projectService.GetProject(project.ProjectId);

        Assert.That(getResult, Is.Not.Null);
        Assert.That(getResult.ProjectId, Is.EqualTo(project.ProjectId));
        Assert.That(getResult.Name, Is.EqualTo(project.Name));
        Assert.That(getResult.CreatedTime, Is.EqualTo(project.CreatedTime));

        // * Update
        project.Name = "That was 假, ╰(*°▽°*)╯";

        var updateResult = projectService.UpdateProject(project.ProjectId, project.Name);

        Assert.That(updateResult, Is.Not.Null);
        Assert.That(updateResult.ProjectId, Is.EqualTo(project.ProjectId));
        Assert.That(updateResult.Name, Is.EqualTo(project.Name));
        Assert.That(updateResult.CreatedTime, Is.EqualTo(project.CreatedTime));

        // * Delete
        projectService.DeleteProject(project.ProjectId);
        var deleteResult = projectService.GetProject(project.ProjectId);

        Assert.That(deleteResult, Is.Null);
    }

    [Test]
    public void Throw_When_Add_Project_Name_Is_Null()
    {
        Assert.That(() => projectService.AddProject(null), Throws.TypeOf<WellKnownApiException>());
    }

    [Test]
    public void Throw_When_Update_Project_Name_Is_Null()
    {
        var addResult = projectService.AddProject("This is test sample");

        Assert.That(addResult, Is.Not.Null);
        Assert.That(() => projectService.UpdateProject(addResult.ProjectId, null), Throws.TypeOf<WellKnownApiException>());

        projectService.DeleteProject(addResult.ProjectId);
    }

    [Test]
    public void Throw_When_Delete_Project_Id_Is_Null()
    {
        Assert.That(() => projectService.DeleteProject(null), Throws.TypeOf<WellKnownApiException>());
    }
}
