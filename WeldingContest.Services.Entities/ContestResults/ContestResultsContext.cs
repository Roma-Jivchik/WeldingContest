using Microsoft.EntityFrameworkCore;

namespace WeldingContest.Services.Entities.ContestResults
{
    public static class ContestResultsContext
    {
        public static void ContestResultsModelCreating(this ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<ArmatureAssemblyKSSResult>(entity =>
            {
                entity.ToTable("ArmatureAssemblyKSSResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.Property(e => e.Notes)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.ArmatureAssemblyKSSResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__AmmatureA__Conte__5CD6CB2B");
            });

            modelBuilder.Entity<ArmatureEvaluationResult>(entity =>
            {
                entity.ToTable("ArmatureEvaluationResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.AmmatureAssemblyKssmark).HasColumnName("AmmatureAssemblyKSSMark");

                entity.Property(e => e.AmmatureVmcmark).HasColumnName("AmmatureVMCMark");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.ArmatureEvaluationResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__AmmatureE__Conte__5DCAEF64");
            });

            modelBuilder.Entity<ArmatureSafetyResult>(entity =>
            {
                entity.ToTable("ArmatureSafetyResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.Property(e => e.Notes)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.ArmatureSafetyResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__AmmatureS__Conte__5EBF139D");
            });

            modelBuilder.Entity<ArmatureVMCResult>(entity =>
            {
                entity.ToTable("ArmatureVMCResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.Property(e => e.Notes)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.ArmatureVMCResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__AmmatureV__Conte__619B8048");
            });

            modelBuilder.Entity<AssemblyKSSResult>(entity =>
            {
                entity.ToTable("AssemblyKSSResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.Property(e => e.Notes)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.WPSNumberTacksChanges).HasColumnName("WPSNumberTacksChanges");

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.AssemblyKSSResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__AssemblyK__Conte__5629CD9C");
            });

            modelBuilder.Entity<ConsumptionWeldingMaterialsResult>(entity =>
            {
                entity.ToTable("ConsumptionWeldingMaterialsResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.ConsumptionWeldingMaterialsResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__Consumpti__Conte__59063A47");
            });

            modelBuilder.Entity<EvaluationResult>(entity =>
            {
                entity.ToTable("EvaluationResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.AssemblyKSSMark).HasColumnName("AssemblyKSSMark");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.Property(e => e.RGMMark).HasColumnName("RGMMark");

                entity.Property(e => e.VMCMark).HasColumnName("VMCMark");

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.EvaluationResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__Evaluatio__Conte__5BE2A6F2");
            });

            modelBuilder.Entity<MechanicalTestResult>(entity =>
            {
                entity.ToTable("MechanicalTestResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.MechanicalTestResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__Mechanica__Conte__5FB337D6");
            });

            modelBuilder.Entity<RGMResult>(entity =>
            {
                entity.ToTable("RGMResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.RGMResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__RGMResult__Conte__5AEE82B9");
            });

            modelBuilder.Entity<SafetyResult>(entity =>
            {
                entity.ToTable("SafetyResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.Property(e => e.Notes)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.SafetyResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__SafetyRes__Conte__571DF1D5");
            });

            modelBuilder.Entity<TheoreticalResult>(entity =>
            {
                entity.ToTable("TheoreticalResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.TheoreticalResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__Theoretic__Conte__60A75C0F");
            });

            modelBuilder.Entity<VMCResult>(entity =>
            {
                entity.ToTable("VMCResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.Property(e => e.Notes)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.VMCResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__VMCResult__Conte__59FA5E80");
            });

            modelBuilder.Entity<WeldingTimeResult>(entity =>
            {
                entity.ToTable("WeldingTimeResult");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestWorkID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestWorkID");

                entity.Property(e => e.TimeOfBegin).HasColumnType("date");

                entity.Property(e => e.TimeOfEnd).HasColumnType("date");

                entity.HasOne(d => d.ContestWork)
                    .WithMany(p => p.WeldingTimeResults)
                    .HasForeignKey(d => d.ContestWorkID)
                    .HasConstraintName("FK__WeldingTi__Conte__5812160E");
            });
        }
    }
}
