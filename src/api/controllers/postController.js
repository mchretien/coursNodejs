const Post = require('../models/postModel');
const https = require('https');



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
        https.get('https://loripsum.net/api/plaintext', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            new_post.content = data;
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
            console.log(new_post);
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
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
  