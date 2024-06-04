const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json())

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

//Routes
const productsRouter = require("./routes/Products")
app.use("/products", productsRouter)
const categoriesRouter = require("./routes/Categories")
app.use("/categories", categoriesRouter)

//Invocar bd
const db = require("./models")

// Inicia el servidor
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
})

