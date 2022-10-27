const router = require('express').Router();

const productService = require('../services/product');
const { mapErrors } = require('../utils/mapErrors');

router.get('/', async (req, res) => {
    try {
        const phones = await productService.getAll().lean();
        res.json(phones);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/', async (req, res) => {
    const data = {
        model: req.body.model,
        price: req.body.price,
        released: req.body.released,
        weigth: req.body.weigth,
        os: req.body.os,
        memory: req.body.memory,
        displaySize: req.body.displaySize,
        displayResolutions: req.body.displayResolutions,
        cameraMP: req.body.cameraMP,
        cameraVideo: req.body.cameraVideo,
        ram: req.body.ram,
        chipset: req.body.chipset,
        batteryMAH: req.body.batteryMAH,
        batteryType: req.body.batteryType,
        image: req.body.image,
        video: req.body.video,
        creator: req.user.id,
        category: req.body.category,
    };

    try {
        const newProduct = await productService.create(data);
        res.json(newProduct);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/:phoneId', async (req, res) => {
    try {
        const { phoneId } = req.params;
        const phone = await productService.getById(phoneId);

        res.json(phone);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.put('/:phoneId', async (req, res) => {
    const { phoneId } = req.params;

    try {
        const data = {
            model: req.body.model,
            price: req.body.price,
            released: req.body.released,
            weigth: req.body.weigth,
            os: req.body.os,
            memory: req.body.memory,
            displaySize: req.body.displaySize,
            displayResolutions: req.body.displayResolutions,
            cameraMP: req.body.cameraMP,
            cameraVideo: req.body.cameraVideo,
            ram: req.body.ram,
            chipset: req.body.chipset,
            batteryMAH: req.body.batteryMAH,
            batteryType: req.body.batteryType,
            image: req.body.image,
            video: req.body.video,
            creator: req.user.id,
            category: req.body.category,
        };

        const updatedProduct = await productService.updateById(phoneId, data);
        res.status(200).json(updatedProduct);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.delete('/:phoneId', async (req, res) => {
    const { phoneId } = req.params;

    try {
        const deletedMovie = await productService.deleteById(phoneId);
        res.json(deletedMovie);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
