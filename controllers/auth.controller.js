import { Router } from 'express';
import passport from 'passport';
import keycloakClient from '../config/keycloak.js';

class AuthController {

    path = '/auth';
    router = Router();

    initRoutes = (middlewares) => {
        if (middlewares && middlewares.length > 0) {
            this.router.use(...middlewares);
        }
        this.router.get('/callback', this.#authCallbackHandler);
        this.router.get('/login', this.#loginHandler);
        this.router.get('/logout', this.#logoutHandler);
        this.router.get('/logout/callback', this.#logoutCallbackHandler);

        return this.router;
    };

    // callback always routes to test
    #authCallbackHandler = (req, res, next) => {
        passport.authenticate('oidc', {
            successRedirect: '/protected',
            failureRedirect: '/',
        })(req, res, next);
    };

    #loginHandler = (req, res, next) => {
        passport.authenticate('oidc')(req, res, next);
    };

    #logoutHandler = (req, res) => {
        res.redirect(keycloakClient.endSessionUrl());
    };

    // logout callback
    #logoutCallbackHandler = (req, res) => {
        // clears the persisted user from the local storage
        req.logout({ keepSessionInfo: false }, (err) => {
            if (err) res.status(500).json({ error: err });
            // redirects the user to a public route
            res.redirect('/');
        });
    };

}

export default AuthController;