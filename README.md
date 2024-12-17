# Film Rental Backend - Docker Setup

Detta projekt innehåller tre mikrotjänster (**Movie**, **Customer**, **Rental**) som använder en **H2-databas** och kommunicerar via **ActiveMQ**. Projektet använder **Docker Compose** för att bygga och orkestrera alla tjänster automatiskt.

---

## Första gången du kör projektet

### 1. Krav
- **Docker** och **Docker Compose** installerat.
- Internetuppkoppling för att hämta nödvändiga Docker-bilder och bygga projektet.

### 2. Bygg och starta containrarna
Navigera till katalogen där `docker-compose.yml` finns (backend-katalogen) och kör:

```bash
docker-compose up --build
```

Detta kommando:
- Bygger Maven-projektet för alla tjänster.
- Startar **movie**, **customer**, **rental** och **activemq** containrarna.
- Länkar dem i ett gemensamt nätverk.

### 3. Starta frontend-delen
Navigera till **/frontend/rental-frontend** och kör följande kommandon:

```bash
npm install
npm run dev
```

Frontend kommer att vara tillgänglig på:
[http://localhost:5173](http://localhost:5173)

### 4. Verifiera tjänsterna
- **Movie-tjänsten**: [http://localhost:8081](http://localhost:8081/movies)
- **Customer-tjänsten**: [http://localhost:8083](http://localhost:8083/customers)
- **Rental-tjänsten**: [http://localhost:8082](http://localhost:8082/rentals)
- **ActiveMQ Admin Console**: [http://localhost:8161](http://localhost:8161)
  - Inloggning: **admin** / **admin**

---

## Efterföljande gånger

När tjänsterna redan är byggda kan du starta dem direkt med:

```bash
docker-compose up
```

För att stoppa alla containrar:

```bash
docker-compose down
```

---

## H2-databasens lagring

- Varje tjänst lagrar sin H2-databas i en Docker-volym:
  - **Movie**: `movie-db`
  - **Customer**: `customer-db`
  - **Rental**: `rental-db`

Dessa volymer sparar databasen även om containern stoppas.

---

## Projektstruktur

```
backend/
└── docker-compose.yml       # Orkestrerar alla tjänster
├── movie/
│   └── Dockerfile          # Bygger Movie-tjänsten
│   └── src/               # Movie-källkod
├── customer/
│   └── Dockerfile          # Bygger Customer-tjänsten
│   └── src/               # Customer-källkod
└── rental/
    └── Dockerfile          # Bygger Rental-tjänsten
    └── src/               # Rental-källkod

frontend/
└── rental-frontend/        # Frontend-delen
    ├── package.json
    └── src/                # Frontend-källkod
```

---

## Vanliga kommandon

### Bygg och starta containrarna:
```bash
docker-compose up --build
```

### Starta frontend:
```bash
npm install
npm run dev
```

### Stoppa och ta bort alla containrar:
```bash
docker-compose down
```

### Se loggar för en specifik tjänst:
```bash
docker logs <container_name>
```
- Exempel: `docker logs movie_service`

### Rensa oanvänd data från Docker:
```bash
docker system prune -a
```

---

## Felsökning
1. **Portkonflikter**: Se till att portarna 8081, 8082, 8083, 8161 och 5173 inte används av andra tjänster.
2. **AktivMQ-anslutning**: Kontrollera ActiveMQ Admin Console på [http://localhost:8161](http://localhost:8161).
3. **Build-fel**: Bygg om allt med:
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```
4. **Nätverksproblem**: Använd Docker Compose's automatiska nätverk (**app-network**) som är fördefinierat i filen.

---

## Sammanfattning

För att bygga och köra projektet:
```bash
docker-compose up --build
```

För att starta frontend:
```bash
npm install
npm run dev
```

För att starta det igen:
```bash
docker-compose up
```

För att stoppa allt:
```bash
docker-compose down
```
