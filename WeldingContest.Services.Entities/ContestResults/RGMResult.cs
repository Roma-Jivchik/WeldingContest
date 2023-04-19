using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class RGMResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int PoresAndSludgeCount { get; set; }
        public int RootConcavityCount { get; set; }
        public int LackOfPenetrationCount { get; set; }
        public int DefectsGroupCount { get; set; }
        public int DefectsBetween1n4mmCount { get; set; }
        public int DefectsBetween4n15mmCount { get; set; }
        public int DefectsBetween15n40mmCount { get; set; }
        public int DefectsOver40mmCount { get; set; }
        public int NonFusionsCount { get; set; }
        public int LackOfPenetrationOver25Count { get; set; }
        public string Notes { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
