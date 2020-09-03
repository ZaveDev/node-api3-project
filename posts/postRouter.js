const express = require('express');

const postDb = require('./postDb')

const router = express.Router();

router.get('/', validatePostId, (req, res) => {
   res.status(200).json({ iAm: "Working"})
});

router.get('/:id', (req, res) => {
   res.status(200).json({ iAm: "Working"})
});

router.delete('/:id', (req, res) => {
   res.status(200).json({ iAm: "Working"})
});

router.put('/:id', (req, res) => {
   res.status(200).json({ iAm: "Working"})
});

// custom middleware

function validatePostId(req, res, next) {
   console.log("Middle Ware hit")
   next()
}

module.exports = router;
