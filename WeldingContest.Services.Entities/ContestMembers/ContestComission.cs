#nullable disable

namespace WeldingContest.Services.Entities.ContestMembers
{
    public partial class ContestComission
    {
        public string ContestID { get; set; }
        public string ComissionMemberID { get; set; }

        public virtual ComissionMember ComissionMember { get; set; }
        public virtual Contest Contest { get; set; }
    }
}
