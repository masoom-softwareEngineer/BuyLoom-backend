import express from 'express'
const routercategory = express.Router()
import { subCategory} from '../controllers/Category.js'

routercategory.get('/subCategory/:name', subCategory)
export default routercategory;
// routercategory.get('/Order/:id', orderproduct)