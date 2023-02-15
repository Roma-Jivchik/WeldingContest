using System.Collections.Generic;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.Entities.ContestMembers;

#nullable disable

namespace WeldingContest.Services.Entities.ContestWorks
{
    public partial class ContestWork
    {
        public ContestWork()
        {
            ArmatureAssemblyKSSResults = new HashSet<ArmatureAssemblyKSSResult>();
            ArmatureEvaluationResults = new HashSet<ArmatureEvaluationResult>();
            ArmatureSafetyResults = new HashSet<ArmatureSafetyResult>();
            ArmatureVMCResults = new HashSet<ArmatureVMCResult>();
            AssemblyKSSResults = new HashSet<AssemblyKSSResult>();
            ConsumptionWeldingMaterialsResults = new HashSet<ConsumptionWeldingMaterialsResult>();
            EvaluationResults = new HashSet<EvaluationResult>();
            MechanicalTestResults = new HashSet<MechanicalTestResult>();
            RGMResults = new HashSet<RGMResult>();
            SafetyResults = new HashSet<SafetyResult>();
            TheoreticalResults = new HashSet<TheoreticalResult>();
            VMCResults = new HashSet<VMCResult>();
            WeldingTimeResults = new HashSet<WeldingTimeResult>();
        }

        public string ID { get; set; }
        public string ContestID { get; set; }
        public string ContestantID { get; set; }
        public string NominationID { get; set; }

        public virtual Contest Contest { get; set; }
        public virtual Contestant Contestant { get; set; }
        public virtual Nomination Nomination { get; set; }
        public virtual ICollection<ArmatureAssemblyKSSResult> ArmatureAssemblyKSSResults { get; set; }
        public virtual ICollection<ArmatureEvaluationResult> ArmatureEvaluationResults { get; set; }
        public virtual ICollection<ArmatureSafetyResult> ArmatureSafetyResults { get; set; }
        public virtual ICollection<ArmatureVMCResult> ArmatureVMCResults { get; set; }
        public virtual ICollection<AssemblyKSSResult> AssemblyKSSResults { get; set; }
        public virtual ICollection<ConsumptionWeldingMaterialsResult> ConsumptionWeldingMaterialsResults { get; set; }
        public virtual ICollection<EvaluationResult> EvaluationResults { get; set; }
        public virtual ICollection<MechanicalTestResult> MechanicalTestResults { get; set; }
        public virtual ICollection<RGMResult> RGMResults { get; set; }
        public virtual ICollection<SafetyResult> SafetyResults { get; set; }
        public virtual ICollection<TheoreticalResult> TheoreticalResults { get; set; }
        public virtual ICollection<VMCResult> VMCResults { get; set; }
        public virtual ICollection<WeldingTimeResult> WeldingTimeResults { get; set; }
    }
}
