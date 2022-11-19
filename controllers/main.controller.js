import { Router } from 'express';
import AuthGuardMiddleware from '../middlewares/auth/auth-guard.middleware.js';

class MainController {

    path = '';
    router = Router();

    initRoutes = (middlewares) => {
        if (middlewares && middlewares.length > 0) {
            this.router.use(...middlewares);
        }
        this.router.get('/', this.#indexPageHandler);
        this.router.get('/protected', AuthGuardMiddleware.isAuthenticated, this.#protectedRouteHandler);
        this.router.get('/unprotected', this.#unprotectedRouteHandler);

        return this.router;
    };

    #indexPageHandler = (req, res) => {
        res.send('Welcome on index page!');
    };

    #protectedRouteHandler = (req, res) => {
        res.send('Welcome on protected route!');
    };

    #unprotectedRouteHandler = (req, res) => {
        res.send('Welcome on unprotected route!');
    };

}

export default MainController;