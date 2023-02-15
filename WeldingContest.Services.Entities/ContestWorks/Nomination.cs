using System.Collections.Generic;

#nullable disable

namespace WeldingContest.Services.Entities.ContestWorks
{
    public partial class Nomination
    {
        public Nomination()
        {
            ContestWorks = new HashSet<ContestWork>();
        }

        public string ID { get; set; }
        public string Title { get; set; }
        public int Size { get; set; }
        public string Thickness { get; set; }
        public string Material { get; set; }
        public string WeldingType { get; set; }

        public virtual ICollection<ContestWork> ContestWorks { get; set; }
    }
}
