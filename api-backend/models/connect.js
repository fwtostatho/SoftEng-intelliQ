const mongoose = require('mongoose')
const url = 'mongodb+srv://gerasimos:gerasimos@nodeexpress.xtecm6k.mongodb.net/survey?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
.then(()=>{
    console.log('Connected to db')
})
.catch((err) => console.log('not connected'))