using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class ArmatureSafetyResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int WrongProtectiveClothesCount { get; set; }
        public int WrongGrinderCleaningCount { get; set; }
        public int WrongEquipmentUsageCount { get; set; }
        public string Notes { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
