const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('./database/con');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.get('/', async (req, res) => {
  const rank = await knex('BestResultsTable')
    .where('PlayerType', 'Normal')
    .where('Difficulty', req.query.difficulty)
    .orderBy('DamageReceived', 'asc')
    .orderBy('Duration', 'asc')

  const rankWithPosition = rank.map((value, idx) => { return { Position: (idx + 1), ...value } })

  res.status(200).json(rankWithPosition);
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});