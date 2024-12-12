# Felhantering i Rental-applikationen

Den här filen beskriver hur applikationen hanterar fel på ett strukturerat sätt.

## 1. Global Exception Handler

### Beskrivning
`GlobalExceptionHandler` är en centraliserad plats för att hantera undantag som kastas i applikationen. Den gör det möjligt att fånga specifika fel och returnera anpassade felmeddelanden och HTTP-statuskoder.

### Kodexempel
Här är en översikt av hanterade fel:

- **IllegalArgumentException**:
    - Returnerar `400 BAD REQUEST` om användarens input är ogiltig.
    - Exempel: Pris saknas i en `RentalItem`.

- **RuntimeException**:
    - Returnerar `500 INTERNAL SERVER ERROR` vid oväntade körningsfel.
    - Exempel: Fel vid databassparning.

- **Exception**:
    - Returnerar `500 INTERNAL SERVER ERROR` för generella fel.

```java
@ExceptionHandler(IllegalArgumentException.class)
public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input: " + ex.getMessage());
}
