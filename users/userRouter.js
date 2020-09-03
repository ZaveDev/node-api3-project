const express = require('express');
const userDb = require('./userDb')
const postDb = require('../posts/postDb');


const router = express.Router();


router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body)
    .then(rez => {
      res.status(200).json({ iAm: rez})    
    })    
    .catch(err => {
      res.status(500).json({err: err})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  console.log(req.body);
  postDb.insert(req.body)
  .then(rez => {
    res.status(200).json({ post: rez})    
  })
  .catch(err => {
    res.status(500).json({err: err})
  })
});

router.get('/', (req, res) => {
  userDb.get()
    .then(rez => {
      res.status(200).json({data: rez})
    })    
    .catch(err => {
      res.status(500).json({err: err})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  console.log("your mom", req.user);
  res.status(200).json({ iAm: req.user})
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.user.id)
  .then(rez => {
    res.status(200).json({data: rez})
  })
  .catch(err => {
    res.status(500).json({err: err})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.user.id)
    .then(rez => {
      rez > 0
      ? res.status(200).json({message: "user has been killed"})
      : res.status(404).json({message: "user does not exsist"})
    })
    .catch(err => {
      res.status(500).json({err: err})
    })
});

router.put('/:id', validateUserId, (req, res) => {
  userDb.update(req.user.id, req.body)
    .then(rez => {
      rez > 0
      ? res.status(200).json({message: "user has been updated"})
      : res.status(404).json({message: "user does not exsist "})
    })
    .catch(err => {
      res.status(500).json({err: err})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = Number(req.params.id)
  userDb.getById(id)
    .then(rez => {
      if (rez) {
        req.user = rez
        req.body.user_id = rez.id
        next(); 
      } else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
    .catch(err => {
      res.status(500).json({err: err})
    })
    
}

function validateUser(req, res, next) {
  if (req.body.name) {
    next()
  } else if (req.body.name === ""){
    res.status(400).json({ message: "missing required name field" })
  } else {
    res.status(400).json({ message: "missing user data" })
  }
  
}

function validatePost(req, res, next) {
  if (req.body.text) {
    next()
  } else if (req.body.text === ""){
    res.status(400).json({ message: "missing required text field" })
  } else {
    res.status(400).json({ message: "missing text data" })
  }
}

module.exports = router;