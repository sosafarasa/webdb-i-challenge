const express = require('express');
const db = require('./data/dbConfig');

const router = express.Router();

router.post('/', (req, res) => {
    db('accounts')
    .insert(req.body)
    .then(account => {
        const [id] = account;

        db('accounts')
        .where({id})
        .first()
        .then(account => {
            res.status(201).json(account)
        })
    })
    .catch(error => {
        res.status(500).json(error) 
    })
});
  
router.get('/', (req, res) => {
    db('accounts')
    .then(account => {
        res.status(200).json(account);
    })
    .catch(err => {
    res.status(500).json({ message: 'An error has occurred retrieving the accounts' });
    });
});
  
router.get('/:id', (req, res) => {

    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'The account with the specified ID does not exist' });
        }
    })
    .catch(error => {
    res.status(500).json(error);
    });
});
  
router.put('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts')
    .where({id})
    .update(req.body)
    .then(count => {
        if(count > 0){
            db('accounts')
            .where({id})
            .first()
            .then(account => {
                res.status(200).json(account)
            })
        } else {
            res.status(404).json({ message: 'The account with the specified ID does not exist' })
        }
    })
    .catch( err => {
        res.status(500).json(err)
    })
});
  
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts')
    .where({id})
    .del() 
    .then(count => {
        if(count > 0) {
            res.status(204).end();
        }else{
            res.status(404).json({ message: 'The account with the specified ID does not exist' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});
  
module.exports = router;