#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FhirEvaluator.AspNetCore/FhirEvaluator.AspNetCore.csproj", "FhirEvaluator.AspNetCore/"]
RUN dotnet restore "FhirEvaluator.AspNetCore/FhirEvaluator.AspNetCore.csproj"
COPY . .
WORKDIR "/src/FhirEvaluator.AspNetCore"
RUN dotnet build "FhirEvaluator.AspNetCore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FhirEvaluator.AspNetCore.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FhirEvaluator.AspNetCore.dll"]