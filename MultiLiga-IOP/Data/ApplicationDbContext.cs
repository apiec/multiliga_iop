using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MultiLiga_IOP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MultiLiga_IOP.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Discipline> Disciplines { get; set; }
        public DbSet<League> Leagues { get; set; }
        public DbSet<Season> Seasons { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<RaceSignUp> RaceSignUps { get; set; }
        public DbSet<RouteDetails> RouteDetails { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<League>()
                .HasOne(l => l.Discipline)
                .WithMany(d => d.Leagues)
                .HasForeignKey(l => l.DisciplineId);

            modelBuilder.Entity<Season>()
                .HasOne(s => s.League)
                .WithMany(l => l.Seasons)
                .HasForeignKey(s => s.LeagueId);

            modelBuilder.Entity<Race>()
                .HasOne(r => r.Season)
                .WithMany(s => s.Races)
                .HasForeignKey(r => r.SeasonId);

            modelBuilder.Entity<RaceSignUp>()
                .HasOne(su => su.Race)
                .WithMany(r => r.SignUps)
                .HasForeignKey(su => su.RaceId);

            modelBuilder.Entity<RaceSignUp>()
                .HasOne(su => su.ApplicationUser)
                .WithMany(u => u.RaceSignUps)
                .HasForeignKey(su => su.ApplicationUserId);

            modelBuilder.Entity<RaceSignUp>()
                .HasKey(su => new { su.ApplicationUserId, su.RaceId });

        }
    }
}
