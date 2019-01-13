var Programmers;
exports.setModel = function (modelo) {
    Programmers = modelo;
}
exports.index = function (req, res) {
    Programmers.find({}, function (error, programmers) {
        if (error) {
            res.send('ha surgido un error.')
        } else {
            console.log(req.session.programmers_id);
            res.render('programmers/index', {
                programmers: programmers
            });
        }
    });
};
exports.create = function (req, res) {
    res.render('programmers/save', {
        action: '/app/programmers/',
        
        programmers: new Programmers({  
            nombre: '',
            apellido: '',
            user: '',
            email:'',
            informacion:'',
            pass: '',
            edad: '',
            genero: ''
        })
    });
};
exports.store= function(req,res){
    var programmers = new Programmers({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        user: req.body.user,
        email: req.body.email,
        informacion:req.body.informacion,
        pass: req.body.pass,
        edad: req.body.edad,
        genero: req.body.genero
    });
    programmers.save(function(error, documento){
        if (error) {
            res.send('error al intentar guardar');
        } else {
            res.redirect('/app/programmers');
        }
    });
}
exports.show = function(req, res){
Programmers.findById(req.params.id, function(error , documento){
    if (error) {
        res.send("Error al intentar ver programadores");
    } else {
        res.render('programmers/show', {
            programmers: documento
            
        });
        
    }
});
};
exports.edit = function(req, res){
    Programmers.findById(req.params.id, function(error, documento){
        if (error) {
            res.send('Error al intentar ver el programador')
        } else {
             res.render('programmers/save',{
                 action: '/app/programmers/update/' + req.params.id,
                 programmers: documento
             });
        }
    });
};
exports.update = function(req, res){
    Programmers.findById(req.params.id, function(error, documento){
        if (error) {
             res.send('Error al intentar modificar el programador')
        } else {
            var programmers = documento;
            programmers.nombre = nombre = req.body.nombre;
            programmers.apellido = apellido = req.body.apellido;
            programmers.user = user = req.body.user;
            programmers.email = email = req.body.email;
            programmers.informacion = informacion = req.body.informacion;
            programmers.edad = edad = req.body.edad;
            programmers.genero = genero = req.body.genero;
            programmers.save(function(error, documento){
            if (error) {
                res.send('Error al intentar guardar el programador')
            } else {
                res.redirect('/app/programmers');
            }
        });

        }
    });
};
exports.destroy = function(req, res){
    Programmers.remove({_id: req.params.id}, function(error){
         if (error) {
                res.send('Error al intentar eliminar el programador')
            } else {
                res.redirect('/app/programmers');
            }
        });
    };
    exports.session = function (req, res){
        Programmers.find({user:req.body.user,pass:req.body.pass}, function(error, programmers){
            if (error) {
                res.send('ha surgido un error')
                
            } else {
                if(programmers.length > 0){
                  //  console.log(programmers);
                    req.session.programmers_id = programmers[0]._id;
                    req.session.programmers_user = programmers[0].user;
                    res.redirect('/');
             
                }else{
                    res.redirect('/');
                }
    
                
            }
        });
    }
    exports.close = function(req, res){
        req.session.programmers_id ="";
        req.session.programmers_user = null ;
        res.redirect('/app');
    
    }
    