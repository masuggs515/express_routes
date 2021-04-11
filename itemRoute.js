const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require('./fakeDb')

router.get("/", (req, res) => {
    return res.json({ items });
});

router.post('/', (req, res) => {
    const newItem = { "name": req.body.name, "price": req.body.price };
    items.push(newItem);
    return res.status(201).json({ "added": newItem });
});

router.get('/:name', (req, res) => {
    const foundItem = items.find(x => x.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    };
    res.json({"name": foundItem.name, "price": foundItem.price })
})

router.patch('/:name', (req, res) => {
    let foundItem = items.find(x => x.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    };
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    res.json({"updated": {"name": foundItem.name, "price": foundItem.price }});
})

router.delete('/:name', (req, res) => {
    let foundItem = items.find(x => x.name === req.params.name);
    if (foundItem === -1) {
        throw new ExpressError("Item not found", 404);
    };
    items.splice(foundItem, 1)
    res.json({message: "Deleted"});
})

module.exports = router;