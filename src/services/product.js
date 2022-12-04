const Product = require('../models/Product');

exports.getAll = function (query, skipIndex, limit) {
    const options = {
        name: new RegExp(query, 'i'),
    };

    return Product.find(options).skip(skipIndex).limit(limit);
};

exports.getAllProductsCount = async function (searchQuery) {
    return Product.find({
        name: { $regex: searchQuery, $options: 'i' },
    }).countDocuments();
};

exports.getAllByCategory = function (category) {
    return Product.find({ category }).limit(5);
};

exports.getById = async function (productId) {
    return await Product.findById(productId).populate('creator').lean();
};

exports.getLatest = async function () {
    return await Product.find({}).sort('-createdAt').limit(5).lean();
};

exports.create = async function (productData) {
    const product = new Product({
        name: productData.name,
        brand: productData.brand,
        quantity: productData.quantity,
        price: productData.price,
        discount: productData.discount,
        description: productData.description,
        image: productData.image,
        colors: productData.colors,
        sizes: productData.sizes,
        category: productData.category,
        creator: productData.creator,
    });

    await product.save();
    return product;
};

exports.updateById = async function (productId, productData) {
    const product = await Product.findById(productId);

    product.name = productData.name;
    product.quantity = productData.quantity;
    product.price = productData.price;
    product.description = productData.description;
    product.image = productData.image;
    product.colors = productData.colors;
    product.sizes = productData.sizes;
    product.category = productData.category;
    product.brand = productData.brand;
    product.discount = productData.discount;

    await product.save();
    return product;
};

exports.deleteById = async function (productId) {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    return deletedProduct;
};

exports.like = async function (productId, userId) {
    const product = await Product.findById(productId);

    if (product.likes.find((user) => user == userId)) {
        throw new Error('User already like this product!');
    }

    product.likes.push(userId);
    await product.save();

    return product;
};

exports.dislike = async function (productId, userId) {
    const product = await Product.findById(productId);

    product.likes.pull(userId);
    await product.save();
    return product;
};
