using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Fhirata.AspNetCore.Data;

/// <summary>
/// FHIRata EF context
/// </summary>
public class IdentityContext : IdentityDbContext<IdentityUser, IdentityRole, Guid>
{
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="options">Constructor arguments</param>
    public IdentityContext(DbContextOptions<IdentityContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        var tableMappingOptions = builder.Entity<UserMappingOption>();
        tableMappingOptions.HasKey(row => row.Id);
        tableMappingOptions.Property(row => row.UserId).IsRequired();
        tableMappingOptions.Property(row => row.Name).IsRequired().HasMaxLength(1024);
        tableMappingOptions.HasIndex(row => new { row.UserId, row.Name }).IsUnique();
        tableMappingOptions.HasOne(row => row.User).WithMany().HasForeignKey(row => row.UserId);
    }

    public virtual DbSet<UserMappingOption> Mappings { get; set; } = null!;
}
