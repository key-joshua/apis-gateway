# APIs GATEWAY SERVER
This is apis gateway server

## INSTALLATION AND DB SETUP

1. Clone the repository:

   ```sh
   git clone https://github.com/key-joshua/apis-gateway-server.git
   ```
2. Node Version ```21.5.0```.
3. Setup Database
- Create Database and the get all DB credentails ```DATABASE_PORT```, ```DATABASE_HOST```, ```DATABASE_USERNAME```, ```DATABASE_PASSWORD``` and ```DATABASE_NAME```.
- Run this command ```npx sequelize init```.
- Run this script ```npm run deleteAllTables```.
- Run this script ```npm run createAllTables```.
- Run this script ```npm run createAllSeeds```.

4. Install dependencies:

   ```sh
   npm install
   ```

5. Copy `.env.example` to `.env` and add values to all variables.

6. Start the server:
   ```sh
   npm run dev
   ```