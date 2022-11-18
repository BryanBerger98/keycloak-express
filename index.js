import express from 'express';
import { Issuer, Strategy } from 'openid-client';
import dotenv from 'dotenv';
import passport from 'passport';
import expressSession from 'express-session';

dotenv.config();
const app = express();

const keycloakIssuer = await Issuer.discover(`${ process.env.KEYCLOAK_AUTH_SERVER_URL }/realms/car-track`);
console.log('Discovered issuer %s %O', keycloakIssuer.issuer, keycloakIssuer.metadata);

const client = new keycloakIssuer.Client({
    client_id: process.env.KEYCLOAK_RESOURCE,
    client_secret: process.env.KEYCLOAK_CREDENTIALS_SECRET,
    redirect_uris: [ `${ process.env.SERVER_URL }:${ process.env.PORT }/auth/callback` ],
    post_logout_redirect_uris: [ `${ process.env.SERVER_URL }:${ process.env.PORT }/logout/callback` ],
    response_types: [ 'code' ],
});

const memoryStore = new expressSession.MemoryStore();

app.use(
    expressSession({
        secret: 'another_long_secret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    })
);

app.use(passport.initialize());
app.use(passport.authenticate('session'));

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/test');
};

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

app.get('/test', (req, res, next) => {
    passport.authenticate('oidc')(req, res, next);
});

// callback always routes to test 
app.get('/auth/callback', (req, res, next) => {
    passport.authenticate('oidc', {
        successRedirect: '/testauth',
        failureRedirect: '/',
    })(req, res, next);
});

app.get('/testauth', checkAuthenticated, (req, res) => {
    res.send('test');
});

app.get('/other', checkAuthenticated, (req, res) => {
    res.send('other');
});

//unprotected route
app.get('/',function(req,res){
    res.send('index');
});

app.get('/logout', (req, res) => {
    res.redirect(client.endSessionUrl());
});

// logout callback
app.get('/logout/callback', (req, res) => {
    // clears the persisted user from the local storage
    req.logout({ keepSessionInfo: false }, (err) => {
        if (err) res.status(500).json({ error: err });
        // redirects the user to a public route
        res.redirect('/');
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${ process.env.PORT }`);
});