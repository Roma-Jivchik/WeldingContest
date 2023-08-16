FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY . /src
RUN dotnet restore "WeldingContest/WeldingContest.csproj"
RUN dotnet build "WeldingContest/WeldingContest.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WeldingContest/WeldingContest.csproj" -c Release -o /app/publish

FROM node AS node-builder
WORKDIR /node
COPY ./WeldingContest/ClientApp /node
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=node-builder /node/build ./ClientApp/public

ENTRYPOINT ["dotnet", "WeldingContest.dll"]