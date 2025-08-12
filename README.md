# Webbtjänst för användarhantering
En RESTful webbtjänst som hanterar inloggningsuppgifter för nya och befintliga användare, samt hanterar användares inlägg. Webbtjänsten är skapad med Node.js, 
Express, mongoose och JWT. Webbtjänsten stödjer CRUD-operationer i form av Create, Read, Update och Delete via olika endpoints. Med hjälp av bcrypt skyddas användares 
lösenord genom att det hashas, vilket gör det omöjligt för någon att se det riktiga lösenordet.

## Länk
API länk: [https://moment4-backend.onrender.com/api](https://moment4-backend.onrender.com/api/users) 

## API endpoints
### Användare
| Metod    | Endpoint                 | Beskrivning
| -------- | ------------------------ | ----------------------------------- |
| GET      | /api/users               | Hämta alla användare                |
| GET      | /api/users/:id           | Hämta användare med ID              |
| POST     | /api/register            | Registrera ny användare             |
| POST     | /api/login               | Logga in existerande användare      |
| PUT      | /api/users/:id           | Uppdatera befintlig användare       |
| DELETE   | /api/users/:id           | Radera användare med ID             |

### Inlägg
| Metod    | Endpoint                 | Beskrivning
| -------- | ------------------------ | ----------------------------------- |
| GET      | /api/posts               | Hämta alla inlägg                   |
| GET      | /api/posts/:id           | Hämta inlägg med ID                 |
| POST     | /api/posts               | Lägga till nytt inlägg              |
| PUT      | /api/users/:id           | Uppdatera befintligt inlägg         |
| DELETE   | /api/users/:id           | Radera inlägg med ID                |

**Objekt returneras/skickas som JSON**    
Exempel: GET `/api/posts/:id`     
id = 6894d15622b09bbfa6fe37e7:
```json
{
  "_id": "6894d15622b09bbfa6fe37e7",
  "title": "Veckans citat",
  "content": "“Simplicity is the ultimate sophistication.” – Leonardo da Vinci",
  "sign": "Citatmaskinen",
  "createdAt": "2025-08-07T16:16:22.639Z",
  "__v": 0
}
```

## Verktyg
- Node.js
- Express
- Mongoose
- MongoDB Atlas
- dotenv
- bcrypt
- JWT
- cors

## Installation
1. **Klona repot:**
```bash
git clone https://github.com/rare2400/Moment4.1.git
cd Moment4.1
```

2. **Installera paket:**
```bash
npm install
```

3. **Skapa `.env`-fil och fyll i databasuppgifter:**
```env
DATABASE= --hämtad från MongoDB Atlas--
PORT=3000
```

4. **Starta server:**

```bash
npm run start
```

5. API länk: [http://localhost:3000/api](http://localhost:3000/api) 

### Validering
- Alla fält ifyllda vid skapande och uppdatering
- Webbtjänsten returnerar tydliga felmeddelanden och statuskoder vid saknade fält eller andra fel så som:
```json
{
  "error": "Username and password are required"
}
```

eller:

```json
{
  "message": "Post validation failed: title: Fyll i titel"
}
```

## Testning
API:t kan testas med program som:
- Thunder Client (vsc extension)
- Postman
- Advanced REST Client

## Användning i frontend
API:t kan kopplas till en frontendapplikation där skapade inlägg visas, samt att användare kan registrera sig och logga in för att själva skriva inlägg.
Repo till frontend-applikation: 
```bash
git clone https://github.com/rare2400/Moment4.2.git
```

## Skapad av
Skapad som en del av en skolupppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz   
2025-08-12
