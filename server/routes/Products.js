const express = require('express')
const router = express.Router()
const  { Products } = require('../models')

router.get("/", async (req, res) => {
    const listOfProducts = await Products.findAll()   
    res.json(listOfProducts)
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Products.findByPk(id);
    res.json(product)
})

router.post("/", async (req, res) => {
    const post = req.body
    await Products.create(post)
    res.json(post)
})

router.delete('/deleteById/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Products.destroy({
            where: {
                id: id
            }
        });

        if (result) {
            res.status(200).json({ message: 'Registro eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el registro', error });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description, category } = req.body;
    try {
      const product = await Products.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      product.title = title;
      product.description = description;
      product.category = category;
      await product.save();
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error actualizando el producto', error });
    }
  });
  
module.exports = router

