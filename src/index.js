
const express = require ("express");
const mongoose = require('mongoose');
const  cors = require('cors');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    app.use(cors());
    next();
});

const port = process.env.PORT || 3000;

const User = mongoose.model('User', {
    user: String,
    email: String ,
    senha: String ,
    cart:[]
});

const Cart = mongoose.madel('Cart', {
    cart: []
})

const Moda = mongoose.model('Moda', {
    name: String,
    description: String,
    price: String,
    marca: String,
    image: [],
});

const Tecnologias = mongoose.model('Tecnologias' , {
    name: String,
    description: String,
    marca: String,
    price: String,
    image:[]
});

const Fitness = mongoose.model('Fitness' , {
    name: String,
    description: String,
    price: String,
    marca: String,
    image:[]
})

app.get("/fitness", async (req , res) => {
    const fitness = await Fitness.find();
    return res.send( fitness )
});


app.put("/fitness/:id", async ( req, res ) => {
    const fitness = await Fitness.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        marca: req.body.marca
    })

    return res.send(fitness)
});


app.post("/fitness", async (req , res) => {
    const fitness = new Fitness({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        marca: req.body.marca
    })

    await fitness.save()
    return res.send(fitness)
});

app.get("/fitness/:id" , async (req, res) => {
    const fitness = await Fitness.findById(req.params.id);

    return res.send(fitness);
})



app.get("/moda", async (req , res) => {
    const moda = await Moda.find();
    return res.send( moda )
});


app.put("/moda/:id", async ( req, res ) => {
    const moda = await Moda.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price
    })

    return res.send(moda)
})


app.post("/moda", async (req , res) => {
    const moda = new Moda({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        marca: req.body.marca
    })

    await moda.save()
    return res.send(moda)
});

app.get("/moda/:id" , async (req, res) => {
    const moda = await Moda.findById(req.params.id);

    return res.send(moda);
})

app.get("/tecnologia", async (req , res) => {
    const tecnologia = await Tecnologias.find();
    return res.send( tecnologia )
});


app.put("/tecnologia/:id", async ( req, res ) => {
    const tecnologia = await Tecnologias.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price
    })

    return res.send(tecnologia)
})

app.delete('/tecnologia/:id', async (req, res) => {
    const tecnologia = await Tecnologias.findByIdAndDelete(req.params.id)

    return res.send(tecnologia)
})


app.post("/tecnologia", async (req , res) => {
    const tecnologia = new Tecnologias({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        marca: req.body.marca
    })

    await tecnologia.save()
    return res.send(tecnologia)
});

app.get("/tecnologia/:id" , async (req, res) => {
    const tecnologia = await Tecnologias.findById(req.params.id);

    return res.send(tecnologia);
})


app.post("/user", async (req , res) => {
        const user = new User({
            user: req.body.user,
            email: req.body.email,
            senha: req.body.senha,
        })
        await user.save()
       return res.send(user)
});

app.post("/user/:id", async (req , res) => {
    const user = await Cart.findById(req.params.id , {
        cart: req.body.cart,
    })
    await user.save()
    return res.send(user)
});

app.get("/user" , async (req , res) => {
    const user = await User.find()
   return  res.send(user)
});

app.get("/user/:id" , async (req , res) => {
    const user = await User.findById(req.params.id)
   return  res.send(user)
});


app.delete('/user/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)

    return res.send(user)
})


app.listen(port, async () => {
    await mongoose.connect('mongodb+srv://elienebastos:Rocket06@store.idkeajt.mongodb.net/?retryWrites=true&w=majority&appName=store');
    console.log("App running");
});


