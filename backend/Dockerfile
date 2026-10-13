# Multi-stage Docker build for Spring Boot on Render
# Stage 1: Build
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x ./mvnw && ./mvnw dependency:go-offline -B || true

COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Production JRE
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

# Tuned JVM parameters for Render 512MB RAM free tier
ENTRYPOINT ["sh", "-c", "java -XX:+UseSerialGC -Xss512k -XX:MaxRAMPercentage=75.0 -Dserver.port=${PORT} -jar app.jar"]
