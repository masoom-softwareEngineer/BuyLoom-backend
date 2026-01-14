import express from 'express';
import 'dotenv/config'
import { dbconnect } from './src/config/db.js';
import router from './src/routes/router.js';
import routercategory from './src/routes/categoryRouter.js';
import cors from 'cors'
dbconnect()

const port = process.env.PORT || 8080
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api',router)
app.get('/',(req,res)=>{
  res.send('hello qudratullah')
})
app.use('/api/product/category', routercategory)
app.use('/api/Orderproduct/', router)
app.use('/authentication',router)

app.listen(port, "0.0.0.0", () => {
  console.log(`backend is online ${port}`);
});
