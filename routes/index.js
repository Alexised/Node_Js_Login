/*var express = require('express');

var router = express.Router();
router.get("/",function(req,res){
 res.render('index', { title: 'ars-music'});
});
module.exports=router;*/
exports.index = function(req,res) {
    if(!req.session.programmers_id){
     res.render('index',{session: "close"});
   } else {
       res.redirect('/app/programmers');
   }
}