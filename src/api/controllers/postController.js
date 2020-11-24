const Post = require('../models/postModel');
const https = require('https');
var fonctions = require('../fonctions/fonctions.js');


exports.list_all_posts = (req, res) => {
    Post.find({}, (error, posts) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(posts)
        }
    })
}

exports.create_a_post = (req, res) => {
    let new_post = new Post(req.body);
    if(!new_post.content)   {
        fonctions.getcontent('https://loripsum.net/api/plaintext', new_post, res);
    } else {
        new_post.save((error, post) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Erreur serveur."
                })
            } else {
                res.status(201);
                res.json(post)
            }
        })
    }
}

exports.get_a_post = (req, res) =>  {
    Post.findById(req.params.post_id, (error, post) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
          }
          else{
            res.status(200);
            res.json(post)
          }
    })
}

exports.update_a_post = (req, res) => {
    Post.findByIdAndUpdate(req.params.post_id, req.body, {new: true}, (error, post) => {
        if(error)   {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
        }
        else{
            res.status(200);
            res.json(post)
        }
    })
}

exports.delete_a_post = (req, res) => {
    Post.findByIdAndDelete(req.params.post_id, (error, post) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
      }
      else{
        res.status(200);
        res.json({message: "Article supprimé"});
      }
    })
  }
  