module.exports = (server) => {
    const userController = require('../controllers/userController');
    const jwtMiddleware = require('../middleware/jwtMiddleware');

    server.route('/users/register')
        .post(userController.create_an_user);

    server.route('/users/login') // req.params.user_id
        .post(jwtMiddleware.verify_token, userController.login_an_user);
}