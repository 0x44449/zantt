#pragma warning disable CS8625

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Zantt.Entities;
using Zantt.Services;

namespace Zantt.Tests;

[TestFixture]
public class Test_ProjectService_With_DependencyInjection
{
    private AppPack appPack = AppPack.Create();
    private ProjectService projectService;

    [OneTimeSetUp]
    public void Test_Setup()
    {
        projectService = appPack.ServiceProvider.GetRequiredService<ProjectService>();
    }

    [OneTimeTearDown]
    public void Test_Cleanup()
    {
        appPack.Dispose();
    }

    [Test]
    public void Default_CRUD_ShouldPass()
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
}
