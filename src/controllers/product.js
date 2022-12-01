const router = require('express').Router();

const productService = require('../services/product');
const userService = require('../services/user');
const commentService = require('../services/comment');
const { mapErrors } = require('../utils/mapErrors');
const { isAuth, isGuest } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const query = req.query.search;
    const page = parseInt(req.query?.page) || 1;
    const limit = 15;
    const skipIndex = (page - 1) * limit;

    try {
        const phones = await productService
            .getAll(query, skipIndex, limit)
            .lean();
        res.json(phones);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const latestProduct = await productService.getLatest();
        res.json(latestProduct);
    } catch (error) {
        console.log(error);
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

// TODO: Add isAuth middleware
router.post('/', async (req, res) => {
    const data = {
        model: req.body.model,
        price: req.body.price,
        released: req.body.released,
        weight: req.body.weight,
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
        await userService.addToMyProducts(req.user.id, newProduct._id);
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

router.put('/:phoneId', isAuth(), async (req, res) => {
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

router.delete('/:phoneId', isAuth(), async (req, res) => {
    const { phoneId } = req.params;

    try {
        const deletedProduct = await productService.deleteById(phoneId);
        res.json(deletedProduct);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const products = await productService.getAllByCategory(category).lean();
        res.json(products);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/like/:productId', async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const phone = await productService.like(productId, userId);
        res.status(201).json(phone);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/dislike/:productId', async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const phone = await productService.dislike(productId, userId);
        res.status(201).json(phone);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/comment', async (req, res) => {
    const userId = req.user.id;
    const { productId, content } = req.body;

    try {
        const comment = await commentService.create(userId, productId, content);
        productService.addComment(productId, comment._id);
        res.status(201).json(comment);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
