const express = require('express')
const {
  getAllProducts,
  getSingleProduct,
  postProduct,
  deleteProduct,
  editProduct,
} = require('../controllers/productsController')
const isAdmin = require('../middlewares/isAdmin')
const isAuthenticated = require('../middlewares/isAuthenticated')
const upload = require('../middlewares/upload')

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.post('/', isAuthenticated, isAdmin, upload.single('image'), postProduct)
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct)
router.put('/:id', isAuthenticated, isAdmin, editProduct)

module.exports = router
