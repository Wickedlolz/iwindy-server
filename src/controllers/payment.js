const router = require('express').Router();
const Stripe = require('stripe');

router.post('/pay', async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        await stripe.charges.create({
            source: req.body.token.id,
            amount: req.body.amount,
            currency: 'usd',
        });

        res.json({ message: 'success' });
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;
