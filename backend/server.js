import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
app.use(bodyParser.json());

const dbUrl = 'mongodb://localhost/crudwithredux';

function validate(data) {
  let errors = {};
  if (data.description === '') errors.description = "Can't be empty";
  if (data.date === '') errors.date = "Can't be empty";
  if (data.incomeOrExpense === '') errors.incomeOrExpense = "Can't be empty";
  if (data.amount === '') errors.amount = "Can't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err, client) {
  var db = client.db('crudwithredux');
  app.get('/api/walletItems', (req, res) => {
    db.collection('walletItems').find({}).toArray((err, walletItems) => {
      res.json({ walletItems });
    });
  });

  app.post('/api/walletItems', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { description, date,incomeOrExpense,amount} = req.body;
      db.collection('walletItems').insert({ description, date,incomeOrExpense,amount }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ walletItem: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });

  app.put('/api/walletItems/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { description, date,incomeOrExpense,amount } = req.body;
      db.collection('walletItems').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: { description, date,incomeOrExpense,amount } },
        { returnOriginal: false },
        (err, result) => {
          if (err) { res.status(500).json({ errors: { global: err }}); return; }

          res.json({ walletItem: result.value });
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

  app.get('/api/walletItems/:_id', (req, res) => {
    db.collection('walletItems').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, walletItem) => {
      res.json({ walletItem });
    })
  });

  app.delete('/api/walletItems/:_id', (req, res) => {
    db.collection('walletItems').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
      if (err) { res.status(500).json({ errors: { global: err }}); return; }

      res.json({});
    })
  });

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Still working on it. Please try again later when we implement it"
      }
    });
  })

  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});
