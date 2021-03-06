var express = require('express');
var router = express.Router();
var multer = require('multer');
var User = require('../../modules/api/user.js');

var user = new User();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/staticimage/apiuser');          
  },
  filename: function (req, file, cb) {
      cb(null, req.body.utel + "-" + file.originalname);        
  }
});

var upload = multer({ storage: storage   });


router.get('/sexhobby',(req,res,next)=>{
  var obj = {
    uid:req.query.uid,
    usex:req.query.usex
  }
  user.updateSex(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
      res.send('error');
    } else {
      res.send('ok');
    }
  });
  req.query.topic.forEach((e)=>{
    user.insertHobby(req.uid,e,(err,result)=>{
      if(err){
        res.statusCode = 500;
        res.send('error');
      } else{
        res.send('ok');
      }
    });
  });
});

router.get('/myarticle/:uid',(req,res,next)=>{
  var obj = req.params;
  user.getArticle(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
    } else {
      res.json(JSON.parse(JSON.stringify(result)));
    }
  });
});

router.get('/mysay/:uid',(req,res,next)=>{
  var obj = req.params;
  user.getSay(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
    } else {
      res.json(JSON.parse(JSON.stringify(result)));
    }
  })
})

router.get('/myhobby/:uid',(req,res,next)=>{
  var obj = req.params;
  user.getHobby(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
    } else {
      res.json(JSON.parse(JSON.stringify(result)));
    }
  })
})

router.get('/myconcern/:uid',(req,res,next)=>{
  var obj = req.params;
  user.getConcern(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
    } else {
      res.json(JSON.parse(JSON.stringify(result)));
    }
  })
})

router.get('/myfans/:upid',(req,res,next)=>{
  var obj = req.params;
  user.getFans(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
    } else {
      res.json(JSON.parse(JSON.stringify(result)));
    }
  })
})


router.get('/:uid',(req,res,next)=>{
  var obj = req.params;
  user.getAll(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
    } else {
      var obj = JSON.parse(JSON.stringify(result));
      res.json(obj);
    }
  });
});

router.post('/reg',(req,res,next)=>{
  var obj = req.body;
  console.log(obj);
  user.selectUid((err,result)=>{
    if(err){
      res.statusCode = 500;
    }
    var uid = JSON.parse(JSON.stringify(result))[0].c;
    obj.uid = uid;
  });
  if(obj.uid){
    user.insertItem(obj,(err,result)=>{
      if(err){
        res.statusCode = 500;
      }
      res.send('已成功');// 字符串
    });
  }
});

router.post('/login',(req,res,next)=>{
  var obj = req.body;
  user.getUser(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
    }
    var json = JSON.parse(JSON.stringify(result));
    res.json(json);
  })
});

router.post('/forget',(req,res,next)=>{
  var obj = req.body;
  user.updatePass(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
      res.send('error');
    } else {
      res.send('ok');
    }
  });
});

router.post('/image',upload.single('uimage'),(req,res,next)=>{
  var obj = {
    uimage:req.file.filename,
    uid:req.body.uid
  };
  user.updateImage(obj,(err,result)=>{
    if(err){
      res.statusCode = 500;
      res.send('error');
    }else{
      res.send('ok');
    }
  });
});

module.exports = router;
