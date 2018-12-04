const express = require('express');
const chirpsStore = require('../chirpstore');

let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id
    if (id) {
        res.json(chirpsStore.GetChirp(id))
    } else {
        res.send(chirpsStore.GetChirps())
    }

});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body)
    res.send(chirpsStore.GetChirps());
});

router.put('/:id?', (req, res) => {
    chirpsStore.UpdateChirp(req.params.id, req.body)
    res.send(chirpsStore.GetChirps());
});

router.delete('/:id?', (req, res) => {
    chirpsStore.DeleteChirp(req.params.id)
    res.send('deleted')
})

module.exports = router;
