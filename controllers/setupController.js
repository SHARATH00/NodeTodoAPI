var Todos= require('../models/todoModel');

module.exports = function(app) {

        app.get('/api/setupTodos', function(req, res){

              //seed data
              var starterTodos = [
 
                   {
                    username: 'test',
                    todo: 'Buy Milk',
                    isDone: false,
                    hasAttachment: false
                   },

                   {
                    username: 'test',
                    todo: 'Buy Tomatoes',
                    isDone: false,
                    hasAttachment: false
                   },

                   {
                    username: 'test',
                    todo: 'Buy Onions',
                    isDone: false,
                    hasAttachment: false
                   }


              ];
              Todos.create(starterTodos)
              .then(function (results) {
                  res.send(results);
              })
              .catch(function (err) {
                  console.error(err);
                  res.status(500).send('Error seeding Todos');
              });

        });

}