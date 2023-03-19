using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class EvaluationResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int AssemblyKSSMark { get; set; }
        public int SafetyMark { get; set; }
        public int WeldingTimeMark { get; set; }
        public int ConsumptionWeldingMaterialsMark { get; set; }
        public int VMCMark { get; set; }
        public int RGMMark { get; set; }
        public int TheoreticalMark { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
