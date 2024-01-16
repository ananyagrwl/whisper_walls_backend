const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://ananya88agrawal:ananya-123@cluster0.x7tazmf.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connection successfull")
}).catch((e)=>{
    console.log(`error is ${e}`)
})