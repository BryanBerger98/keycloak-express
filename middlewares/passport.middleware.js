import passport from 'passport';
import { Strategy } from 'openid-client';

const passportMiddleware = (app, client) => {

    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    // this creates the strategy
    passport.use('oidc', new Strategy({ client }, (tokenSet, userinfo, done) => {
        return done(null, tokenSet.claims());
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    return app;

};

export default passportMiddleware;