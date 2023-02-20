using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class VMCResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int LackOfPenetrationUpTo10mmCount { get; set; }
        public int LackOfPenetrationFrom10mmTo20mmCount { get; set; }
        public int LackOfPenetrationFrom20mmCount { get; set; }
        public int EdgeOffsetCount { get; set; }
        public int UndercutUpTo10mmCount { get; set; }
        public int UndercutFrom20mmCount { get; set; }
        public int UndercutRemovalCount { get; set; }
        public int SinkingCount { get; set; }
        public int ExcessPenetrationCount { get; set; }
        public int ExcessSeamWidthCount { get; set; }
        public int ExcessSeamConvexityCount { get; set; }
        public int ExcessSeamScalingCount { get; set; }
        public int RoughTransitionCount { get; set; }
        public int OtherWarningsCount { get; set; }
        public int SeamGeometryCount { get; set; }
        public int PipeSeamsDisplacement { get; set; }
        public string Notes { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
