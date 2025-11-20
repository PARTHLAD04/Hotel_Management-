const express = require('express');
const Menu = require('../models/Menu');
const { route } = require('./personRouter');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new Menu(data);
        const response = await newMenuItem.save();
        console.log('Menu item created successfully');
        res.status(201).json(response);
    } catch (err) {
        console.error('Error creating menu item:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        res.status(200).json(data);
        console.log('Menu items fetched successfully');
    } catch (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/:tastOfFood', async (req, res) => {
    try {
        const tastOfFood = req.params.tastOfFood;
        if (!['spicy', 'sweet', 'sour'].includes(tastOfFood)) {
            return res.status(400).send({ error: 'Invalid taste type' });
        } else {
            const response = await Menu.find({ taste: tastOfFood });
            res.status(200).json(response);
            console.log(`Menu items with taste ${tastOfFood} fetched successfully`);
        }
    } catch (error) {
        console.error('Error fetching menu items by taste:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updateData = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, updateData, { new: true });
        if (response) {
            res.status(200).json(response); 
            console.log(`Menu item with ID ${menuId} updated successfully`);
        } else {
            res.status(404).send({ error: 'Menu item not found' });
        }
    } catch (err) {
        console.error('Error updating menu item:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }   
});

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;   
        const response = await Menu.findByIdAndDelete(menuId);
        if (response) {
            res.status(200).json({ message: 'Menu item deleted successfully' });    
            console.log(`Menu item with ID ${menuId} deleted successfully`);
        } else {
            res.status(404).send({ error: 'Menu item not found' });
        }   
    } catch (err) {
        console.error('Error deleting menu item:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;

