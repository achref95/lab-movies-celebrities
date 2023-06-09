// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here
router.get('/celebrities/create', (req, res) => 
    res.render('celebrities/new-celebrity.hbs')
)

router.post('/celebrities/create', (req, res) => {
    const {name, occupation, catchPhase} = req.body
    console.log(req.body)
    Celebrity.create({name, occupation, catchPhase})
    
    .then(() => {
        res.redirect('/celebrities')
    })
}
)

router.get('/celebrities', (req, res) =>
    Celebrity.find()
        .then(celebritiesFound => {
            console.log('celebrities on the database:', celebritiesFound)
            res.render('celebrities/celebrities.hbs', { celebrities: celebritiesFound })
        })
        .catch(err => console.log(err))
)


module.exports = router;