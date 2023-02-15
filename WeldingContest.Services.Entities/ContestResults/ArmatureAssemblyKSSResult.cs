using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class ArmatureAssemblyKSSResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public bool SampleRepositioning { get; set; }
        public int SeamsUncleaningCount { get; set; }
        public int TackDefectsCount { get; set; }
        public int NumberTacksChanges { get; set; }
        public int UnfinishedEdgesCount { get; set; }
        public int HeatAffectedSeamZonesUncleaningCount { get; set; }
        public int GrinderCleaningCount { get; set; }
        public int DeviationFromWeldingModesCount { get; set; }
        public int OtherWarningsCount { get; set; }
        public int WeldingTechnologyGeneralViolationsCount { get; set; }
        public string Notes { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
