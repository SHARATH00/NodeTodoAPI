var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/todos/:uname', function(req, res) {
        Todos.find({ username: req.params.uname })
            .then(function(todos) {
                res.send(todos);
            })
            .catch(function(err) {
                console.error(err);
                res.status(500).send('Error retrieving todos');
            });
    });

    app.get('/api/todo/:id', function(req, res) {
        Todos.findById(req.params.id)
            .then(function(todo) {
                res.send(todo);
            })
            .catch(function(err) {
                console.error(err);
                res.status(500).send('Error retrieving todo');
            });
    });

    app.post('/api/todo', function(req, res) {
        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id, {
                    todo: req.body.todo,
                    isDone: req.body.isDone,
                    hasAttachment: req.body.hasAttachment
                })
                .then(function(todo) {
                    res.send('success');
                })
                .catch(function(err) {
                    console.error(err);
                    res.status(500).send('Error updating todo');
                });
        } else {
            var newTodo = new Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save()
                .then(function() {
                    res.send('success from update and delete');
                })
                .catch(function(err) {
                    console.error(err);
                    res.status(500).send('Error saving new todo');
                });
        }
    });

    app.delete('/api/todo', function(req, res) {
        Todos.findByIdAndDelete(req.body.id)
            .then(function() {
                res.send('success from delete');
            })
            .catch(function(err) {
                console.error(err);
                res.status(500).send('Error deleting todo');
            });
    });

};
