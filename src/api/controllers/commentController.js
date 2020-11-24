const Comment = require('../models/commentModel');

exports.list_all_comments = (req, res) => {
    Comment.find({post_id: req.params.post_id}, (error, comments) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comments)
        }
    })
}

exports.create_a_comment = (req, res) => {
    let new_comment = new Comment(req.body);
    new_comment.post_id = req.params.post_id;

    new_comment.save((error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(201);
            res.json(comment)
        }
    })
}

exports.get_a_comment = (req, res) =>  {
    Comment.findById(req.params.comment_id, (error, comment) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
          }
          else{
            res.status(200);
            res.json(comment)
          }
    })
}

exports.update_a_comment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body, {new: true}, (error, comment) => {
        if(error)   {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})
        }
        else{
            res.status(200);
            res.json(comment)
        }
    })
}

exports.delete_a_comment = (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (error, comment) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})
      }
      else{
        res.status(200);
        res.json({message: "Commentaire supprimé"});
      }
    })
  }
  