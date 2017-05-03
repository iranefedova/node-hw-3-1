const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017/names';
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log('Ошибка подключения к серверу MongoDB!');
  } else {
    console.log('Подключено к', url);

    const collection = db.collection('users');
    const user1 = {name: 'Jack', age: 18};
    const user2 = {name: 'Nick', age: 16};
    const user3 = {name: 'Richard', age: 20};


      collection.insert([user1, user2, user3], function(err, result) {
        if (err) {
          console.log(err);
        } else {
          collection.find({}, {_id: 0}).toArray(function(err, res) {
            if (err) {
              console.log(err);
            } else if (res.length) {
              console.log('Добавленные пользователи:');
              console.log(res);
            } else {
              console.log('Не найдено!');
            }
          });

          collection.update({age: {$gte: 18}}, {'$set': {name: 'Getting too old for this sh*t'}}, {multi: true}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              collection.find({}, {_id: 0}).toArray(function(err, res) {
                if (err) {
                  console.log(err);
                } else if (res.length) {
                  console.log('После изменения:');
                  console.log(res);
                  collection.remove({name: 'Getting too old for this sh*t'});
                } else {
                  console.log('Не найдено!');
                }
                collection.remove();
                db.close();
              });
            }
          });
        }
      });
  }
});
