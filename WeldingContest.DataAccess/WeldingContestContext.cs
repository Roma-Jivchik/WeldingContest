using Microsoft.EntityFrameworkCore;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.Entities.ContestMembers;
using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.DataAccess
{
    public partial class WeldingContestContext : DbContext
    {
        public WeldingContestContext(DbContextOptions<WeldingContestContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<ArmatureAssemblyKSSResult> ArmatureAssemblyKSSResults { get; set; }
        public virtual DbSet<ArmatureEvaluationResult> ArmatureEvaluationResults { get; set; }
        public virtual DbSet<ArmatureSafetyResult> ArmatureSafetyResults { get; set; }
        public virtual DbSet<ArmatureVMCResult> ArmatureVMCResults { get; set; }
        public virtual DbSet<AssemblyKSSResult> AssemblyKSSResults { get; set; }
        public virtual DbSet<ComissionMember> ComissionMembers { get; set; }
        public virtual DbSet<ConsumptionWeldingMaterialsResult> ConsumptionWeldingMaterialsResults { get; set; }
        public virtual DbSet<Contest> Contests { get; set; }
        public virtual DbSet<ContestComission> ContestComissions { get; set; }
        public virtual DbSet<ContestWork> ContestWorks { get; set; }
        public virtual DbSet<Contestant> Contestants { get; set; }
        public virtual DbSet<EvaluationResult> EvaluationResults { get; set; }
        public virtual DbSet<MechanicalTestResult> MechanicalTestResults { get; set; }
        public virtual DbSet<Nomination> Nominations { get; set; }
        public virtual DbSet<RGMResult> RGMResults { get; set; }
        public virtual DbSet<SafetyResult> SafetyResults { get; set; }
        public virtual DbSet<TheoreticalResult> TheoreticalResults { get; set; }
        public virtual DbSet<VMCResult> VMCResults { get; set; }
        public virtual DbSet<WeldingTimeResult> WeldingTimeResults { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ContestWorksModelCreating();

            modelBuilder.ContestMembersModelCreating();

            modelBuilder.ContestResultsModelCreating();

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
