using Microsoft.EntityFrameworkCore;

namespace WeldingContest.Services.Entities.ContestWorks
{
    public static class ContestWorksContext
    {
        public static void ContestWorksModelCreating(this ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<ContestWork>(entity =>
            {
                entity.ToTable("ContestWork");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.ContestID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestID");

                entity.Property(e => e.ContestantID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ContestantID");

                entity.Property(e => e.NominationID)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("NominationID");

                entity.HasOne(d => d.Contest)
                    .WithMany(p => p.ContestWorks)
                    .HasForeignKey(d => d.ContestID)
                    .HasConstraintName("FK__ContestWo__Conte__5165187F");

                entity.HasOne(d => d.Contestant)
                    .WithMany(p => p.ContestWorks)
                    .HasForeignKey(d => d.ContestantID)
                    .HasConstraintName("FK__ContestWo__Conte__52593CB8");

                entity.HasOne(d => d.Nomination)
                    .WithMany(p => p.ContestWorks)
                    .HasForeignKey(d => d.NominationID)
                    .HasConstraintName("FK__ContestWo__Nomin__534D60F1");
            });

            modelBuilder.Entity<Nomination>(entity =>
            {
                entity.ToTable("Nomination");

                entity.Property(e => e.ID)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("ID");

                entity.Property(e => e.Material)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Thickness)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.WeldingType)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
        }
    }
}
