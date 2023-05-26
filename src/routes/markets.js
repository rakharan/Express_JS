const { Router, request } = require('express');

const router = Router();

const markets = [
    {
        id: 1,
        store: "Pasar Baru",
        miles: 0.6,
    },
    {
        id: 2,
        store: "Pasar Johor",
        miles: 3.6,
    },
    {
        id: 3,
        store: "Pasar Lama",
        miles: 1,
    },
    {
        id: 4,
        store: "Pasar Asia",
        miles: 1.5,
    },
    {
        id: 4,
        store: "Pasar Cina",
        miles: 4.2,
    },
]

router.use((req, res, next) => {
    if (req.session.user) next();
    else res.send(401)

})

// Query Parameters
router.get('', (req, res) => {
    const { miles } = req.query;
    const parsedMiles = parseInt(miles);

    if (!isNaN(parsedMiles)) {
        const filteredStores = markets.filter((s) => s.miles <= parsedMiles)
        res.send(filteredStores)
    } else res.send(markets)
})


module.exports = router