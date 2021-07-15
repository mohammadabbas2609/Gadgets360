import asyncHandler from "../middlewares/asyncHandler.js";
import ProductModel from "../models/productModel.js";

// @desc - Fetch all Product
// @route - GET /api/products
// @access - Public
const getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  let query = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await ProductModel.countDocuments({ ...query });
  const products = await ProductModel.find({ ...query })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getFilteredProducts = asyncHandler(async (req, res) => {
  let { rating, price, brand, category } = req.query;
  brand === "Select Brand" ? (brand = "") : brand;
  console.log();
  category === "Select Category" ? (category = "") : category;
  let query = {
    brand: {
      $regex: brand,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  };

  if (price) {
    query.price = {
      $lte: price,
    };
  }

  if (rating) {
    query.rating = {
      $gte: rating,
    };
  }

  console.log(query);

  const products = await ProductModel.find({ ...query });
  if (!products) {
    res.status(404);
    throw new Error("No products Found");
  }

  res.status(200).json(products);
});

// @desc - Fetch Single Product with Id
// @route - GET /api/products/:id
// @access - Public
const getProductDetail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// Admin Roles
// @desc - Delete Product
// @route - DELETE /api/products/:id
// @access - Private/Admin
const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  if (product) {
    await ProductModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc - Create Product
// @route - POST /api/products
// @access - Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.create({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  res.status(200).json(product);
});

// @desc - Update Product
// @route - PUT /api/products/:id
// @access - Private/Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  const { name, price, description, countInStock, image, brand, category } =
    req.body;
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  } else {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        countInStock,
        image,
        brand,
        category,
      },
      { new: true, runValidators: true }
    );

    res.json(200).json(updatedProduct);
  }
});

// @desc - Create a new Review
// @route - POST /api/products/:id/review
// @access - Private
const reviewProduct = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product Not Found");
  } else {
    const alreadyReviwed = product.reviews.find(r => {
      return r.user.toString() === req.user._id.toString();
    });
    if (alreadyReviwed) {
      res.status(403);
      throw new Error("Cannot review twice");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();

      res.status(201).json({ message: "Review Added" });
    }
  }
});

// @desc - Get top rated product
// @route -GET /api/products/toprated
// @access - PUBLIC
const getTopRatedProd = asyncHandler(async (req, res, next) => {
  const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductDetail,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
  getTopRatedProd,
  getFilteredProducts,
};
