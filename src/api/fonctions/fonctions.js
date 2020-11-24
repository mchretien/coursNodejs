const https = require('https');

module.exports = {
    getcontent: function (url, objet, res) {
        https.get(url, (resp) => {
            let data = '';
    
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
    
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                objet.content = data;
                objet.save((error, post) => {
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
                console.log(objet);
            });
    
            }).on("error", (err) => {
            console.log("Error: " + err.message);
            });
    }
  };
