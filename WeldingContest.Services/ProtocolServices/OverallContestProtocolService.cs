using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities;
using WeldingContest.Services.Entities.ContestMembers;
using WeldingContest.Services.Entities.ContestWorks;

namespace WeldingContest.Services.ProtocolServices
{
    class OverallContestProtocolService : IProtocolService<Contest>
    {
        private readonly WeldingContestContext weldingContestContext;

        public OverallContestProtocolService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<byte[]> Create(Contest entity)
        {
            var package = new ExcelPackage();

            var book = package.Workbook;

            var sheet = book.Worksheets.Add($"Общий протокол {entity.Name}");

            InputHeaderText(sheet);

            InputColumnsText(sheet);

            MergeColumns(sheet);

            CreateColumnBorders(sheet);

            CenterText(sheet);

            InputDataWithoutBorders(sheet, "D2", "Q2", $"Анализ результатов {entity.Name}");
            int currentRow = 6;
            var nominations = await weldingContestContext.Nominations.ToListAsync();
            var nominationsMarksList = new List<List<int>>();

            foreach (var nomination in nominations)
            {
                var contestWorks = weldingContestContext.ContestWorks
                    .Include(_ => _.Nomination)
                    .Include(_ => _.VMCResults)
                    .Where(_ => _.Nomination == nomination)
                    .Where(_ => _.VMCResults.Count != 0)
                    .ToList();

                var resultsCount = CountMarks(contestWorks);

                nominationsMarksList.Add(resultsCount);

                InputData(sheet, $"B{currentRow}", $"B{currentRow}", nomination.Title);
                InputData(sheet, $"C{currentRow}", $"C{currentRow}", contestWorks.Count.ToString());
                InputData(sheet, $"D{currentRow}", $"D{currentRow}", resultsCount.ElementAt(0).ToString());
                InputData(sheet, $"E{currentRow}", $"E{currentRow}", resultsCount.ElementAt(1).ToString());
                InputData(sheet, $"F{currentRow}", $"F{currentRow}", resultsCount.ElementAt(2).ToString());
                InputData(sheet, $"G{currentRow}", $"G{currentRow}", resultsCount.ElementAt(3).ToString());
                InputData(sheet, $"H{currentRow}", $"H{currentRow}", resultsCount.ElementAt(4).ToString());
                InputData(sheet, $"I{currentRow}", $"I{currentRow}", resultsCount.ElementAt(5).ToString());
                InputData(sheet, $"J{currentRow}", $"J{currentRow}", resultsCount.ElementAt(6).ToString());
                InputData(sheet, $"K{currentRow}", $"K{currentRow}", resultsCount.ElementAt(7).ToString());
                InputData(sheet, $"L{currentRow}", $"L{currentRow}", resultsCount.ElementAt(8).ToString());
                InputData(sheet, $"N{currentRow}", $"N{currentRow}", resultsCount.ElementAt(9).ToString());
                InputData(sheet, $"O{currentRow}", $"O{currentRow}", resultsCount.ElementAt(10).ToString());

                currentRow++;
            }

            var nominationsMarksListSum = GetNominationsMarksSum(nominationsMarksList);

            var contestWorksAll = await weldingContestContext.ContestWorks
                .Include(_ => _.VMCResults)
                .Where(_ => _.VMCResults.Count != 0)
                .ToListAsync();

            InputData(sheet, $"B{currentRow}", $"B{currentRow}", "Итого");
            InputData(sheet, $"C{currentRow}", $"C{currentRow}", contestWorksAll.Count.ToString());
            InputData(sheet, $"D{currentRow}", $"D{currentRow}", nominationsMarksListSum.ElementAt(0).ToString());
            InputData(sheet, $"E{currentRow}", $"E{currentRow}", nominationsMarksListSum.ElementAt(1).ToString());
            InputData(sheet, $"F{currentRow}", $"F{currentRow}", nominationsMarksListSum.ElementAt(2).ToString());
            InputData(sheet, $"G{currentRow}", $"G{currentRow}", nominationsMarksListSum.ElementAt(3).ToString());
            InputData(sheet, $"H{currentRow}", $"H{currentRow}", nominationsMarksListSum.ElementAt(4).ToString());
            InputData(sheet, $"I{currentRow}", $"I{currentRow}", nominationsMarksListSum.ElementAt(5).ToString());
            InputData(sheet, $"J{currentRow}", $"J{currentRow}", nominationsMarksListSum.ElementAt(6).ToString());
            InputData(sheet, $"K{currentRow}", $"K{currentRow}", nominationsMarksListSum.ElementAt(7).ToString());
            InputData(sheet, $"L{currentRow}", $"L{currentRow}", nominationsMarksListSum.ElementAt(8).ToString());
            InputData(sheet, $"N{currentRow}", $"N{currentRow}", nominationsMarksListSum.ElementAt(9).ToString());
            InputData(sheet, $"O{currentRow}", $"O{currentRow}", nominationsMarksListSum.ElementAt(10).ToString());

            return package.GetAsByteArray();
        }

        static List<int> GetNominationsMarksSum(List<List<int>> nominationsMarksList)
        {
            var nominationsMarksListSum = new List<int>();

            for (var i = 0; i < nominationsMarksList.ElementAt(0).Count; i++)
            {
                var count = 0;

                foreach (var list in nominationsMarksList)
                {
                    count += list.ElementAt(i);
                }

                nominationsMarksListSum.Add(count);
            }

            return nominationsMarksListSum;
        }

        static void CenterText(ExcelWorksheet sheet)
        {
            sheet.Cells["B4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            sheet.Cells["B4"].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            sheet.Cells["C4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            sheet.Cells["C4"].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            sheet.Cells["B5:AB5"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            sheet.Cells["B5:AB5"].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            sheet.Column(2).Width = 20;
            sheet.Column(3).Width = 20;

            sheet.Cells["C4"].Style.WrapText = true;
            sheet.Cells["P4"].Style.WrapText = true;
            sheet.Cells["U5:Y5"].Style.WrapText = true;
        }

        static void CreateColumnBorders(ExcelWorksheet sheet)
        {
            sheet.Cells["B4:B5"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            sheet.Cells["C4:C5"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            sheet.Cells["D4:O4"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            sheet.Cells["Q4:S4"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            sheet.Cells["U4:Y4"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);

            sheet.Cells["D5"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);

            for (var i = 0; i < Resources.ExcelAlphabet.Count; i++)
            {
                string index = Resources.ExcelAlphabet[i];

                sheet.Cells[$"{index}5"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            }


            sheet.Cells["P4"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            sheet.Cells["T4"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);

            sheet.Cells["Z4:AB4"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
        }

        static void InputHeaderText(ExcelWorksheet sheet)
        {
            sheet.Cells["B4"].Value = "Номинация";
            sheet.Cells["C4"].Value = "Количество участников конкурса";
            sheet.Cells["D4"].Value = "Количество выявленных дефектов при визуально-измерительном контроле";
            sheet.Cells["P4"].Value = "RT";
            sheet.Cells["Q4"].Value = "Радиографический контроль";
            sheet.Cells["T4"].Value = "МИ";
            sheet.Cells["U4"].Value = "Механическиe испытания (для арматуры)";
        }

        static void InputColumnsText(ExcelWorksheet excelWorksheet)
        {
            for (int i = 0; i < Resources.ExcelAlphabet.Count; i++)
            {
                string index = Resources.ExcelAlphabet[i];

                string text = Resources.ExcelColumnsText[i];

                excelWorksheet.Cells[$"{index}5"].Value = text;
            }

            excelWorksheet.Cells["D5:AB5"].Style.TextRotation = 180;
        }

        static void MergeColumns(ExcelWorksheet sheet)
        {
            sheet.Cells["B4:B5"].Merge = true;
            sheet.Cells["C4:C5"].Merge = true;
            sheet.Cells["D4:O4"].Merge = true;
            sheet.Cells["Q4:S4"].Merge = true;
            sheet.Cells["U4:Y4"].Merge = true;
            sheet.Cells["Z4:AB4"].Merge = true;
        }

        static void InputData(ExcelWorksheet xlWorkSheet, string startCell, string endCell, string data)
        {
            List<string> alphabet = new List<string>()
            { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };

            int firstCellIndexRow = int.Parse(startCell[1..]);
            int firstCellIndexColumn = alphabet.FindIndex(_ => _ == startCell.Substring(0, 1)) + 1;
            xlWorkSheet.Cells[firstCellIndexRow, firstCellIndexColumn].Value = data;
            xlWorkSheet.Cells[firstCellIndexRow, firstCellIndexColumn].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
        }

        static void InputDataWithoutBorders(ExcelWorksheet xlWorkSheet, string startCell, string endCell, string data)
        {
            List<string> alphabet = new List<string>()
            { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };

            int firstCellIndexRow = int.Parse(startCell[1..]);
            int firstCellIndexColumn = alphabet.FindIndex(_ => _ == startCell.Substring(0, 1)) + 1;
            xlWorkSheet.Cells[firstCellIndexRow, firstCellIndexColumn].Value = data;
        }

        private List<int> CountMarks(List<ContestWork> contestWorks)
        {
            List<int> result = new List<int>();

            int countLackOfPenetration = 0;
            int countEdgeOffset = 0;
            int countUndercut = 0;
            int countSinking = 0;
            int countExcessPenetration = 0;
            int countExcessSeamWidth = 0;
            int countExcessSeamConvexity = 0;
            int countExcessSeamScaling = 0;
            int countRoughTransition = 0;
            int countSeamGeometry = 0;
            int countOtherWarnings = 0;

            foreach (var contestWork in contestWorks)
            {
                var vmcResult = contestWork.VMCResults.ElementAt(0);

                if (vmcResult.LackOfPenetrationUpTo10mmCount != 0 || vmcResult.LackOfPenetrationFrom10mmTo20mmCount != 0 || vmcResult.LackOfPenetrationFrom20mmCount != 0)
                {
                    countLackOfPenetration++;
                }

                if (vmcResult.EdgeOffsetCount != 0)
                {
                    countEdgeOffset++;
                }

                if (vmcResult.UndercutUpTo10mmCount != 0 || vmcResult.UndercutFrom20mmCount != 0 || vmcResult.UndercutRemovalCount != 0)
                {
                    countUndercut++;
                }

                if (vmcResult.SinkingCount != 0)
                {
                    countSinking++;
                }

                if (vmcResult.ExcessPenetrationCount != 0)
                {
                    countExcessPenetration++;
                }

                if (vmcResult.ExcessSeamWidthCount != 0)
                {
                    countExcessSeamWidth++;
                }

                if (vmcResult.ExcessSeamConvexityCount != 0)
                {
                    countExcessSeamConvexity++;
                }

                if (vmcResult.ExcessSeamScalingCount != 0)
                {
                    countExcessSeamScaling++;
                }

                if (vmcResult.RoughTransitionCount != 0)
                {
                    countRoughTransition++;
                }

                if (vmcResult.SeamGeometryCount != 0)
                {
                    countSeamGeometry++;
                }

                if (vmcResult.OtherWarningsCount != 0)
                {
                    countOtherWarnings++;
                }
            }

            result.Add(countLackOfPenetration);
            result.Add(countEdgeOffset);
            result.Add(countUndercut);
            result.Add(countSinking);
            result.Add(countExcessPenetration);
            result.Add(countExcessSeamWidth);
            result.Add(countExcessSeamConvexity);
            result.Add(countExcessSeamScaling);
            result.Add(countRoughTransition);
            result.Add(countSeamGeometry);
            result.Add(countOtherWarnings);

            return result;
        }
    }
}
