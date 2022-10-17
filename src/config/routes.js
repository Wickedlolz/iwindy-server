const router = require('express').Router();

const productController = require('../controllers/product');
const userController = require('../controllers/user');

router.use('/api/products', productController);
router.use('/api/users', userController);

module.exports = router;
