using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCRS2021.Models
{
    public partial class TRCSContext : DbContext
    {
        public TRCSContext()
        {
        }

        public TRCSContext(DbContextOptions<TRCSContext> options)
            : base(options)
        {

        }

        public virtual DbSet<UserInfo> UserInfo { get; set; }
        public virtual DbSet<Job> Job { get; set; }
        public virtual DbSet<Language> Language { get; set; }
        public virtual DbSet<Learner> Learner { get; set; }
        public virtual DbSet<Major> Major { get; set; }
        public virtual DbSet<Offlinecourse> Offlinecourse { get; set; }
        public virtual DbSet<Onlinecourse> Onlinecourse { get; set; }
        public virtual DbSet<Technology> Technology { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;database=covid19");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.HasKey(e => e.UserId);
                //entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                //entity.Property(e => e.PasswordHash).HasMaxLength(150).HasColumnType("varbinary");
                //entity.Property(e => e.PasswordSalt).HasMaxLength(150).HasColumnType("varbinary");
                //entity.Property(e => e.Active).HasMaxLength(150).HasColumnType("bit");
                //entity.Property(e => e.Email).HasMaxLength(50);
                //entity.Property(e => e.Name).HasMaxLength(150);
            });

            modelBuilder.Entity<Job>(entity =>
            {
                entity.HasKey(e => e.jobID);
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.HasKey(e => e.languageID);
            });

            modelBuilder.Entity<Learner>(entity =>
            {
                entity.HasKey(e => e.learnerID);
            });

            modelBuilder.Entity<Major>(entity =>
            {
                entity.HasKey(e => e.subjectID);
            });

            modelBuilder.Entity<Offlinecourse>(entity =>
            {
                entity.HasKey(e => e.courseID);
            });

            modelBuilder.Entity<Onlinecourse>(entity =>
            {
                entity.HasKey(e => e.courseID);
            });

            modelBuilder.Entity<Technology>(entity =>
            {
                entity.HasKey(e => e.techID);
            });

            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
