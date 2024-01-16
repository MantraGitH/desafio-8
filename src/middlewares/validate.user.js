function validateUser(req, res, next) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    const { email, password } = req.body;
  
    if (!emailRegex.test(email)) {
      return res.status(400).send('el formato de correo electrónico no corresponde.');
    }
  
    if (!passwordRegex.test(password)) {
      return res.status(400).send('La contraseña tiene que tener una determinada cantidad de caracteres, un número y una letra mayúscula.');
    }
  
    next();
  }
  
  export default validateUser;


