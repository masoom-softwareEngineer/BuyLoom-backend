import fetch from 'node-fetch'
import { Product } from '../Model/Product.js';
export const subCategory = async(req, res)=>{
   const name = req.params.name.trim();
   console.log('searching for name',name)

   try{
        const nameCategory = await Product.find({ category: {$regex: `^${name}$`, $options:'i'}});
        res.status(200).json({ nameCategory });
   }catch(err){
        res.status(500).json({ error: err.message });
   }
}
// export const orderproduct = async(req, res)=>{
//     try{
//         const id = req.params.id
//         const orderid = await Product.findById(id)
//         res.status(200).json({orderid})
//     }catch(err){
//         res.status(500).json({error: err.error})
//     }
// }