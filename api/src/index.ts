import * as express from 'express';

const PORT = process.env.PORT || 3000;

export const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).send('hello');
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
