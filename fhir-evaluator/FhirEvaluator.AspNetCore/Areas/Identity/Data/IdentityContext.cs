using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FhirEvaluator.AspNetCore.Data;

public class IdentityContext : IdentityDbContext<IdentityUser, IdentityRole, Guid>
{
    public IdentityContext(DbContextOptions<IdentityContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        var tableMappingOptions = builder.Entity<UserMappingOption>();
        tableMappingOptions.HasKey(row => row.Id);
        tableMappingOptions.Property(row => row.Name).IsRequired().HasMaxLength(1024);
        tableMappingOptions.HasOne(row => row.User).WithMany().HasForeignKey(row => row.UserId);
    }
}
