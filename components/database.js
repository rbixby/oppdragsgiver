import pg from 'pg';
// 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

// // const connectionString = 'postgres://task_master:0szcCTSl1xhjImAxUot8mjkep+elJKxO@localhost:5432/task_master';
// const cn = {
//   connectionString: 'postgres://task_master:0szcCTSl1xhjImAxUot8mjkep+elJKxO@localhost:5432/task_master',
//   max: 30
// };

// const db = pgp('postgres://task_master:0szcCTSl1xhjImAxUot8mjkep+elJKxO@localhost:5432/task_master');
const pool = new pg.Pool({
  user: 'task_master',
  host: 'localhost',
  database: 'task_master',
  password: '0szcCTSl1xhjImAxUot8mjkep+elJKxO',
  port: 5432,
})

export const getProjects = (req, resp) => {
  const theQuery = 'select * from project';
  pool.query(theQuery, (err, res) => {
    if (err) {
      console.log(`The message: ${err.message}, The stack: ${err.stack}`);
      resp.status(400).json({error: err.message, stack: err.stack});
    }
    else {
      console.log(res.rows);
      if (res.rows.length === 0) {
        resp.status(200).json({ results: 0});
      }
      else {
        resp.status(200).json(res.rows);
      }
    }
  });
}

export const insertProjects = (req, resp) => {
  const insertProject = 'insert into project (summary, proj_description, status_id) values ($1, $2, 1)';
  const {summary, proj_description} = req.body;
  pool.query(insertProject, [summary, proj_description], (err, res) => {
    if (err) {
      console.log(err.stack);
      resp.status(400).json({ error: err.message, stack: err.stack });
    }
    else {
      console.log("Project inserted.");
      resp.status(201).json(res.insertId);
    }
  })
}

export const getEntityStatuses = (req, resp) => {
  const theQuery = 'select * from entity_status';

  pool.query(theQuery, (err, res) => {
    if (err) {
      console.log(err.stack);
      resp.status(400).json({ error: err.message, stack: err.stack });
    }
    else {
      console.log(res.rows);
      resp.status(200).json(res.rows);
    }
  });
}