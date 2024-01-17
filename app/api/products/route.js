import { connectMongoDB } from "@/lib/db";
import Product from "@/models/product";
import { getSortOrder } from "@/utils/getSortOrder";
import { redis } from "@/utils/redis";
import { NextResponse } from "next/server";
import randomstring from "randomstring";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = Object.fromEntries(searchParams);
  const currentPage = parseInt(search?.page) || 1;
  const perPage = parseInt(search?.perPage) || 12;
  const searchProduct = search?.searchProduct || "";
  const minPrice = parseFloat(search?.minPrice);
  const maxPrice = parseFloat(search?.maxPrice);
  const category = search?.category;
  const categoriesArray = category ? category.split(",") : [];
  const sortBy = search?.sortBy;
  const sortOrder = getSortOrder(search?.sortOrder, sortBy);
  let query = {};
  if (searchProduct) {
    query.$or = [
      { name: { $regex: new RegExp(searchProduct, "i") } },
      { category: { $regex: new RegExp(searchProduct, "i") } },
    ];
  }

  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (!isNaN(minPrice)) {
    query.price = { $gte: minPrice };
  } else if (!isNaN(maxPrice)) {
    query.price = { $lte: maxPrice };
  }

  if (search?.inStock) {
    query.inStock = search?.inStock;
  }

  if (search?.shipping) {
    query.shipping = search?.shipping;
  }

  if (categoriesArray.length > 0) {
    query.category = { $in: categoriesArray };
  }

  const skip = (currentPage - 1) * perPage;

  await connectMongoDB();
  const selectedFields = {
    productCode: 1,
    name: 1,
    price: 1,
    imageUrl: 1,
    description: 1,
    inStock: 1,
    discount: 1,
    shipping: 1,
  };

  const products = await Product.find(query, selectedFields)
    .sort(sortBy ? sortOrder : {})
    .skip(skip)
    .limit(perPage);

  const productsLength = (await Product.find(query)).length;
  const totalPages = Math.ceil(productsLength / perPage);

  const allProducts = {
    products,
    totalPages,
    currentPage,
    length: productsLength,
  };
  return NextResponse.json(allProducts);
}

export async function POST(req) {
  try {
    const {
      name,
      description,
      price,
      category,
      sizes,
      colors,
      shipping,
      onSale,
      priceDrop,
      weight,
      dimensions,
      imageUrl,
      inStock,
      tags,
      featured,
      discount,
      variants,
    } = await req.json();

    const productCode = "techhub-" + randomstring.generate();
    await connectMongoDB();

    const existingProduct = await Product.findOne({ productCode });
    if (existingProduct) {
      return NextResponse.json({
        message: "Product with the given code already exists.",
        success: false,
        status: 400,
      });
    }

    await Product.create({
      productCode,
      name,
      description,
      price,
      category,
      sizes,
      colors,
      shipping,
      onSale,
      priceDrop,
      weight,
      dimensions,
      imageUrl,
      inStock,
      tags,
      featured,
      discount,
      variants,
    });

    return NextResponse.json({
      message: "Product Added.",
      success: true,
      status: 201,
      data: productCode,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while creating the product.",
      success: false,
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const {
      name,
      description,
      price,
      category,
      sizes,
      colors,
      shipping,
      onSale,
      priceDrop,
      weight,
      dimensions,
      imageUrl,
      inStock,
      tags,
      featured,
      discount,
      variants,
      productCode,
    } = await req.json();

    await connectMongoDB();

    const existingProduct = await Product.findOne({ productCode });

    if (!existingProduct) {
      return NextResponse.json({
        message: "Product with the given code doesn't exist.",
        success: false,
        status: 404,
      });
    }

    await Product.updateOne(
      {
        productCode,
      },
      {
        $set: {
          name,
          description,
          price,
          category,
          sizes,
          colors,
          shipping,
          onSale,
          priceDrop,
          weight,
          dimensions,
          imageUrl,
          inStock,
          tags,
          featured,
          discount,
          variants,
        },
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Product Updated.",
      success: true,
      status: 200,
      data: productCode,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while updating the product.",
      success: false,
      status: 500,
    });
  }
}
