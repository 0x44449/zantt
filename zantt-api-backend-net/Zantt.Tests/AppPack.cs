using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Zantt.Tests;

internal class AppPack : IDisposable
{
    private readonly IServiceScope scope;
    private readonly WebApplicationFactory<Program> app;

    public IServiceProvider ServiceProvider
    {
        get
        {
            return scope.ServiceProvider;
        }
    }

    private AppPack(WebApplicationFactory<Program> app)
    {
        this.app = app;
        scope = app.Services.CreateScope();
    }

    public static AppPack Create()
    {
        var app = new WebApplicationFactory<Program>();

        return new AppPack(app);
    }

    public void Dispose()
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
}
