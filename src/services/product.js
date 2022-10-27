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

exports.create = async function (productData) {
    const phone = new Phone({
        model: productData.model,
        price: productData.price,
        released: productData.released,
        weigth: productData.weigth,
        os: productData.os,
        memory: productData.memory,
        displaySize: productData.displaySize,
        displayResolutions: productData.displayResolutions,
        cameraMP: productData.cameraMP,
        cameraVideo: productData.cameraVideo,
        ram: productData.ram,
        chipset: productData.chipset,
        batteryMAH: productData.batteryMAH,
        batteryType: productData.batteryType,
        image: productData.image,
        video: productData.video,
        creator: productData.creator,
        category: productData.category,
    });

    await phone.save();
    return phone;
};
