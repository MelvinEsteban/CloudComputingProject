const router = require('express').Router();
const events = require('../services/events');

router.get('/idAgenda/:idAgenda', async function (req, res, next) {
    try {
        res.json(await events.getByAgenda(req.params.idAgenda));
    } catch (err) {
        console.error(`Error while getting events `, err.message);
        next(err);
    }
});

router.get('/title/:title', async function (req, res, next) {
    try {
        res.json(await events.getByTitle(req.params.title));
    } catch (err) {
        console.error(`Error while getting events `, err.message);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.hasOwnProperty('title')) {
            res.status(500).json({
                error: 'No title provided'
            })
        } else if (!req.body.hasOwnProperty('id_agenda')) {
            res.status(500).json({
                error: 'No id agenda provided'
            })
        } else if (!req.body.hasOwnProperty('date_end') || !req.body.hasOwnProperty('date_begin')) {
            res.status(500).json({
                status: 'error',
                error: 'No date provided'
            })
        } else {
            const dateBegin = parseInt(req.body.date_begin, 10);
            const dateEnd = parseInt(req.body.date_end, 10) ;
            res.json(await events.add(
                req.body.title, req.body.description,
                dateBegin, dateEnd, req.body.id_agenda));
        }
    } catch (err) {
        console.error(`Error while adding events `, err.message);
        next(err);
    }
});

router.delete('/:idEvent', async (req, res, next) => {
    try {
        res.json(await events.remove(req.params.idEvent));
    } catch (err) {
        console.error(`Error while deleting events `, err.message);
        next(err);
    }
})


router.put('/', async (req, res, next) => {
    try {
        if (!req.body.hasOwnProperty('title')) {
            res.status(500).json({
                error: 'No title provided'
            });
        } else if (!req.body.hasOwnProperty('id_agenda')) {
            res.status(500).json({
                error: 'No id agenda provided'
            });
        } else if (!req.body.hasOwnProperty('date_end') || !req.body.hasOwnProperty('date_begin')) {
            res.status(500).json({
                status: 'error',
                error: 'No date provided'
            });
        } else if (!req.body.hasOwnProperty('id_event')) {
            res.status(500).json({
                status : 'error',
                error : 'Unknow  id event'
            }) ;
        } else {
            res.json(await events.update(req.body.id_event,
                req.body.title, req.body.description,
                req.body.date_begin, req.body.date_end, req.body.id_agenda));
        }
    } catch (err) {
        console.error(`Error while updating events `, err.message);
        next(err);
    }
})


module.exports = router;