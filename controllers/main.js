const test = async (req, res, next) => {
    return res.status(200).json({
        success: true,
    });
};

module.exports = {
    test,
};