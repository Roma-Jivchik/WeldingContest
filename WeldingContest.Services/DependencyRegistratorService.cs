using Microsoft.Extensions.DependencyInjection;
using WeldingContest.Services.ArmatureAssemblyKSSResultServices;
using WeldingContest.Services.ArmatureEvaluationResultServices;
using WeldingContest.Services.ArmatureSafetyResultServices;
using WeldingContest.Services.ArmatureVMCResultServices;
using WeldingContest.Services.ArmatureVMCServices;
using WeldingContest.Services.AssemblyKSSResultServices;
using WeldingContest.Services.ComissionMemberServices;
using WeldingContest.Services.ConsumptionWeldingMaterialsServices;
using WeldingContest.Services.ContestantServices;
using WeldingContest.Services.ContestServices;
using WeldingContest.Services.ContestWorkServices;
using WeldingContest.Services.EvaluationResultServices;
using WeldingContest.Services.MechanicalTestResultServices;
using WeldingContest.Services.NominationServices;
using WeldingContest.Services.RGMResultServices;
using WeldingContest.Services.SafetyResultServices;
using WeldingContest.Services.TheoreticalResultServices;
using WeldingContest.Services.VMCResultServices;
using WeldingContest.Services.WeldingTimeResultServices;
using WeldingContest.Services.FileServices;
using WeldingContest.Services.ProtocolServices;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Services
{
    public static class DependencyRegistratorService
    {
        public static void RegistrateDI(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IArmatureAssemblyKSSResultService, ArmatureAssemblyKSSResultService>();
            serviceCollection.AddScoped<IArmatureEvaluationResultService, ArmatureEvaluationResultService>();
            serviceCollection.AddScoped<IArmatureSafetyResultService, ArmatureSafetyResultService>();
            serviceCollection.AddScoped<IArmatureVMCResultService, ArmatureVMCResultService>();
            serviceCollection.AddScoped<IAssemblyKSSResultService, AssemblyKSSResultService>();
            serviceCollection.AddScoped<IComissionMemberService, ComissionMemberService>();
            serviceCollection.AddScoped<IConsumptionWeldingMaterialsResultService, ConsumptionWeldingMaterialsResultService>();
            serviceCollection.AddScoped<IContestantService, ContestantService>();
            serviceCollection.AddScoped<IContestService, ContestService>();
            serviceCollection.AddScoped<IContestWorkService, ContestWorkService>();
            serviceCollection.AddScoped<IEvaluationResultService, EvaluationResultService>();
            serviceCollection.AddScoped<IMechanicalTestResultService, MechanicalTestResultService>();
            serviceCollection.AddScoped<INominationService, NominationService>();
            serviceCollection.AddScoped<IRGMResultService, RGMResultService>();
            serviceCollection.AddScoped<ISafetyResultService, SafetyResultService>();
            serviceCollection.AddScoped<ITheoreticalResultService, TheoreticalResultService>();
            serviceCollection.AddScoped<IVMCResultService, VMCResultService>();
            serviceCollection.AddScoped<IWeldingTimeResultService, WeldingTimeResultService>();
            serviceCollection.AddScoped<IFileService, FileService>();
            serviceCollection.AddScoped<IProtocolService<Contest>, OverallContestProtocolService>();
        }
    }
}
