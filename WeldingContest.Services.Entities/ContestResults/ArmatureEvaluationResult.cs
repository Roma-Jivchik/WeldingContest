using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class ArmatureEvaluationResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int AmmatureAssemblyKssmark { get; set; }
        public int AmmatureSafetyMark { get; set; }
        public int WeldingTimeMark { get; set; }
        public int ConsumptionWeldingMaterialsMark { get; set; }
        public int AmmatureVmcmark { get; set; }
        public int MechanicalTestingMark { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
