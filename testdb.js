var db = require('./models');

db.makeUp.create({
  name: 'Precise Eyeliner'
}).then(function(makeup) {
    console.log(makeup)
  console.log('Created: ', makeup.name)
})

db.makeUp.findAll().then(function(makeup) {
    console.log(makeup)
    console.log('Found: ', makeup.name)
})