import express from 'express';
import path, { dirname } from 'path';

const PORT = 8081;
const app = express();

const documentRoot = dirname(process.argv[1]);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/app1', express.static(path.join(documentRoot, 'ngApp1', 'dist', 'ngApp1')));
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
