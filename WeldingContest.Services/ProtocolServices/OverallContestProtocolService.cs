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
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using var package = new ExcelPackage();

            var book = package.Workbook;

            var nominations = await weldingContestContext.Nominations.OrderBy(_ => _.Title).ToListAsync();

            #region Первый лист

            var sheet = book.Worksheets.Add($"Общий протокол {entity.Name}");

            InputHeaderTextOverallProtocol(sheet);

            InputColumnsTextOverallProtocol(sheet);

            MergeColumnsOverallProtocol(sheet);

            CreateColumnBordersOverallProtocol(sheet);

            CenterTextOverallProtocol(sheet);

            InputDataWithoutBorders(sheet, "D2", "Q2", $"Анализ результатов {entity.Name}");

            var contestWorksWithVMC = await weldingContestContext.ContestWorks
                .Include(_ => _.VMCResults)
                .Include(_ => _.ArmatureVMCResults)
                .Where(_ => _.VMCResults.Count != 0 || _.ArmatureVMCResults.Count != 0)
                .ToListAsync();

            int currentRow = 6;
            InputVMCData(nominations, contestWorksWithVMC, sheet, currentRow);

            var contestWorksWithRGM = await weldingContestContext.ContestWorks
                .Include(_ => _.RGMResults)
                .Where(_ => _.RGMResults.Count != 0)
                .ToListAsync();

            currentRow = 6;
            InputRGMData(nominations, contestWorksWithRGM, sheet, currentRow);

            var contestWorksWithMT = await weldingContestContext.ContestWorks
                .Include(_ => _.MechanicalTestResults)
                .Where(_ => _.MechanicalTestResults.Count != 0)
                .ToListAsync();

            currentRow = 6;
            InputMTData(nominations, contestWorksWithMT, sheet, currentRow);

            currentRow = 6;
            InputStatisticalData(nominations, sheet, currentRow);

            #endregion

            #region Номинации

            foreach (var nomination in nominations)
            {
                var sheetNomination = book.Worksheets.Add($"{nomination.Title}");

                StyleColumnsNomination(sheetNomination);

                CreateHeaderNomination(sheetNomination, entity, nomination);

                if (nomination.SampleType == "Арматура")
                {
                    var contestWorks = await weldingContestContext.ContestWorks
                        .Include(_ => _.Nomination)
                        .Where(_ => _.Nomination == nomination)
                        .Include(_ => _.Contestant)
                        .Include(_ => _.ArmatureVMCResults)
                        .Include(_ => _.MechanicalTestResults)
                        .OrderBy(_ => _.Contestant.RFID)
                        .ToListAsync();

                    StyleColumnsMTNomination(sheetNomination);

                    InputVMCDataNomination(sheetNomination, contestWorks);

                    InputMTDataNomination(sheetNomination, contestWorks);
                }
                else
                {
                    var contestWorks = await weldingContestContext.ContestWorks
                        .Include(_ => _.Nomination)
                        .Where(_ => _.Nomination == nomination)
                        .Include(_ => _.Contestant)
                        .Include(_ => _.VMCResults)
                        .Include(_ => _.RGMResults)
                        .OrderBy(_ => _.Contestant.RFID)
                        .ToListAsync();

                    StyleColumnsRGMNomination(sheetNomination);

                    InputVMCDataNomination(sheetNomination, contestWorks);

                    InputRGMDataNomination(sheetNomination, contestWorks);
                }
            }

            #endregion

            return await package.GetAsByteArrayAsync();
        }

        #region Первый лист

        //Метод работает некорректно, почему - не понятно
        async void CreateOverallProtocol(ExcelWorkbook book, Contest entity)
        {
            var sheet = book.Worksheets.Add($"Общий протокол {entity.Name}");

            InputHeaderTextOverallProtocol(sheet);

            InputColumnsTextOverallProtocol(sheet);

            MergeColumnsOverallProtocol(sheet);

            CreateColumnBordersOverallProtocol(sheet);

            CenterTextOverallProtocol(sheet);

            InputDataWithoutBorders(sheet, "D2", "Q2", $"Анализ результатов {entity.Name}");

            var nominations = await weldingContestContext.Nominations.ToListAsync();

            var contestWorksWithVMC = await weldingContestContext.ContestWorks
                .Include(_ => _.VMCResults)
                .Where(_ => _.VMCResults.Count != 0)
                .ToListAsync();

            int currentRow = 6;
            InputVMCData(nominations, contestWorksWithVMC, sheet, currentRow);

            var contestWorksWithRGM = await weldingContestContext.ContestWorks
                .Include(_ => _.RGMResults)
                .Where(_ => _.RGMResults.Count != 0)
                .ToListAsync();

            currentRow = 6;
            InputRGMData(nominations, contestWorksWithRGM, sheet, currentRow);

            var contestWorksWithMT = await weldingContestContext.ContestWorks
                .Include(_ => _.MechanicalTestResults)
                .Where(_ => _.MechanicalTestResults.Count != 0)
                .ToListAsync();

            currentRow = 6;
            InputMTData(nominations, contestWorksWithMT, sheet, currentRow);

            currentRow = 6;
            InputStatisticalData(nominations, sheet, currentRow);
        }

        static void InputVMCData(List<Nomination> nominations, List<ContestWork> contestWorks, ExcelWorksheet sheet, int currentRow)
        {
            var contestWorksAllCount = 0;
            var lackOfPenetrationAllCount = 0;
            var edgeOffsetAllCount = 0;
            var undercutAllCount = 0;
            var sinkingAllCount = 0;
            var excessPenetrationAllCount = 0;
            var excessSeamWidthAllCount = 0;
            var excessSeamConvexityAllCount = 0;
            var excessSeamScalingAllCount = 0;
            var roughTransitionAllCount = 0;
            var seamGeometryAllCount = 0;
            var otherWarningsAllCount = 0;
            var poresAndSludgeAllCount = 0;

            foreach(var nomination in nominations)
            {
                var contestWorksInNomination = contestWorks.Where(_ => _.Nomination == nomination).ToList();
                var vmcMarks = CountVMCMarks(contestWorksInNomination);

                InputData(sheet, $"B{currentRow}", nomination.Title);
                InputData(sheet, $"C{currentRow}", contestWorksInNomination.Count());

                InputVMCMarks(vmcMarks, sheet, currentRow);

                contestWorksAllCount += contestWorksInNomination.Count();
                lackOfPenetrationAllCount += vmcMarks.ElementAt(0);
                edgeOffsetAllCount += vmcMarks.ElementAt(1);
                undercutAllCount += vmcMarks.ElementAt(2);
                sinkingAllCount += vmcMarks.ElementAt(3);
                excessPenetrationAllCount += vmcMarks.ElementAt(4);
                excessSeamWidthAllCount += vmcMarks.ElementAt(5);
                excessSeamConvexityAllCount += vmcMarks.ElementAt(6);
                excessSeamScalingAllCount += vmcMarks.ElementAt(7);
                roughTransitionAllCount += vmcMarks.ElementAt(8);
                seamGeometryAllCount += vmcMarks.ElementAt(9);
                otherWarningsAllCount += vmcMarks.ElementAt(10);
                poresAndSludgeAllCount += vmcMarks.ElementAt(11);

                currentRow++;
            }

            InputData(sheet, $"B{currentRow}", "Итого");
            InputData(sheet, $"C{currentRow}", contestWorksAllCount);
            InputData(sheet, $"D{currentRow}", lackOfPenetrationAllCount);
            InputData(sheet, $"E{currentRow}", edgeOffsetAllCount);
            InputData(sheet, $"F{currentRow}", undercutAllCount);
            InputData(sheet, $"G{currentRow}", sinkingAllCount);
            InputData(sheet, $"H{currentRow}", excessPenetrationAllCount);
            InputData(sheet, $"I{currentRow}", excessSeamWidthAllCount);
            InputData(sheet, $"J{currentRow}", excessSeamConvexityAllCount);
            InputData(sheet, $"K{currentRow}", excessSeamScalingAllCount);
            InputData(sheet, $"L{currentRow}", roughTransitionAllCount);
            InputData(sheet, $"M{currentRow}", seamGeometryAllCount);
            InputData(sheet, $"N{currentRow}", otherWarningsAllCount);
            InputData(sheet, $"O{currentRow}", poresAndSludgeAllCount);
        }

        static void InputRGMData(List<Nomination> nominations, List<ContestWork> contestWorks, ExcelWorksheet sheet, int currentRow)
        {
            var contestWorksAllCount = 0;
            var poresAndSludgeAllCount = 0;
            var rootConcavityAllCount = 0;
            var lackOfPenetrationAllCount = 0;

            foreach (var nomination in nominations)
            {
                if (nomination.SampleType != "Арматура")
                {
                    var contestWorksInNomination = contestWorks.Where(_ => _.Nomination == nomination).ToList();
                    var rgmMarks = CountRGMMarks(contestWorksInNomination);

                    InputData(sheet, $"P{currentRow}", contestWorksInNomination.Count());

                    InputRGMMarks(rgmMarks, sheet, currentRow);

                    contestWorksAllCount += contestWorksInNomination.Count();
                    poresAndSludgeAllCount += rgmMarks.ElementAt(0);
                    rootConcavityAllCount += rgmMarks.ElementAt(1);
                    lackOfPenetrationAllCount += rgmMarks.ElementAt(2);
                }
                else
                {
                    InputData(sheet, $"P{currentRow}", "X");
                    InputData(sheet, $"Q{currentRow}", "X");
                    InputData(sheet, $"R{currentRow}", "X");
                    InputData(sheet, $"S{currentRow}", "X");
                }

                currentRow++;
            }

            InputData(sheet, $"P{currentRow}", contestWorksAllCount);
            InputData(sheet, $"Q{currentRow}", poresAndSludgeAllCount);
            InputData(sheet, $"R{currentRow}", rootConcavityAllCount);
            InputData(sheet, $"S{currentRow}", lackOfPenetrationAllCount);
        }

        static void InputMTData(List<Nomination> nominations, List<ContestWork> contestWorks, ExcelWorksheet sheet, int currentRow)
        {
            var contestWorksAllCount = 0;
            var destructionWeldLessStrengthAllCount = 0;
            var destructionWeldEqualsStrengthAllCount = 0;
            var destructionHeatAffectedLessStrengthAllCount = 0;
            var destructionHeatAffectedEqualsStrengthAllCount = 0;
            var destructionBaseMetalAllCount = 0;

            foreach (var nomination in nominations)
            {
                if (nomination.SampleType == "Арматура")
                {
                    var contestWorksInNomination = contestWorks.Where(_ => _.Nomination == nomination).ToList();
                    var mtMarks = CountMTMarks(contestWorksInNomination);

                    InputData(sheet, $"T{currentRow}", contestWorksInNomination.Count());

                    InputMTMarks(mtMarks, sheet, currentRow);

                    contestWorksAllCount += contestWorksInNomination.Count();
                    destructionWeldLessStrengthAllCount += mtMarks.ElementAt(0);
                    destructionWeldEqualsStrengthAllCount += mtMarks.ElementAt(1);
                    destructionHeatAffectedLessStrengthAllCount += mtMarks.ElementAt(2);
                    destructionHeatAffectedEqualsStrengthAllCount += mtMarks.ElementAt(3);
                    destructionBaseMetalAllCount += mtMarks.ElementAt(4);
                }
                else
                {
                    InputData(sheet, $"T{currentRow}", "X");
                    InputData(sheet, $"U{currentRow}", "X");
                    InputData(sheet, $"V{currentRow}", "X");
                    InputData(sheet, $"W{currentRow}", "X");
                    InputData(sheet, $"X{currentRow}", "X");
                    InputData(sheet, $"Y{currentRow}", "X");
                }

                currentRow++;
            }

            InputData(sheet, $"T{currentRow}", contestWorksAllCount);
            InputData(sheet, $"U{currentRow}", destructionWeldLessStrengthAllCount);
            InputData(sheet, $"V{currentRow}", destructionWeldEqualsStrengthAllCount);
            InputData(sheet, $"W{currentRow}", destructionHeatAffectedLessStrengthAllCount);
            InputData(sheet, $"X{currentRow}", destructionHeatAffectedEqualsStrengthAllCount);
            InputData(sheet, $"Y{currentRow}", destructionBaseMetalAllCount);
        }

        static void InputVMCMarks(List<int> marks, ExcelWorksheet sheet, int currentRow)
        {
            InputData(sheet, $"D{currentRow}", marks.ElementAt(0));
            InputData(sheet, $"E{currentRow}", marks.ElementAt(1));
            InputData(sheet, $"F{currentRow}", marks.ElementAt(2));
            InputData(sheet, $"G{currentRow}", marks.ElementAt(3));
            InputData(sheet, $"H{currentRow}", marks.ElementAt(4));
            InputData(sheet, $"I{currentRow}", marks.ElementAt(5));
            InputData(sheet, $"J{currentRow}", marks.ElementAt(6));
            InputData(sheet, $"K{currentRow}", marks.ElementAt(7));
            InputData(sheet, $"L{currentRow}", marks.ElementAt(8));
            InputData(sheet, $"M{currentRow}", marks.ElementAt(9));
            InputData(sheet, $"N{currentRow}", marks.ElementAt(10));
            InputData(sheet, $"O{currentRow}", marks.ElementAt(11));
        }

        static void InputRGMMarks(List<int> marks, ExcelWorksheet sheet, int currentRow)
        {
            InputData(sheet, $"Q{currentRow}", marks.ElementAt(0));
            InputData(sheet, $"R{currentRow}", marks.ElementAt(1));
            InputData(sheet, $"S{currentRow}", marks.ElementAt(2));
        }

        static void InputMTMarks(List<int> marks, ExcelWorksheet sheet, int currentRow)
        {
            InputData(sheet, $"U{currentRow}", marks.ElementAt(0));
            InputData(sheet, $"V{currentRow}", marks.ElementAt(1));
            InputData(sheet, $"W{currentRow}", marks.ElementAt(2));
            InputData(sheet, $"X{currentRow}", marks.ElementAt(3));
            InputData(sheet, $"Y{currentRow}", marks.ElementAt(4));
        }

        static void InputStatisticalData(List<Nomination> nominations, ExcelWorksheet sheet, int currentRow)
        {
            foreach (var nomination in nominations)
            {
                var seamLength = 179;

                if (nomination.Title == "A 135")
                {
                    seamLength = 400;
                }

                var result = CountStatisticalMarks(sheet, currentRow, seamLength);

                sheet.Cells[$"Z{currentRow}"].Value = result.ElementAt(0);
                sheet.Cells[$"AA{currentRow}"].Value = result.ElementAt(1);
                sheet.Cells[$"AB{currentRow}"].Value = result.ElementAt(2);

                sheet.Cells[$"Z{currentRow}"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                sheet.Cells[$"AA{currentRow}"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                sheet.Cells[$"AB{currentRow}"].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);

                currentRow++;
            }
        }

        static List<int> CountRGMMarks(List<ContestWork> contestWorks)
        {
            List<int> result = new();

            var poresAndSludgeCount = 0;
            var rootConcavityCount = 0;
            var lackOfPenetrationCount = 0;

            foreach (var contestWork in contestWorks)
            {
                var RGMResult = contestWork.RGMResults.ElementAt(0);

                if (RGMResult.PoresAndSludgeCount != 0)
                {
                    poresAndSludgeCount++;
                }

                if (RGMResult.RootConcavityCount != 0)
                {
                    rootConcavityCount++;
                }

                if (RGMResult.LackOfPenetrationCount != 0)
                {
                    lackOfPenetrationCount++;
                }
            }

            result.Add(poresAndSludgeCount);
            result.Add(rootConcavityCount);
            result.Add(lackOfPenetrationCount);

            return result;
        }

        static List<int> CountVMCMarks(List<ContestWork> contestWorks)
        {
            List<int> result = new List<int>();

            var countLackOfPenetration = 0;
            var countEdgeOffset = 0;
            var countUndercut = 0;
            var countSinking = 0;
            var countExcessPenetration = 0;
            var countExcessSeamWidth = 0;
            var countExcessSeamConvexity = 0;
            var countExcessSeamScaling = 0;
            var countRoughTransition = 0;
            var countSeamGeometry = 0;
            var countOtherWarnings = 0;
            var countPoresAndSludge = 0;

            foreach (var contestWork in contestWorks)
            {
                if (contestWork.Nomination.SampleType != "Арматура")
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

                    if (vmcResult.PoresAndSludgeCount != 0)
                    {
                        countPoresAndSludge++;
                    }
                }
                else
                {
                    var vmcResult = contestWork.ArmatureVMCResults.ElementAt(0);

                    if (vmcResult.UndercutUpTo5mmCount != 0 || vmcResult.UndercutFrom5mmCount != 0 || vmcResult.ContiuousUndercutCount != 0)
                    {
                        countUndercut++;
                    }

                    if (vmcResult.ExcessSeamWidthCount != 0)
                    {
                        countExcessSeamWidth++;
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

                    if (vmcResult.PoresAndSludgeCount != 0)
                    {
                        countPoresAndSludge++;
                    }
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

        static List<int> CountMTMarks(List<ContestWork> contestWorks)
        {
            List<int> result = new();

            var destructionWeldLessStrengthCount = 0;
            var destructionWeldEqualsStrengthCount = 0;
            var destructionHeatAffectedLessStrengthCount = 0;
            var destructionHeatAffectedEqualsStrengthCount = 0;
            var destructionBaseMetalCount = 0;

            foreach (var contestWork in contestWorks)
            {
                var MTResult = contestWork.MechanicalTestResults.ElementAt(0);

                if (MTResult.DestructionWeldLessStrength != 0)
                {
                    destructionWeldLessStrengthCount++;
                }

                if (MTResult.DestructionWeldEqualsStrength != 0)
                {
                    destructionWeldEqualsStrengthCount++;
                }

                if (MTResult.DestructionHeatAffectedLessStrength != 0)
                {
                    destructionHeatAffectedLessStrengthCount++;
                }

                if (MTResult.DestructionHeatAffectedEqualsStrength != 0)
                {
                    destructionHeatAffectedEqualsStrengthCount++;
                }

                if (MTResult.DestructionBaseMetalCount != 0)
                {
                    destructionBaseMetalCount++;
                }
            }

            result.Add(destructionWeldLessStrengthCount);
            result.Add(destructionWeldEqualsStrengthCount);
            result.Add(destructionHeatAffectedLessStrengthCount);
            result.Add(destructionHeatAffectedEqualsStrengthCount);
            result.Add(destructionBaseMetalCount);

            return result;
        }

        static List<double> CountStatisticalMarks(ExcelWorksheet sheet, int currentRow, int seamLength)
        {
            double invalidDefectsCount = 1;
            double invalidDefectsPerSeam = 1;
            double invalidDefectsPer100mm = 1;

            invalidDefectsCount = sheet.Cells[$"D{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"E{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"F{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"G{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"H{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"I{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"J{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"K{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"L{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"M{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"N{currentRow}"].GetCellValue<int>()
                + sheet.Cells[$"O{currentRow}"].GetCellValue<int>();

            invalidDefectsPerSeam = invalidDefectsCount / sheet.Cells[$"C{currentRow}"].GetCellValue<int>();
            invalidDefectsPer100mm = 100 * invalidDefectsPerSeam / seamLength;

            var result = new List<double>();

            result.Add(invalidDefectsCount);
            result.Add(invalidDefectsPerSeam);
            result.Add(invalidDefectsPer100mm);

            return result;
        }

        static void CenterTextOverallProtocol(ExcelWorksheet sheet)
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

        static void CreateColumnBordersOverallProtocol(ExcelWorksheet sheet)
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

        static void InputHeaderTextOverallProtocol(ExcelWorksheet sheet)
        {
            sheet.Cells["B4"].Value = "Номинация";
            sheet.Cells["C4"].Value = "Количество участников конкурса";
            sheet.Cells["D4"].Value = "Количество выявленных дефектов при визуально-измерительном контроле";
            sheet.Cells["P4"].Value = "RT";
            sheet.Cells["Q4"].Value = "Радиографический контроль";
            sheet.Cells["T4"].Value = "МИ";
            sheet.Cells["U4"].Value = "Механическиe испытания (для арматуры)";
        }

        static void InputColumnsTextOverallProtocol(ExcelWorksheet excelWorksheet)
        {
            for (int i = 0; i < Resources.ExcelAlphabet.Count; i++)
            {
                string index = Resources.ExcelAlphabet[i];

                string text = Resources.ExcelColumnsText[i];

                excelWorksheet.Cells[$"{index}5"].Value = text;
            }

            excelWorksheet.Cells["D5:AB5"].Style.TextRotation = 90;
        }

        static void MergeColumnsOverallProtocol(ExcelWorksheet sheet)
        {
            sheet.Cells["B4:B5"].Merge = true;
            sheet.Cells["C4:C5"].Merge = true;
            sheet.Cells["D4:O4"].Merge = true;
            sheet.Cells["Q4:S4"].Merge = true;
            sheet.Cells["U4:Y4"].Merge = true;
            sheet.Cells["Z4:AB4"].Merge = true;
        }

        #endregion

        #region Номинации

        static void StyleColumnsNomination(ExcelWorksheet sheet)
        {
            //Заголовок
            sheet.Cells["F1:O1"].Merge = true;
            sheet.Cells["F2:O2"].Merge = true;

            sheet.Cells["F1:O2"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            sheet.Cells["F1:O2"].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            sheet.Cells["F1:O1"].Style.Font.Bold = true;

            //Визуально-измерительный контроль
            sheet.Cells["A3:A4"].Merge = true;
            sheet.Cells["B3:B4"].Merge = true;
            sheet.Cells["C3:N3"].Merge = true;

            sheet.Cells["A3:N4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            sheet.Cells["A3:N4"].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            sheet.Cells["A3:B4"].Style.Font.Bold = true;

            sheet.Cells["C4:N4"].Style.Font.Bold = true;

            sheet.Cells["A3:N4"].Style.WrapText = true;

            sheet.Cells["B3"].Style.TextRotation = 90;
            sheet.Cells["C4:N4"].Style.TextRotation = 90;

            //Рентген-механика
            sheet.Cells["O3:O4"].Merge = true;

            sheet.Cells["O3:O4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            sheet.Cells["O3:O4"].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            sheet.Cells["O3:O4"].Style.Font.Bold = true;

            sheet.Cells["O3:O4"].Style.WrapText = true;

            sheet.Cells["O3:O4"].Style.TextRotation = 90;
        }

        static void StyleColumnsRGMNomination(ExcelWorksheet sheet)
        {
            sheet.Cells["P3:R3"].Merge = true;

            sheet.Cells["P3:R4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            sheet.Cells["P3:R4"].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            sheet.Cells["P4:R4"].Style.Font.Bold = true;

            sheet.Cells["P3:R4"].Style.WrapText = true;

            sheet.Cells["P4:R4"].Style.TextRotation = 90;
        }

        static void StyleColumnsMTNomination(ExcelWorksheet sheet)
        {
            sheet.Cells["P3:T3"].Merge = true;

            sheet.Cells["P3:T4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
            sheet.Cells["P3:T4"].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;

            sheet.Cells["P4:T4"].Style.Font.Bold = true;

            sheet.Cells["P3:T4"].Style.WrapText = true;

            sheet.Cells["P4:T4"].Style.TextRotation = 90;
        }

        static void CreateHeaderNomination(ExcelWorksheet sheet, Contest contest, Nomination nomination)
        {
            sheet.Cells["F1"].Value = $"Результаты {contest.Name}";
            sheet.Cells["F2"].Value = $"НОМИНАЦИЯ {nomination.Title} - {nomination.WeldingType} ({nomination.SampleType})";

            InputData(sheet, "A3:A4", "Номер регистрации");
            InputData(sheet, "B3:B4", "Количество штрафных баллов по визуальному контролю");
            InputData(sheet, "C3:N3", "Количество выявленных дефектов при визуально-измерительном контроле");

            for (var i = 0; i < 12; i++)
            {
                InputData(sheet, $"{Resources.ExcelNominationVMCColumns.ElementAt(i)}4", Resources.ExcelNominationVMCColumnsText.ElementAt(i));
            }

            if (nomination.SampleType == "Арматура")
            {
                InputData(sheet, "P3:T3", "Механические испытания");
                InputData(sheet, "O3:O4", "количество штрафных баллов по механическим испытаниям");

                for (var i = 0; i < 5; i++)
                {
                    InputData(sheet, $"{Resources.ExcelNominationMTColumns.ElementAt(i)}4", Resources.ExcelNominationMTColumnsText.ElementAt(i));
                }
            }
            else
            {
                InputData(sheet, "P3:R3", "Радиографический контроль");
                InputData(sheet, "O3:O4", "количество штрафных баллов по радиографическому контролю");

                for (var i = 0; i < 3; i++)
                {
                    InputData(sheet, $"{Resources.ExcelNominationRGMColumns.ElementAt(i)}4", Resources.ExcelNominationRGMColumnsText.ElementAt(i));
                }
            }
        }

        static void InputVMCDataNomination(ExcelWorksheet sheet, List<ContestWork> contestWorks)
        {
            var currentRow = 5;

            foreach (var contestWork in contestWorks)
            {
                InputData(sheet, $"A{currentRow}", contestWork.Contestant.RFID);

                if (contestWork.Nomination.SampleType != "Арматура")
                {
                    if (contestWork.VMCResults.Count() == 0)
                    {
                        InputData(sheet, $"B{currentRow}", 50);
                        sheet.Cells[$"C{currentRow}:N{currentRow}"].Merge = true;
                        InputData(sheet, $"C{currentRow}:N{currentRow}", "не варил");
                    }
                    else
                    {
                        InputData(sheet, $"B{currentRow}", 50 - contestWork.VMCResults.ElementAt(0).OverallMark);
                        InputVMCMarksNomination(sheet, contestWork.VMCResults.ElementAt(0), currentRow);
                    }
                }
                else
                {
                    if (contestWork.ArmatureVMCResults.Count() == 0)
                    {
                        InputData(sheet, $"B{currentRow}", 50 );
                        sheet.Cells[$"C{currentRow}:N{currentRow}"].Merge = true;
                        InputData(sheet, $"C{currentRow}:N{currentRow}", "не варил");
                    }
                    else
                    {
                        InputData(sheet, $"B{currentRow}", 50 - contestWork.ArmatureVMCResults.ElementAt(0).OverallMark);
                        InputVMCMarksNomination(sheet, contestWork.ArmatureVMCResults.ElementAt(0), currentRow);
                    }
                }

                currentRow++;
            }

            sheet.Cells[$"C{currentRow}"].Formula = $"=SUM(C5:C{currentRow - 1})";
            sheet.Cells[$"D{currentRow}"].Formula = $"=SUM(D5:D{currentRow - 1})";
            sheet.Cells[$"E{currentRow}"].Formula = $"=SUM(E5:E{currentRow - 1})";
            sheet.Cells[$"F{currentRow}"].Formula = $"=SUM(F5:F{currentRow - 1})";
            sheet.Cells[$"G{currentRow}"].Formula = $"=SUM(G5:G{currentRow - 1})";
            sheet.Cells[$"H{currentRow}"].Formula = $"=SUM(H5:H{currentRow - 1})";
            sheet.Cells[$"I{currentRow}"].Formula = $"=SUM(I5:I{currentRow - 1})";
            sheet.Cells[$"J{currentRow}"].Formula = $"=SUM(J5:J{currentRow - 1})";
            sheet.Cells[$"K{currentRow}"].Formula = $"=SUM(K5:K{currentRow - 1})";
            sheet.Cells[$"L{currentRow}"].Formula = $"=SUM(L5:L{currentRow - 1})";
            sheet.Cells[$"M{currentRow}"].Formula = $"=SUM(M5:M{currentRow - 1})";
            sheet.Cells[$"N{currentRow}"].Formula = $"=SUM(N5:N{currentRow - 1})";
        }

        static void InputRGMDataNomination(ExcelWorksheet sheet, List<ContestWork> contestWorks)
        {
            var currentRow = 5;

            foreach (var contestWork in contestWorks)
            {
                if (contestWork.RGMResults.Count() == 0)
                {
                    InputData(sheet, $"O{currentRow}", 30);
                    sheet.Cells[$"P{currentRow}:R{currentRow}"].Merge = true;
                    InputData(sheet, $"P{currentRow}:R{currentRow}", "не проводился");
                }
                else
                {
                    InputData(sheet, $"O{currentRow}", 30 - contestWork.RGMResults.ElementAt(0).OverallMark);
                    InputRGMMarksNomination(sheet, contestWork.RGMResults.ElementAt(0), currentRow);
                }

                currentRow++;
            }

            sheet.Cells[$"P{currentRow}"].Formula = $"=SUM(P5:P{currentRow - 1})";
            sheet.Cells[$"Q{currentRow}"].Formula = $"=SUM(Q5:Q{currentRow - 1})";
            sheet.Cells[$"R{currentRow}"].Formula = $"=SUM(R5:R{currentRow - 1})";
        }

        static void InputMTDataNomination(ExcelWorksheet sheet, List<ContestWork> contestWorks)
        {
            var currentRow = 5;

            foreach (var contestWork in contestWorks)
            {
                if (contestWork.MechanicalTestResults.Count() == 0)
                {
                    InputData(sheet, $"O{currentRow}", 50);
                    sheet.Cells[$"P{currentRow}:T{currentRow}"].Merge = true;
                    InputData(sheet, $"P{currentRow}:T{currentRow}", "не проводился");
                }
                else
                {
                    InputData(sheet, $"O{currentRow}", 50 - contestWork.MechanicalTestResults.ElementAt(0).OverallMark);
                    InputMTMarksNomination(sheet, contestWork.MechanicalTestResults.ElementAt(0), currentRow);
                }

                currentRow++;
            }

            sheet.Cells[$"P{currentRow}"].Formula = $"=SUM(P5:P{currentRow - 1})";
            sheet.Cells[$"Q{currentRow}"].Formula = $"=SUM(Q5:Q{currentRow - 1})";
            sheet.Cells[$"R{currentRow}"].Formula = $"=SUM(R5:R{currentRow - 1})";
            sheet.Cells[$"S{currentRow}"].Formula = $"=SUM(S5:S{currentRow - 1})";
            sheet.Cells[$"T{currentRow}"].Formula = $"=SUM(T5:T{currentRow - 1})";
        }

        static void InputVMCMarksNomination(ExcelWorksheet sheet, VMCResult result, int currentRow)
        {
            var lackOfPenetrationCount = result.LackOfPenetrationUpTo10mmCount
                + result.LackOfPenetrationFrom10mmTo20mmCount
                + result.LackOfPenetrationFrom20mmCount;

            var edgeOffsetCount = result.EdgeOffsetCount;
            var undercutCount = result.UndercutUpTo10mmCount 
                + result.UndercutFrom20mmCount
                + result.UndercutRemovalCount;
            var sinkingCount = result.SinkingCount;
            var excessPenetrationCount = result.ExcessPenetrationCount;
            var excessSeamWidthCount = result.ExcessSeamWidthCount;
            var excessSeamConvexityCount = result.ExcessSeamConvexityCount;
            var excessSeamScalingCount = result.ExcessSeamScalingCount;
            var roughTransitionCount = result.RoughTransitionCount;
            var seamGeometryCount = result.SeamGeometryCount;
            var otherWarningsCount = result.OtherWarningsCount;
            var poresAndSludgeCount = result.PoresAndSludgeCount;

            if (lackOfPenetrationCount == 0)
            {
                InputData(sheet, $"C{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"C{currentRow}", 1);
            }

            if (edgeOffsetCount == 0)
            {
                InputData(sheet, $"D{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"D{currentRow}", 1);
            }

            if (undercutCount == 0)
            {
                InputData(sheet, $"E{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"E{currentRow}", 1);
            }

            if (sinkingCount == 0)
            {
                InputData(sheet, $"F{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"F{currentRow}", 1);
            }

            if (excessPenetrationCount == 0)
            {
                InputData(sheet, $"G{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"G{currentRow}", 1);
            }

            if (excessSeamWidthCount == 0)
            {
                InputData(sheet, $"H{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"H{currentRow}", 1);
            }

            if (excessSeamConvexityCount == 0)
            {
                InputData(sheet, $"I{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"I{currentRow}", 1);
            }

            if (excessSeamScalingCount == 0)
            {
                InputData(sheet, $"J{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"J{currentRow}", 1);
            }

            if (roughTransitionCount == 0)
            {
                InputData(sheet, $"K{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"K{currentRow}", 1);
            }

            if (poresAndSludgeCount == 0)
            {
                InputData(sheet, $"L{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"L{currentRow}", 1);
            }

            if (seamGeometryCount == 0)
            {
                InputData(sheet, $"M{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"M{currentRow}", 1);
            }

            if (otherWarningsCount == 0)
            {
                InputData(sheet, $"N{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"N{currentRow}", 1);
            }
        }

        static void InputVMCMarksNomination(ExcelWorksheet sheet, ArmatureVMCResult result, int currentRow)
        {
            var undercutCount = result.UndercutUpTo5mmCount
                + result.UndercutFrom5mmCount
                + result.ContiuousUndercutCount;
            var excessSeamWidthCount = result.ExcessSeamWidthCount;
            var roughTransitionCount = result.RoughTransitionCount;
            var seamGeometryCount = result.SeamGeometryCount;
            var otherWarningsCount = result.OtherWarningsCount;
            var poresAndSludgeCount = result.PoresAndSludgeCount;

            InputData(sheet, $"C{currentRow}", "");
            InputData(sheet, $"D{currentRow}", "");

            if (undercutCount == 0)
            {
                InputData(sheet, $"E{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"E{currentRow}", 1);
            }

            InputData(sheet, $"F{currentRow}", "");
            InputData(sheet, $"G{currentRow}", "");

            if (excessSeamWidthCount == 0)
            {
                InputData(sheet, $"H{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"H{currentRow}", 1);
            }

            InputData(sheet, $"I{currentRow}", "");
            InputData(sheet, $"J{currentRow}", "");

            if (roughTransitionCount == 0)
            {
                InputData(sheet, $"K{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"K{currentRow}", 1);
            }

            if (poresAndSludgeCount == 0)
            {
                InputData(sheet, $"L{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"L{currentRow}", 1);
            }

            if (seamGeometryCount == 0)
            {
                InputData(sheet, $"M{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"M{currentRow}", 1);
            }

            if (otherWarningsCount == 0)
            {
                InputData(sheet, $"N{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"N{currentRow}", 1);
            }
        }

        static void InputRGMMarksNomination(ExcelWorksheet sheet, RGMResult result, int currentRow)
        {
            var poresAndSludgeCount = result.PoresAndSludgeCount;
            var lackOfPenetrationCount = result.LackOfPenetrationCount;
            var rootConcavityCount = result.RootConcavityCount;

            if (poresAndSludgeCount == 0)
            {
                InputData(sheet, $"P{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"P{currentRow}", 1);
            }

            if (lackOfPenetrationCount == 0)
            {
                InputData(sheet, $"Q{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"Q{currentRow}", 1);
            }

            if (rootConcavityCount == 0)
            {
                InputData(sheet, $"R{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"R{currentRow}", 1);
            }
        }

        static void InputMTMarksNomination(ExcelWorksheet sheet, MechanicalTestResult result, int currentRow)
        {
            var destructionWeldLessStrength = result.DestructionWeldLessStrength;
            var destructionWeldEqualsStrength = result.DestructionWeldEqualsStrength;
            var destructionHeatAffectedLessStrength = result.DestructionHeatAffectedLessStrength;
            var destructionHeatAffectedEqualsStrength = result.DestructionHeatAffectedEqualsStrength;
            var destructionBaseMetalCount = result.DestructionBaseMetalCount;

            if (destructionWeldLessStrength == 0)
            {
                InputData(sheet, $"P{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"P{currentRow}", 1);
            }

            if (destructionWeldEqualsStrength == 0)
            {
                InputData(sheet, $"Q{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"Q{currentRow}", 1);
            }

            if (destructionHeatAffectedLessStrength == 0)
            {
                InputData(sheet, $"R{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"R{currentRow}", 1);
            }

            if (destructionHeatAffectedEqualsStrength == 0)
            {
                InputData(sheet, $"S{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"S{currentRow}", 1);
            }

            if (destructionBaseMetalCount == 0)
            {
                InputData(sheet, $"T{currentRow}", "");
            }
            else
            {
                InputData(sheet, $"T{currentRow}", 1);
            }
        }

        #endregion

        static void InputData(ExcelWorksheet sheet, string cell, string data)
        {
            sheet.Cells[cell].Value = data;
            sheet.Cells[cell].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            sheet.Cells[cell].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
        }

        static void InputData(ExcelWorksheet sheet, string cell, int data)
        {
            sheet.Cells[cell].Value = data;
            sheet.Cells[cell].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
            sheet.Cells[cell].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
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
    }
}
