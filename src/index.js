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
    .where('PlayerType', req.query.playerType ? req.query.playerType : 'Normal')
    .where('Difficulty', req.query.difficulty ? req.query.difficulty : 'Easy')
    .orderBy('DamageReceived', 'asc')
    .orderBy('Duration', 'asc')

  const rankWithPosition = rank.map((value, idx) => { return { Position: (idx + 1), ...value } })

  res.status(200).json(rankWithPosition);
});

app.listen(process.env.PORT || 5000, () => {
  console.log('server on');
});