using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace WeldingContest.DataAccess
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDataLayer(
            this IServiceCollection services,
            string connectionString
            )
        {
            services.AddDbContext<WeldingContestContext>(options => options.UseSqlServer(connectionString));

            return services;
        }
    }
}
