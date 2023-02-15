using System;
using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class WeldingTimeResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public DateTime TimeOfBegin { get; set; }
        public DateTime TimeOfEnd { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
