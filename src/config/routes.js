const router = require('express').Router();

const productController = require('../controllers/product');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const paymentController = require('../controllers/payment');

router.get('/', (req, res) => {
    res.json({ message: 'Resource not found.' });
});
router.use('/api/products', productController);
router.use('/api/auth', authController);
router.use('/api/users', userController);
router.use('/api/payment', paymentController);
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Resource not found!' });
});

module.exports = router;
