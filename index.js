import express from 'express';
import consolidate from 'consolidate';
import underscore from 'underscore';

import * as db from './components/database.js';

const app = express();
const port = 4000;

app.engine('html', consolidate.underscore);
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'html');
app.set('views', 'static');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/projects', (req, res) => {
  db.getProjects(req, res);
});

app.post('/projects', (req, res) => {
  console.log(req.body);
  db.insertProjects(req, res);
})

app.get('/statuses', (req, res) => {
  db.getEntityStatuses(req, res);
});

app.listen(port, () => console.log(`Oppgaveleder app listening at http://localhost:${port}`));