using System.Collections.Generic;
using WeldingContest.Services.Entities.ContestWorks;

#nullable disable

namespace WeldingContest.Services.Entities.ContestMembers
{
    public partial class Contestant
    {
        public Contestant()
        {
            ContestWorks = new HashSet<ContestWork>();
        }

        public string ID { get; set; }
        public string FullName { get; set; }
        public string RFID { get; set; }
        public string QR { get; set; }
        public string Company { get; set; }

        public virtual ICollection<ContestWork> ContestWorks { get; set; }
    }
}
