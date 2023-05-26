const { Router } = require('express')

const router = Router();

const groceryList = [
    {
        item: "milk",
        quantity: 9,
    },
    {
        item: "biscuits",
        quantity: 20,
    },
    {
        item: "cereal",
        quantity: 19,
    },
    {
        item: "banana",
        quantity: 3,
    },
]

router.use((req, res, next) => {
    console.log('Inside groceries aauth check middleware');
    console.log(req.user)
    if (req.user) next();
    else res.send(401)

})

//Get all 
router.get('/', (req, res) => {
    res.cookie('visited', true, {
        maxAge: 60000,
    });
    res.send(groceryList);
});


//Post new data
router.post('/', (req, res) => {
    groceryList.push(req.body);
    res.sendStatus(201);
})

//Get one single data from param
router.get('/:item', (req, res) => {
    console.log(req.cookies);
    const { item } = req.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    res.send(groceryItem);
});


router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    if (!cart) {
        res.send('You have no cart session!')
    } else {
        res.send(cart)
    }
})

router.post('/shopping/cart/item', (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = { item, quantity };
    const { cart } = req.session
    if (req.session.cart) {
        const { items } = req.session.cart;
        req.session.cart.items.push(cartItem)
    } else {
        req.session.cart = {
            items: [cartItem],
        }
    }
    res.send(201);
})

module.exports = router;  