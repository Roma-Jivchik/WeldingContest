using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities;
using WeldingContest.Services.Entities.ContestMembers;
using WeldingContest.Services.Entities.ContestResults;
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
            using var package = new ExcelPackage();

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
            var evaluationResults = await weldingContestContext.EvaluationResults.ToListAsync();

            foreach (var nomination in nominations)
            {
                var contestWorks = weldingContestContext.ContestWorks
                    .Include(_ => _.Nomination)
                    .Include(_ => _.VMCResults)
                    .Where(_ => _.Nomination == nomination)
                    .Where(_ => _.VMCResults.Count != 0)
                    .ToList();

                var resultsCount = CountVMCMarks(contestWorks);

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
                InputData(sheet, $"M{currentRow}", $"M{currentRow}", resultsCount.ElementAt(9).ToString());
                InputData(sheet, $"N{currentRow}", $"N{currentRow}", resultsCount.ElementAt(10).ToString());
                InputData(sheet, $"O{currentRow}", $"O{currentRow}", resultsCount.ElementAt(11).ToString());

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
            InputData(sheet, $"M{currentRow}", $"M{currentRow}", nominationsMarksListSum.ElementAt(9).ToString());
            InputData(sheet, $"N{currentRow}", $"N{currentRow}", nominationsMarksListSum.ElementAt(10).ToString());
            InputData(sheet, $"O{currentRow}", $"O{currentRow}", nominationsMarksListSum.ElementAt(11).ToString());

            InputRGMData(evaluationResults, sheet, currentRow);

            return package.GetAsByteArray();
        }

        static void InputRGMData(List<EvaluationResult> evaluationResults, ExcelWorksheet excelWorksheet, int currentRow)
        {
            var RGMContestWorks = CountRGMContestWorks(evaluationResults);

            excelWorksheet.Cells["P6"].Value = RGMContestWorks.ElementAt(0);
            excelWorksheet.Cells["P8"].Value = RGMContestWorks.ElementAt(1);
            excelWorksheet.Cells["P9"].Value = RGMContestWorks.ElementAt(2);
            excelWorksheet.Cells["P7"].Value = "X";
            excelWorksheet.Cells["P10"].Value = RGMContestWorks.ElementAt(3);
        }

        static void InputRGMMarks(List<ContestWork> contestWorks, ExcelWorksheet sheet, int currentRow)
        {
            var RGMMarks = CountRGMMarks(contestWorks);

            sheet.Cells["Q6"].Value = RGMMarks.ElementAt(0);
            sheet.Cells["Q8"].Value = RGMMarks.ElementAt(1);
            sheet.Cells["Q9"].Value = RGMMarks.ElementAt(2);
            sheet.Cells["R6"].Value = RGMMarks.ElementAt(3);
            sheet.Cells["R8"].Value = RGMMarks.ElementAt(4);
            sheet.Cells["R9"].Value = RGMMarks.ElementAt(5);
            sheet.Cells["S6"].Value = RGMMarks.ElementAt(6);
            sheet.Cells["S8"].Value = RGMMarks.ElementAt(7);
            sheet.Cells["S9"].Value = RGMMarks.ElementAt(8);

            sheet.Cells["Q7"].Value = "X";
            sheet.Cells["R7"].Value = "X";
            sheet.Cells["S7"].Value = "X";

            sheet.Cells["Q10"].Value = RGMMarks.ElementAt(9);
            sheet.Cells["S10"].Value = RGMMarks.ElementAt(10);
            sheet.Cells["R10"].Value = RGMMarks.ElementAt(11);
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
            sheet.Cells["P5"].Style.WrapText = true;
            sheet.Cells["T5"].Style.WrapText = true;
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

        static List<int> CountRGMMarks(List<ContestWork> contestWorks)
        {
            List<int> result = new();

            int A135poresAndSludgeCount = 0;
            int B141poresAndSludgeCount = 0;
            int B111poresAndSludgeCount = 0;
            int A135rootConcavityCount = 0;
            int B141rootConcavityCount = 0;
            int B111rootConcavityCount = 0;
            int A135lackOfPenetrationCount = 0;
            int B141lackOfPenetrationCount = 0;
            int B111lackOfPenetrationCount = 0;

            int overallPoresAndSludgeCount = 0;
            int overallRootConcavityCount = 0;
            int overallLackOfPenetrationCount = 0;

            foreach (var contestWork in contestWorks)
            {
                var title = contestWork.Nomination.Title;
                var RGMResult = contestWork.RGMResults.ElementAt(0);

                if (title == "A 135")
                {
                    A135poresAndSludgeCount += RGMResult.PoresAndSludgeCount;
                    A135lackOfPenetrationCount += RGMResult.LackOfPenetrationCount;
                    A135rootConcavityCount += RGMResult.RootConcavityCount;
                }
                else if (title == "Б-141")
                {
                    B141lackOfPenetrationCount += RGMResult.LackOfPenetrationCount;
                    B141poresAndSludgeCount += RGMResult.PoresAndSludgeCount;
                    B141rootConcavityCount += RGMResult.RootConcavityCount;
                }
                else if (title == "В-1 (111)")
                {
                    B111lackOfPenetrationCount += RGMResult.LackOfPenetrationCount;
                    B111poresAndSludgeCount += RGMResult.PoresAndSludgeCount;
                    B111rootConcavityCount += RGMResult.RootConcavityCount;
                }

                overallLackOfPenetrationCount += RGMResult.LackOfPenetrationCount;
                overallPoresAndSludgeCount += RGMResult.PoresAndSludgeCount;
                overallRootConcavityCount += RGMResult.RootConcavityCount;
            }

            result.Add(A135poresAndSludgeCount);
            result.Add(B141poresAndSludgeCount);
            result.Add(B111poresAndSludgeCount);
            result.Add(A135lackOfPenetrationCount);
            result.Add(B141lackOfPenetrationCount);
            result.Add(B111lackOfPenetrationCount);
            result.Add(A135rootConcavityCount);
            result.Add(B141rootConcavityCount);
            result.Add(B111rootConcavityCount);
            result.Add(overallPoresAndSludgeCount);
            result.Add(overallRootConcavityCount);
            result.Add(overallLackOfPenetrationCount);

            return result;
        }

        static List<int> CountRGMContestWorks(List<EvaluationResult> evaluationResults)
        {
            List<int> RGMContestWorksCount = new();

            var A135Count = 0;
            var B141Count = 0;
            var B111PipesCount = 0;
            var overallCount = 0;

            if (evaluationResults.Where(_ => _.RGMMark != 0 && _.ContestWork.Nomination.Title == "A 135") is not null)
            {
                A135Count = evaluationResults
                 .Where(_ => _.RGMMark != 0 && _.ContestWork.Nomination.Title == "A 135")
                 .Count();
            }

            if(evaluationResults.Where(_ => _.RGMMark != 0 && _.ContestWork.Nomination.Title == "Б-141") is not null)
            {
                B141Count = evaluationResults
                 .Where(_ => _.RGMMark != 0 && _.ContestWork.Nomination.Title == "Б-141")
                 .Count();
            }

            if(evaluationResults.Where(_ => _.RGMMark != 0 && _.ContestWork.Nomination.Title == "В-1 (111)") is not null)
            {
                B111PipesCount = evaluationResults
                 .Where(_ => _.RGMMark != 0 && _.ContestWork.Nomination.Title == "В-1 (111)")
                 .Count();
            }

            overallCount += A135Count += B111PipesCount += B141Count;

            RGMContestWorksCount.Add(A135Count);
            RGMContestWorksCount.Add(B141Count);
            RGMContestWorksCount.Add(B111PipesCount);
            RGMContestWorksCount.Add(overallCount);

            return RGMContestWorksCount;
        }

        static List<int> CountVMCMarks(List<ContestWork> contestWorks)
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
            int countPoresAndSludge = 0;

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

                if(vmcResult.PoresAndSludgeCount != 0)
                {
                    countPoresAndSludge++;
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
            result.Add(countPoresAndSludge);
            result.Add(countSeamGeometry);
            result.Add(countOtherWarnings);

            return result;
        }
    }
}
