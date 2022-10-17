const router = require('express').Router();

const productService = require('../services/product');

router.get('/', async (req, res) => {
    try {
        const phones = await productService.getAll().lean();
        res.json(phones);
    } catch (err) {
        res.status(400).json({ msg: err });
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { phoneId } = req.body;
        const phone = await productService.getById(phoneId);

        res.json(phone);
    } catch (err) {
        res.status(400).json({ msg: err });
        console.log(err);
    }
});

module.exports = router;
