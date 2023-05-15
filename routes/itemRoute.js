const express=require('express');
const { getItems, createItems, updateItem, deleteItem, getSingleItem } = require('../controller/itemsController');

const router=express.Router();

router.get('/getitems',getItems)
router.post('/items',createItems)

router.delete('/items/:id',deleteItem)

router.put('/items/:id',updateItem)

router.get('/items/:id',getSingleItem)

module.exports=router