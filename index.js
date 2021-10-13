import { cwd } from 'process';
import express from 'express';
import path, { dirname } from 'path';
import { StatusCodes } from 'http-status-codes';

const PORT = 8081;
const app = express();

const documentRoot = dirname(process.argv[1]);

app.use('/app1', express.static(path.join(documentRoot, 'ngApp1', 'dist', 'ngApp1')));
app.use('/app2', express.static(path.join(documentRoot, 'ngApp2', 'dist', 'ngApp2')));
app.use('/landing', express.static(path.join(documentRoot, 'landing')))
app.get('/', (_, res) => {
     res.status = StatusCodes.OK
     res.setHeader('Content-Type', 'application/json');
     res.write(JSON.stringify({ message: `A fancy message from the application executed from ${cwd()}`}));
     res.end();
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
