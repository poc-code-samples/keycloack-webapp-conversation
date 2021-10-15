import express from 'express';
import path, { dirname } from 'path';
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const PORT = 8081;
const app = express();

const documentRoot = dirname(process.argv[1]);


// Keycloack setup. 

// configure the web session store to manage server-side authentication
// the call to newKeycloack assume the keycloak.json file with client information is in the
// same directory the app is being executed.
const memoryStore = session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

app.set('trust proxy', true);
//install the keycloak middleware
app.use(keycloak.middleware());

// End keycloak setup

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this resource is protected by keycloak.
app.use('/app1', keycloak.protect(), express.static(path.join(documentRoot, 'ngApp1', 'dist', 'ngApp1')));


app.use('/landing', express.static(path.join(documentRoot, 'landing')))
app.get('/', (_, res) => {
     res.redirect('/landing');
});

/**
 * This method should be protected somehow... it need to be protected by serverside solution maybe.... will see the POC from Qiang
 */

app.post('/token', (req, res) => {
     const token = req.body.token;
     console.log(token);

     res
          .cookie('access_token', token, { expires: new Date(Date.now() + 8 * 3600000)})
          .redirect(301, '/app1');
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
