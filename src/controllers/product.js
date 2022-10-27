const router = require('express').Router();

const productService = require('../services/product');
const { mapErrors } = require('../utils/mapErrors');

router.get('/', async (req, res) => {
    try {
        const phones = await productService.getAll().lean();
        res.json(phones);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

router.post('/', async (req, res) => {
    const data = req.body;

    try {
        const newProduct = await productService.create(data);
        res.json(newProduct);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { phoneId } = req.body;
        const phone = await productService.getById(phoneId);

        res.json(phone);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

module.exports = router;
