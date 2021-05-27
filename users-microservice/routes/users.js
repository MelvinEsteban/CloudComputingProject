const router = require('express').Router();
const users = require('../services/users');

router.get('/:login', async function (req, res, next) {
    try {
        res.json(await users.get(req.params.login));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    try {
        if (!req.body.hasOwnProperty('login')) {
            res.status(500).json({ error: 'No login provided' })
        }
        else if (!req.body.hasOwnProperty('passwordHash')) {
            res.status(500).json({ error: 'No hash provided' })
        }
        else {
            res.json(await users.add(req.body.login, req.body.passwordHash));
        }
    } catch (err) {
        console.error(`Error while adding users `, err.message);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await users.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting users `, err.message);
        next(err);
    }
})


router.put('/:id', async (req, res, next) => {
    try {
        if (!req.body.hasOwnProperty('id')) {
            res.status(500).json({ error: 'No id provided' })
        }
        res.json(await users.update(req.body.id, req.body.login, req.body.passwordHash))
    } catch (err) {
        console.error(`Error while modifying users `, err.message);
        next(err);
    }
})


module.exports = router;