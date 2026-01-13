import express from 'express'
const routercategory = express.Router()
import { subCategory, orderproduct} from '../controllers/Category.js'

routercategory.get('/subCategory/:name', subCategory)
routercategory.get('/Order/:id', orderproduct)
export default routercategory;