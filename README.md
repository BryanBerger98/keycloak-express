# Keycloak Express

## Get started

Clone repository:

```bash
git clone git@github.com:BryanBerger98/keycloak-express.git
```

Go into directory:

```bash
cd keycloak-express
```

Install dependances:

```bash
npm i
```

or

```bash
yarn
```

Configure the environment variables:

```dosini
# SERVER CONFIG
PORT= # PORT OF THE NODE JS SERVER
SERVER_URL= # URL OF THE NODE JS SERVER

# EXPRESS SESSION
SESSION_SECRET= # EXPRESS SESSION SECRET

# KEYCLOAK
KEYCLOAK_REALM= # KEYCLOAK REALM ID
KEYCLOAK_AUTH_SERVER_URL= # KEYCLOAK AUTH SERVER URL
KEYCLOAK_SSL_REQUIRED= # KEYCLOAK SSL REQUIRED
KEYCLOAK_RESOURCE= # KEYCLOAK RESOURCE ID
KEYCLOAK_CREDENTIALS_SECRET= # KEYCLOAK CREDENTIALS SERCRET
KEYCLOAK_CONFIDENTIAL_PORT= # KEYCLOAK CONFIDENTIAL PORT
```

Run the server:

```bash
node
```
