using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class SafetyResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int LackOfProtectiveClothesCount { get; set; }
        public int WrongEquipmentUsageCount { get; set; }
        public int MachinesUntimelyDeenergizationCount { get; set; }
        public string Notes { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
