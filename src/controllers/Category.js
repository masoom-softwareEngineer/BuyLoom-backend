import fetch from 'node-fetch'

export const subCategory = async(req, res)=>{
   const name =  req.params.name
    try{
        const nameCategory = await Product.find({category:name})
        res.status(200).json({nameCategory})
    
    }catch(err){
        res.status(500).json({error: err.error})
    }
    
}
export const orderproduct = async(req, res)=>{
    try{
        const id = req.params.id
        const orderid = await Product.findById(id)
        res.status(200).json({orderid})
    }catch(err){
        res.status(500).json({error: err.error})
    }
}