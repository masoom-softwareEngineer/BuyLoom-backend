import fetch from 'node-fetch'
import { Product } from '../Model/Product.js'
export  const saveproduct = async(req,res)=>{
   try{

       const count = await Product.countDocuments()
       if(count >0){
           return res.status(200).json({message:'product already seeded'})
        }
        const response = await fetch('https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json')
        const data = await response.json()
        for(let item of data){
            const newproduct = new Product({
                name: item.name,
                description: item.description,
                priceCents: item.priceCents,
                category: item.category,
                image: item.image,
                rating: item.rating
            })
            await newproduct.save()
              }
        res.status(200).json({message:'all product save to mongo'})
    
    }catch(err){
        res.status(500).json({error: err.message})
    }
   
}  
export const readproduct = async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page -1)*limit;
        const totalproduct = await Product.countDocuments()
       const products =  await Product.find().skip(skip).limit(limit)
        res.status(200).json({products, page, limit, totalproduct, totalpage: Math.ceil(totalproduct/limit)})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}