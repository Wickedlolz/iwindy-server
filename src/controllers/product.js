const router = require('express').Router();

const phoneService = require('../services/phone');

router.get('/', async (req, res) => {
    try {
        const phones = await phoneService.getAll().lean();
        res.json(phones);
    } catch (err) {
        res.status(400).json({ msg: err });
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
