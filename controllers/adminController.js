var User = require('../models/user');


module.exports.register = (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        userType: req.body.type
    });

    user.save();

    res.json(true);

}

module.exports.login = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.json({ 'success': false, 'err': err });
        } else {
            if (!user) {
                res.json({ 'success': false, 'err': "Email doesn't exist" });
            } else {
                const valiDatePassword = user.comparePassword(req.body.password);
                if (user.comparePassword(req.body.password)) {
                    res.json({ 'success': true, 'msg': 'Login Successfully' });
                } else {
                    res.json({ 'success': false, 'err': "Invalid Password" })

                }
            }
        }
    })

}