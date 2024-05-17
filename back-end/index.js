const express = require('express');
const app = express()
const POST = 4000
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const { stringify } = require('querystring');

//khai báo middle của expressjs đọc dữ liệu json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//sử dụng middleware cors 
app.use(cors());
//khai báo middleware body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//kết nối cơ sở dữ liệu
mongoose.connect('mongodb://localhost:27017/E-commerce_Shop', { useNewUrlParser: true, useUnifiedTopology: true })
//middleware multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: function(req,file,cb){
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
//tạo model
const Product =  mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    avalable:{
        type:Boolean,
        default:true
    }
})

const User = mongoose.model('User',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

app.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email})
    if(check){
        return res.status(400).json(
            {
                success:false,
                error:'existing user found with same email address'
            }
        )
    }
    let cart={}
    for (let i = 0; i < 300; i++) {
        cart[i]=0
    }
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData: cart
    })

    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json(
        {
            success:true,
            token,
        }
    )

})


app.post('/login',async (req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json(
                {
                    success:true,
                    token
                }
            )
        }else{
            res.json(
                {
                    success:false,
                    error:'Wrong Password'
                }
            )
        }
    }else{
        res.json(
            {
                success:false,
                error:'Wrong Email'
            }
        )
    }
})

const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token')
    if(token){
        try {
            const data= jwt.verify(token,'secret_ecom');
            req.user= data.user;
            next()
        } catch (error) {
            console.log(error)
        }
    }else{
        res.status(401).send({error:"Please authenticate using valied"})
    }
}


app.post('/addtocart',fetchUser, async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemID]+=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Added')
})

app.post('/removeproduct',fetchUser, async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemID]-=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Removed')
})


app.post('/getcart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id})
    res.json(userData.cartData)
})

app.post('/removeproduct',async (req,res)=>{
    const product = await Product.findOne({id:req.body.id}).exec();
    try {
        if(product){
            await product.deleteOne({id:req.body.id});
            res.json({
                success:true,
                name:req.body.name
            })
        }else{
            res.json({
                success:false,
                name:req.body.name
            })
        }
    } catch (error) {
        console.log(error)
    }
    
    
})




//tạo middleware uploads
const uploads = multer(
    {
        storage:storage,
    }
).single('product')
//tạo đường dẫn static cho file upload
app.use('/images',express.static('upload/images'))
//router
app.post('/upload',uploads,(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${POST}/images/${req.file.filename}`
    })
})



app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }else{
        id = 1;
    }
    const newproduct = await Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,

    })
    console.log(newproduct);
    await newproduct.save();
    console.log('saved');
    res.json({
        success:true,
        name:req.body.name
    })
})


app.get('/listproduct' , async(req,res)=>{
    const product = await Product.find().exec();
    res.json(product)
})



app.get('/', (req, res) => {
    res.json('helllo')
})



app.listen(POST, () => {
    console.log(`http://localhost:${POST}`)
})
