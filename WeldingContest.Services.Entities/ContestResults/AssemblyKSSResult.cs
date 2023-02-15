using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class AssemblyKSSResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public double GapSize { get; set; }
        public int UnfinishedEdgesCount { get; set; }
        public int WPSNumberTacksChanges { get; set; }
        public int SeamsUncleaningCount { get; set; }
        public int HeatAffectedSeamZonesUncleaningCount { get; set; }
        public int GrinderCleaningCount { get; set; }
        public int DeviationFromWeldingModesCount { get; set; }
        public int SampleRepositioningCount { get; set; }
        public int PersonalWeldingToolsUsed { get; set; }
        public string Notes { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
