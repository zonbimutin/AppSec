const bcrypt = require("bcryptjs");

const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        res.status(200).json({
            sucess: true,
            hashedPwd,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
};