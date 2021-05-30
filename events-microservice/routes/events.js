const router = require('express').Router();
const events = require('../services/events');

/**
 * route useless
 */
router.get('/idAgenda/:idAgenda', async function (req, res, next) {
    try {
        res.json(await events.getByAgenda(req.params.idAgenda));
    } catch (err) {
        console.error(`Error while getting events `, err.message);
        next(err);
    }
});


/**
 * Route useless
 */
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
            const dateBegin = req.body.date_begin.replace(/\+/g, " ");
            const dateEnd = req.body.date_end.replace(/\+/g, " ") ;
            res.json(await events.add(
                req.body.title.replace(/\+/g, " "), req.body.description.replace(/\+/g, " "),
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
            const start = req.body.date_begin.replace(/\+/g, " ");
            const end = req.body.date_end.replace(/\+/g, " ");
            const title = req.body.title.replace(/\+/g, " ");
            res.json(await events.update(req.body.id_event,
                title, req.body.description,
                start, end, req.body.id_agenda));
        }
    } catch (err) {
        console.error(`Error while updating events `, err.message);
        next(err);
    }
})

router.get('/:idUser', async (req, res, next) => {
    try {
        res.json( await events.getByUser(req.params.idUser)) ;
    } catch (error) {
        console.error(error) ;
        next(err) ;
    }
}); 

module.exports = router;