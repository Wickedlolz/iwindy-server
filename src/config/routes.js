const router = require('express').Router();

const productController = require('../controllers/product');
const userController = require('../controllers/user');

router.use('/api/products', productController);
router.use('/api/users', userController);
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Resource not found!' });
});

module.exports = router;
