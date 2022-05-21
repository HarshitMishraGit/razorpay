const express = require('express');
//const res = require('express/lib/response');
const router = express.Router();
const Razorpay = require('razorpay');
const instance = new Razorpay({
    key_id: 'rzp_live_CcEu2sivyeCoz1', //zddhbIZGdyqMPDMiw2oiDbPu
    key_secret: 'zddhbIZGdyqMPDMiw2oiDbPu'
});

router.get('/', (req, res) => {
    // res.send('checkout page');
    var options = {
        amount: 100,
        currency: 'INR',

    };
    instance.orders.create(options, function(err, order) {
        if (err) {
            console.log(err);
        } else {
            console.log(order);
            // res.send(order.id);
            res.render('checkout', { amount: order.amount, order_id: order.id });
        }
    });
});
router.post('/pay-verify', (req, res) => {
    console.log(req.body);
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'zddhbIZGdyqMPDMiw2oiDbPu')
        .update(body.toString())
        .digest('hex');
    console.log("sig" + req.body.razorpay_signature);
    console.log("sig" + expectedSignature);

    if (expectedSignature === req.body.razorpay_signature) {
        console.log("Payment Success");
    } else {
        console.log("Payment Fail");
    }
})

module.exports = router;