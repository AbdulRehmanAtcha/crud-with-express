import express from 'express';
import path from 'path';
import cors from 'cors';    
console.log("heeyy");
const app = express()
const port =  process.env.PORT || 5001

app.use(express.json());
app.use(cors());

let products = [];

app.post('/product', (req,res)=>{
    const body = req.body;

    if(!body.name || !body.price || !body.description){
        res.status(404);
        res.send({
            message: "All Inputs Are Required"
        });
        return;
    }
    products.push(
        {
            id: new Date().getTime(), 
            name: body.name,
            price: body.price,
            description: body.description

        }
    )
    res.send({
        message: "Product Added Successfully!",
        data: products
    });
})
app.get('/products', (req,res)=>{
    res.send({
        message: "",
        data: products
    });
})

app.get('/product/:id', (req, res)=>{
    let isProductFound = false;
    const id = req.params.id;
    for(let i = 0; i<products.length; i++){
        if(products[i].id == id){
            res.send({
                message: `Product Found ${products[i]}`,
                data: products[i]
            });
            isProductFound = true;
            console.log("Found");
            break;
        }
    }
    if(isProductFound === false){
        res.status(404);
        res.send({
            message: "Could't Find This Product"
        });
        console.log("Not Found");

    }
})

app.delete('/product/:id', (req, res)=>{
    let isProductFound = false;
    const id = req.params.id;
    for(let i = 0; i<products.length; i++){
        if(products[i].id == id){
            products.splice(i, 1);
            res.send({
                message: "Product Deleted Successfully!"
            });
            isProductFound = true
        }
    }
    if(isProductFound === false){
        res.status(404);
        res.send({
            message:"Could't Find This Product"
        });
    }
})

app.put('/products/:id', (req,res)=>{
    const id = req.params.id

    if(!body.name || !body.price || !body.description){
        res.status(404);
        res.send({
            message: "All Inputs Are Required"
        });
        return;
    }

    let isProductFound = false;
    for(let i = 0; i<products.length; i++){
        if(products[i].id == id){
            products[i].name = body.name;
            products[i].price = body.name;
            products[i].description = body.description;
            res.send({
                message: "Product Edited!"
            });
            isProductFound = true;
            break;
        }
    }
    if(isProductFound === false){
        res.status(404);
        res.send({
            message: "Could't Find This Product"
        });
    }
    
})


const __dirname = path.resolve();

app.use('/', express.static(path.join(__dirname, './my-posts/build')))
app.use('*', express.static(path.join(__dirname, './my-posts/build')))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})