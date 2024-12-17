# Steg 1: Bygg med Maven
FROM maven:3.8-openjdk-17 AS build

# Sätt arbetskatalog
WORKDIR /app

# Kopiera Maven-konfiguration och källkod
COPY pom.xml .
COPY src ./src

# Bygg JAR-filen
RUN mvn clean package -DskipTests

# Steg 2: Kör applikationen med OpenJDK
FROM openjdk:17-jdk
WORKDIR /app

# Kopiera den färdiga JAR-filen från build-steget
COPY --from=build /app/target/*.jar app.jar

# Exponera rätt port (anpassa för varje tjänst)
EXPOSE 8083

# Starta applikationen
ENTRYPOINT ["java", "-jar", "app.jar"]
