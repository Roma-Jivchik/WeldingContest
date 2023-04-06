FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY ["WeldingContest/WeldingContest.csproj", "WeldingContest/"]
RUN dotnet restore "WeldingContest/WeldingContest.csproj"
COPY . .
WORKDIR "/src/WeldingContest"
RUN dotnet build "WeldingContest.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WeldingContest.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "WeldingContest.dll"]