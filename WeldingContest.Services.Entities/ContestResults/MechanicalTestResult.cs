using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class MechanicalTestResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int DestructionWeldLessStrength { get; set; }
        public int DestructionWeldEqualsStrength { get; set; }
        public int DestructionHeatAffectedLessStrength { get; set; }
        public int DestructionHeatAffectedEqualsStrength { get; set; }
        public int DestructionBaseMetalCount { get; set; }
        public string Notes { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
