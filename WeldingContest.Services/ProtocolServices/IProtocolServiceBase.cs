namespace WeldingContest.Services.ProtocolServices
{
    public interface IProtocolServiceBase<T> where T: class
    {
        void CreateProtocol(T entity);
    }
}
