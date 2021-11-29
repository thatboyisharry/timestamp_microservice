const express=require('express');
const app=express();
const cors = require('cors');
const path =require('path');


const PORT=process.env.PORT||5000;



app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static(path.join(__dirname, '/public')));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });


app.get('/api/:date?',(req,res)=>{
    let date_string=req.params.date;
    let date;
    let onlyNums=/^\d+$/g;

    if(!date_string){
        date = new Date();
    }else{
        if(onlyNums.test(date_string)){
            date = new Date(parseInt(date_string));
        }else{
            date = new Date(date_string);
        }
    }

    if(date.toString()==='Invalid Date'){
        let message=date.toString();
        res.json({error:message});
        console.log(date.toString());
    }else{
        let unix=date.getTime();
        let utc=date.toUTCString();
        res.json({unix:unix,utc:utc});
    }


});





var listener=app.listen(PORT,()=>{
    console.log(`Server is running on port ${listener.address().port}`);
});