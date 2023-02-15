using System;
using System.Collections.Generic;
using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestMembers
{
    public partial class Contest
    {
        public Contest()
        {
            ContestWorks = new HashSet<ContestWork>();
        }

        public string ID { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBegin { get; set; }
        public DateTime DateOfEnd { get; set; }

        public virtual ICollection<ContestWork> ContestWorks { get; set; }
    }
}
