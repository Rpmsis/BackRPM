const jwt = require('jsonwebtoken');
let verificarAuth = (req, res, next) => {
  let token =  req.get('token');
    jwt.verify(token,'RPM', (err, decoded) => {
    if(err) {
      if(err.name == 'TokenExpiredError'){
        return res.status(403).json({
          mensaje: err.name
        })
      }else{
        return res.status(404).json({
          mensaje: 'Error de token',
          err
        })
      }
    }
    var decoded = jwt.decode(token, {complete: true});
    req.usuario = decoded.payload;
    next();    
  });

}

module.exports = verificarAuth;