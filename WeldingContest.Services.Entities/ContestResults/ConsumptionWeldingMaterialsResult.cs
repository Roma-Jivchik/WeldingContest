﻿using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestResults
{
    public partial class ConsumptionWeldingMaterialsResult
    {
        public string ID { get; set; }
        public string ContestWorkID { get; set; }
        public int? ConsumbleMaterialAmount { get; set; }
        public int OverallMark { get; set; }

        public virtual ContestWork ContestWork { get; set; }
    }
}
