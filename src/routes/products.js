// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const storage = multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, path.join(__dirname, '../../public/images/products'))
    },
    filename: (req, file, cb) => {
        cb(null, ('product-' + Date.now() + path.extname(file.originalname)) )
    }
});
const uploadFile = multer({storage});


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', uploadFile.single('image'), productsController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
