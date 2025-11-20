const express = require('express');
const Person = require('../models/Person');
const router = express.Router();

// Create Person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Person created successfully');
        res.status(201).json(response);
    } catch (err) {
        console.error('Error creating person:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


// Read Person
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json(persons);
        console.log('Persons fetched successfully');
    } catch (err) {
        console.error('Error fetching persons:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype === 'Chef' || worktype === 'manager' || worktype === 'waiter') {
            const response = await Person.find({ work: worktype });
            res.status(200).json(response);
            console.log(`Persons with work type ${worktype} fetched successfully`);
        } else {
            res.status(400).send({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error fetching persons by work type:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Updated Person
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updateData, { new: true });
        if (response) {
            res.status(200).json(response);
            console.log(`Person with ID ${personId} updated successfully`);
        } else {
            res.status(404).send({ error: 'Person not found' });
        }
    } catch (err) {
        console.error('Error fetching persons by work type:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


// delete Person
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; 
        const response = await Person.findByIdAndDelete(personId);
        if (response) {
            res.status(200).json({ message: 'Person deleted successfully' });   
            console.log(`Person with ID ${personId} deleted successfully`);
        } else {
            res.status(404).send({ error: 'Person not found' });
        }       
    } catch (err) {
        console.error('Error deleting person:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;
