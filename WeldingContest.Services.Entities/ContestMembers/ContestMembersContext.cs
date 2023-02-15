using Microsoft.EntityFrameworkCore;

namespace WeldingContest.Services.Entities.ContestMembers
{
    public static class ContestMembersContext
    {
        public static void ContestMembersModelCreating(this ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<ComissionMember>(entity =>
            {
                entity.ToTable("ComissionMember");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Position)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Contest>(entity =>
            {
                entity.ToTable("Contest");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.DateOfBegin).HasColumnType("date");

                entity.Property(e => e.DateOfEnd).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ContestComission>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ContestComission");

                entity.Property(e => e.ComissionMemberID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ComissionMemberID");

                entity.Property(e => e.ContestID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestID");

                entity.HasOne(d => d.ComissionMember)
                    .WithMany()
                    .HasForeignKey(d => d.ComissionMemberID)
                    .HasConstraintName("FK__ContestCo__Comis__5535A963");

                entity.HasOne(d => d.Contest)
                    .WithMany()
                    .HasForeignKey(d => d.ContestID)
                    .HasConstraintName("FK__ContestCo__Conte__5441852A");
            });

            modelBuilder.Entity<Contestant>(entity =>
            {
                entity.ToTable("Contestant");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.Company)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.QR)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("QR");

                entity.Property(e => e.RFID)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("RFID");
            });
        }
    }
}
