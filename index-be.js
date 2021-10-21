import express from 'express';
import path, { dirname } from 'path';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import * as keycloakApi from './keycloak-api.js';
import keycloakConfig from './keycloak.js';

const PORT = 8081;
const app = express();

const documentRoot = dirname(process.argv[1]);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const memoryStore = new session.MemoryStore();
app.use(session({
     secret: 'secret',
     resave: false,
     saveUninitialized: true,
     store: memoryStore
}));

const tokenMiddleware = (req, res, next) => {
     const kcData = JSON.parse(req.session['keycloak-token']);
     console.log(kcData);
     res.cookie('token', kcData.access_token);
     next();
}

const keyclockApiConfig = {
     authServerUrl: keycloakConfig['auth-server-url'],
     realm: keycloakConfig.realm,
     clientId: keycloakConfig.resource,
     clientSecret: keycloakConfig.credentials.secret,
}

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
app.get('/refresh', async (req, res) => {
     if (req.session['keycloak-token'] === undefined)
          return res.send('No session');

     const kcData = JSON.parse(req.session['keycloak-token']);
     const response = await keycloakApi.refreshToken(keyclockApiConfig, kcData.refresh_token);
     console.log('refresh', response);
     res.send(response);
});

app.use(keycloak.middleware());
app.use('/landing', express.static(path.join(documentRoot, 'landing')))
app.use('/app1',
     keycloak.protect(),
     tokenMiddleware,
     express.static(path.join(documentRoot, 'ngApp1', 'dist', 'ngApp1')));
app.get('/', (_, res) => {
     res.redirect('/app1');
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
