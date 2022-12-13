const router = require('express').Router();

const productService = require('../services/product');
const userService = require('../services/user');
const { mapErrors } = require('../utils/mapErrors');
const { isAuth, isGuest } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    const query = req.query.name || '';
    const limit = Number(req.query.limit) || Number.MAX_SAFE_INTEGER;

    const startIndex = Number(req.query.startIndex) || 0;

    try {
        const [results, totalResults] = await Promise.all([
            productService.getAll(query, startIndex, limit),
            productService.getAllProductsCount(query),
        ]);

        res.json({ results, totalResults });
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const latestProducts = await productService.getLatest();
        res.json(latestProducts);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post(
    '/',
    isAuth(),
    body('name').trim(),
    body('colors').trim(),
    body('sizes').trim(),
    body('brand').trim(),
    body('quantity').trim(),
    body('price').trim(),
    body('description').trim(),
    body('image').trim(),
    body('category').trim(),
    body('name')
        .notEmpty()
        .withMessage('Name is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters long'),
    body('brand')
        .notEmpty()
        .withMessage('Brand is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Brand must be at least 3 characters long!'),
    body('quantity')
        .notEmpty()
        .withMessage('Quantity is required!')
        .bail()
        .isNumeric()
        .withMessage('Quantity must be a number!'),
    body('price').notEmpty().withMessage('Price is required!'),
    body('description')
        .notEmpty()
        .withMessage('Description is required!')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long!'),
    body('sizes').notEmpty().withMessage('Sizes is required!'),
    body('colors').notEmpty().withMessage('Colors is required!'),
    body('image').notEmpty().withMessage('Image Url is required!').bail(),
    async (req, res) => {
        const { errors } = validationResult(req);
        const data = {
            name: req.body.name,
            brand: req.body.brand,
            quantity: req.body.quantity,
            price: req.body.price,
            discount: Boolean(req.body.discount),
            description: req.body.description,
            sizes: req.body.sizes.split(', '),
            colors: req.body.colors.split(', '),
            image: req.body.image,
            creator: req.user.id,
            category: req.body.category,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }
            const newProduct = await productService.create(data);
            await userService.addToMyProducts(req.user.id, newProduct._id);
            res.json(newProduct);
        } catch (error) {
            console.log(error);
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productService.getById(productId);

        res.json(product);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.put(
    '/:productId',
    isAuth(),
    body('name').trim(),
    body('brand').trim(),
    body('quantity').trim(),
    body('price').trim(),
    body('description').trim(),
    body('image').trim(),
    body('category').trim(),
    body('name')
        .notEmpty()
        .withMessage('Name is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters long'),
    body('brand')
        .notEmpty()
        .withMessage('Brand is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Brand must be at least 3 characters long!'),
    body('quantity')
        .notEmpty()
        .withMessage('Quantity is required!')
        .bail()
        .isNumeric()
        .withMessage('Quantity must be a number!'),
    body('price').notEmpty().withMessage('Price is required!'),
    body('description')
        .notEmpty()
        .withMessage('Description is required!')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long!'),
    body('image').notEmpty().withMessage('Image Url is required!').bail(),
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .bail()
        .isAlphanumeric()
        .withMessage('Category must contains only letters and digits!'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const { productId } = req.params;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const data = {
                name: req.body.name,
                brand: req.body.brand,
                quantity: req.body.quantity,
                price: req.body.price,
                discount: Boolean(req.body.discount),
                description: req.body.description,
                image: req.body.image,
                category: req.body.category,
                sizes: req.body.sizes.split(', '),
                colors: req.body.colors.split(', '),
            };

            const updatedProduct = await productService.updateById(
                productId,
                data
            );
            res.status(200).json(updatedProduct);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.delete('/:productId', isAuth(), async (req, res) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await productService.deleteById(productId);
        res.json(deletedProduct);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    const limit = Number(req.query.limit) || Number.MAX_SAFE_INTEGER;

    const startIndex = Number(req.query.startIndex) || 0;

    try {
        const [results, totalResults] = await Promise.all([
            productService.getAllByCategory(category, startIndex, limit),
            productService.getAllByCategoryCount(category),
        ]);

        res.json({ results, totalResults });
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/like/:productId', isAuth(), async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const product = await productService.like(productId, userId);
        res.status(201).json(product);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/dislike/:productId', isAuth(), async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const product = await productService.dislike(productId, userId);
        res.status(201).json(product);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
