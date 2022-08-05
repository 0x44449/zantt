using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Zantt.Repositories;

namespace Zantt.Tests;

[TestFixture]
public class Test_ProjectRepository_With_DefaultOperationCase
{
    private AppPack appPack = AppPack.Create();
    private ProjectRepository projectRepository;

    [OneTimeSetUp]
    public void Test_Setup()
    {
        projectRepository = appPack.ServiceProvider.GetRequiredService<ProjectRepository>();
    }

    [OneTimeTearDown]
    public void Test_Cleanup()
    {
        appPack.Dispose();
    }
}
