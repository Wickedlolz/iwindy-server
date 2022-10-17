const Phone = require('../models/Phone');

exports.getAll = function () {
    return Phone.find({});
};

exports.getAllByCategory = function (category) {
    return Phone.find({ category });
};

exports.getById = async function (phoneId) {
    return await Phone.findById(phoneId).lean();
};
