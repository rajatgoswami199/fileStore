import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
