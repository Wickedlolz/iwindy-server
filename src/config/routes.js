const router = require('express').Router();

const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const userController = require('../controllers/user');

router.use('/api/products', productController);
router.use('/api/category', categoryController);
router.use('/api/users', userController);

module.exports = router;
