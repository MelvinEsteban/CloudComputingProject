const router = require('express').Router();
const agenda = require('../services/agenda');
const removeUsers = require('../services/removeUsers');
const getUsers = require('../services/getUsers') ;
const addUsers = require('../services/addUsers');

router.get('/:idUser', async function (req, res, next) {
    try {
        res.json(await agenda.getByUser(req.params.idUser));
    } catch (err) {
        console.error(`Error while getting agenda `, err.message);
        next(err);
    }
});

router.get('/name/:name', async function (req, res, next) {
    try {
        res.json(await agenda.getByName(req.params.name));
    } catch (err) {
        console.error(`Error while getting agenda `, err.message);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.hasOwnProperty('name')) {
            res.status(500).json({
                error: 'No name provided'
            })
        } else if (!req.body.hasOwnProperty('id_user')) {
            res.status(500).json({
                error: 'No id user provided'
            })
        } else {
            res.json(await agenda.add(req.body.name, req.body.id_user));
        }
    } catch (err) {
        console.error(`Error while adding agenda `, err.message);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await agenda.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting agenda `, err.message);
        next(err);
    }
})


router.put('/', async (req, res, next) => {
    try {
        if (!req.body.hasOwnProperty('id_agenda')) {
            res.status(500).json({
                error: 'No id provided'
            })
        }
        if (!req.body.hasOwnProperty('name')) {
            res.status(500).json({
                error: 'No name provided'
            })
        }
        if (!req.body.hasOwnProperty('id_user')) {
            res.status(500).json({
                error: 'No id_user provided'
            })
        }
        res.json(await agenda.update(req.body.id_agenda, req.body.name, req.body.id_user))
    } catch (err) {
        console.error(`Error while modifying agenda `, err.message);
        next(err);
    }
})


router.post('/deleteUsers', async (req, res, next) => {
    try {  
        if (req.body.hasOwnProperty('id_agenda') && req.body.hasOwnProperty('id_user')){
            res.json( await removeUsers(req.body.id_agenda, req.body.id_user)) ;
        }
        else {
            res.status(500).json({
                status :'error', data : { reason : 'Argument missing' }
            }) ;
        }
    } catch (error) {
        console.error(error);
        next(error) ;
    }
});

router.get('/getAll/:idAgenda', async (req,res ,next ) => {
    try {
        res.json( await getUsers(req.params.idAgenda)) ;
    } catch (error) {
        console.error(console.error());
        next(error) ;
    }
});

router.post('/addUsers', async (req, res , next) => {
    try {
        if (req.body.hasOwnProperty('id_agenda') && req.body.hasOwnProperty('id_user')){
            res.json( await addUsers(req.body.id_agenda, req.body.id_user)) ;
        }
        else {
            res.status(500).json({
                status :'error', data : { reason : 'Argument missing' }
            }) ;
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
} );
module.exports = router;