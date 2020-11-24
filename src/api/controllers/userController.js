const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const isemail = require('isemail');


exports.create_an_user = async (req, res) => {
    if(isemail.validate(req.body.email)) {
        const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(req.body.password, salt);
    
    const user =  new User({
        email: req.body.email,
        password: hashpassword
      })
      try{
        const userSignup = await user.save()
        const payload = {
            user: {
              id: userSignup.id
            }
          };
          jwt.sign({email: user.email, role: user}, process.env.JWT_SECRET, {expiresIn: '30 days'}, (err, token) =>
          {
            if(err){
              res.send(err)
            }
            res.status(200).json({
              token,
              userSignup
            })
          })
      }catch(err){
        res.send(400).send(err) 
      }
    } else {
        res.json({
            message: "L'email n'est pas valide."
        })
    }
    
}

exports.login_an_user =  async (req, res) => {
    User.findOne({email: req.body.email}, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Mot de passe ou email erroné.."
            })
        } else {
            if(bcrypt.compare(req.body.password, user.password)) {
                jwt.sign({email: user.email, role: user}, process.env.JWT_SECRET, {expiresIn: '30 days'}, (error, token) => {
                    if(error)   {
                        res.status(400);
                        console.log(error);
                        res.json({
                            message: "Mot de passe ou email erroné."
                        })
                    } else {
                        res.json({message: "Vous êtes connecté"});
                    }
                })                
            } else {
                res.status(400);
                console.log(error);
                res.json({message: "Mot de passe ou email erroné"})
            }
        }
    })
}