var express = require("express");
var mongo = require("mongodb").MongoClient;

var app = express();

var url = 'mongodb://localhost:27017/url';

app.get('/',function(request,response){
      response.sendFile(__dirname +'/'+'index.html')  
        });

app.get('/get/:value',function(request,response){
    var fullurl = request.params.value;
    var shorturl = Math.random()*100000;
    shorturl = Math.floor(shorturl);
    
    
mongo.connect(url,function(err,db){
    if(err){
        res.send("error");
    }
    else{
        var data = db.collection('urls');
        var entry = {"fullurl":fullurl,'shorturl':shorturl};
        data.insert(entry);
        response.send(entry);
        db.close();
        
    }
});
    
    });


app.get('/:short',function(request,response){
    
        var shorturl = request.params.short;
        mongo.connect(url,function(err,db){
        if(err){
            res.send("error");
        }     
        else{
            var data = db.collection("urls");
            shorturl = parseInt(shorturl);
            data.find({'shorturl':shorturl}).toArray(function(err,docs){
                if(err){
                    response.send("error ");
                }
                else if(docs.length<=0){
                    reponse.send("not found ")
                }
                else{
                    response.redirect('http://' + docs[0].fullurl);
                }
                console.log(docs[0].fullurl);
                
            })
                
            }
        
    });
    
});

app.listen(3000,function(){
    console.log("listening");
})