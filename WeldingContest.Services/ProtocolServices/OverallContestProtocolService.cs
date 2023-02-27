using Microsoft.Office.Interop.Excel;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestMembers;
using WeldingContest.Services.Entities.ContestWorks;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.ProtocolServices
{
    class OverallContestProtocolService : IProtocolServiceBase<Contest>
    {
        private readonly WeldingContestContext weldingContestContext;

        public OverallContestProtocolService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public void CreateProtocol(Contest entity)
        {
            var excelApplication = new Application();

            Workbook xlWorkBook;
            Worksheet xlWorkSheet;
            object misValue = System.Reflection.Missing.Value;

            xlWorkBook = excelApplication.Workbooks.Open(Directory.GetCurrentDirectory() + "/Protocols/OverallProtocol");
            xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(1);

            InputDataWithoutBorders(xlWorkSheet, "D2", "Q2", $"Анализ результатов {entity.Name}");
            int currentRow = 6;
            var nominations = weldingContestContext.Nominations.ToList();

            foreach (var nomination in nominations)
            {
                var contestWorks = weldingContestContext.ContestWorks
                    .Include(_ => _.Nomination)
                    .Include(_=>_.VMCResults)
                    .Where(_ => _.Nomination == nomination)
                    .Where(_ => _.VMCResults.Count != 0)
                    .ToList();

                var resultsCount = CountMarks1(contestWorks);

                InputData(xlWorkSheet, $"B{currentRow}", $"B{currentRow}", nomination.Title);
                InputData(xlWorkSheet, $"C{currentRow}", $"C{currentRow}", contestWorks.Count().ToString());
                InputData(xlWorkSheet, $"D{currentRow}", $"D{currentRow}", resultsCount.ElementAt(0).ToString());
                InputData(xlWorkSheet, $"E{currentRow}", $"E{currentRow}", resultsCount.ElementAt(1).ToString());
                InputData(xlWorkSheet, $"F{currentRow}", $"F{currentRow}", resultsCount.ElementAt(2).ToString());
                InputData(xlWorkSheet, $"G{currentRow}", $"G{currentRow}", resultsCount.ElementAt(3).ToString());
                InputData(xlWorkSheet, $"H{currentRow}", $"H{currentRow}", resultsCount.ElementAt(4).ToString());
                InputData(xlWorkSheet, $"I{currentRow}", $"I{currentRow}", resultsCount.ElementAt(5).ToString());
                InputData(xlWorkSheet, $"J{currentRow}", $"J{currentRow}", resultsCount.ElementAt(6).ToString());
                InputData(xlWorkSheet, $"K{currentRow}", $"K{currentRow}", resultsCount.ElementAt(7).ToString());
                InputData(xlWorkSheet, $"L{currentRow}", $"L{currentRow}", resultsCount.ElementAt(8).ToString());
                InputData(xlWorkSheet, $"N{currentRow}", $"N{currentRow}", resultsCount.ElementAt(9).ToString());
                InputData(xlWorkSheet, $"O{currentRow}", $"O{currentRow}", resultsCount.ElementAt(10).ToString());

                currentRow++;
            }

            xlWorkBook.SaveAs(Directory.GetCurrentDirectory() + "/Protocols/OverallProtocol", XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue, misValue, XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);
            xlWorkBook.Close(true, misValue, misValue);
            excelApplication.Quit();
        }

        private void InputData(Worksheet xlWorkSheet, string startCell, string endCell, string data)
        {
            List<string> alphabet = new List<string>()
            { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };

            object misValue = System.Reflection.Missing.Value;

            xlWorkSheet.Range[startCell, endCell].Merge(misValue);
            xlWorkSheet.Range[startCell, endCell].BorderAround2(XlLineStyle.xlContinuous, XlBorderWeight.xlThin, XlColorIndex.xlColorIndexAutomatic);
            int firstCellIndexRow = int.Parse(startCell.Substring(1, startCell.Length - 1));
            int firstCellIndexColumn = alphabet.FindIndex(_ => _ == startCell.Substring(0, 1)) + 1;
            xlWorkSheet.Cells[firstCellIndexRow, firstCellIndexColumn] = data;
        }

        private void InputDataWithoutBorders(Worksheet xlWorkSheet, string startCell, string endCell, string data)
        {
            List<string> alphabet = new List<string>()
            { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };

            object misValue = System.Reflection.Missing.Value;

            xlWorkSheet.Range[startCell, endCell].Merge(misValue);
            xlWorkSheet.Range[startCell, endCell].WrapText = true;
            int firstCellIndexRow = int.Parse(startCell.Substring(1, startCell.Length - 1));
            int firstCellIndexColumn = alphabet.FindIndex(_ => _ == startCell.Substring(0, 1)) + 1;
            xlWorkSheet.Cells[firstCellIndexRow, firstCellIndexColumn] = data;
        }

        private List<int> CountMarks(List<ContestWork> contestWorks)
        {
            List<int> result = new List<int>();

            int counter = 0;
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

                countLackOfPenetration += vmcResult.LackOfPenetrationUpTo10mmCount
                    + vmcResult.LackOfPenetrationFrom10mmTo20mmCount
                    + vmcResult.LackOfPenetrationFrom20mmCount;
                countEdgeOffset += vmcResult.EdgeOffsetCount;
                countUndercut += vmcResult.UndercutUpTo10mmCount
                    + vmcResult.UndercutFrom20mmCount
                    + vmcResult.UndercutRemovalCount;
                countSinking += vmcResult.SinkingCount;
                countExcessPenetration += vmcResult.ExcessPenetrationCount;
                countExcessSeamWidth += vmcResult.ExcessSeamWidthCount;
                countExcessSeamConvexity += vmcResult.ExcessSeamConvexityCount;
                countExcessSeamScaling += vmcResult.ExcessSeamScalingCount;
                countRoughTransition += vmcResult.RoughTransitionCount;
                countSeamGeometry += vmcResult.SeamGeometryCount;
                countOtherWarnings += vmcResult.OtherWarningsCount;

                counter++;
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

        private List<int> CountMarks1(List<ContestWork> contestWorks)
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
