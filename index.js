import express from 'express';
import path, { dirname } from 'path';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
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

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

app.use(keycloak.middleware());
app.use('/landing', express.static(path.join(documentRoot, 'landing')))
app.use('/app1', keycloak.protect(), express.static(path.join(documentRoot, 'ngApp1', 'dist', 'ngApp1')));
app.get('/', (_, res) => {
     res.redirect('/app1');
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
