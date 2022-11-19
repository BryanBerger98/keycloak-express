import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import expressSession from 'express-session';
import keycloakClient from './config/keycloak.js';
import passportMiddleware from './middlewares/passport.middleware.js';
import MainController from './controllers/main.controller.js';
import AuthController from './controllers/auth.controller.js';

const app = express();

const memoryStore = new expressSession.MemoryStore();

app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    })
);

passportMiddleware(app, keycloakClient);

const mainController = new MainController();
const authController = new AuthController();

app.use(mainController.path, mainController.initRoutes());
app.use(authController.path, authController.initRoutes());

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${ process.env.PORT }`);
});