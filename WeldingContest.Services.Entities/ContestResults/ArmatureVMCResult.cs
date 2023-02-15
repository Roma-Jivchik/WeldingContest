using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class ArmatureVMCResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int CraterPresenceCount { get; set; }
        public int InsufficientSeamLengthCount { get; set; }
        public int UndercutUpTo5mmCount { get; set; }
        public int UndercutFrom5mmCount { get; set; }
        public int ContiuousUndercutCount { get; set; }
        public int ExcessSeamWidthCount { get; set; }
        public int LeakCount { get; set; }
        public int RoughTransitionCount { get; set; }
        public int OtherWarningsCount { get; set; }
        public int SeamGeometryCount { get; set; }
        public string Notes { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
