import { connectMongoDB } from "@/lib/db";
import Product from "@/models/product";
import { getSortOrder } from "@/utils/getSortOrder";
import { NextResponse } from "next/server";
import randomstring from "randomstring";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = Object.fromEntries(searchParams);

  const page = parseInt(search?.page) || 1;
  const limit = 4;
  const category = search?.category;
  const searchProduct = search?.searchProduct;
  const tags = searchParams.getAll("tags");
  const minPrice = parseFloat(search?.minPrice);
  const maxPrice = parseFloat(search?.maxPrice);
  const inStock = search?.inStock === "true";
  const discounted = search?.discounted === "true";
  const shipping = search?.shipping === "true";
  const featured = search?.featured === "true";
  const sortBy = search?.sortBy;
  const sortOrder = await getSortOrder(search?.sortOrder, sortBy);

  let query = {};

  if (searchProduct) {
    query.$or = [
      { name: { $regex: new RegExp(searchProduct, "i") } },
      { category: { $regex: new RegExp(searchProduct, "i") } },
      { tags: { $in: tags.map((tag) => new RegExp(tag, "i")) } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (!isNaN(minPrice)) {
    query.price = { $gte: minPrice };
  } else if (!isNaN(maxPrice)) {
    query.price = { $lte: maxPrice };
  }

  if (inStock) {
    query.inStock = inStock;
  }

  if (featured) {
    query.featured = featured;
  }

  if (shipping) {
    query.shipping = shipping;
  }

  if (discounted) {
    query.discount = { $gt: 0 };
  }

  const skip = (page - 1) * limit;

  await connectMongoDB();

  const products = await Product.find(query)
    .sort(sortBy ? { [sortBy]: parseInt(sortOrder) } : {})
    .skip(skip)
    .limit(limit);

  return NextResponse.json(products);
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
    // Check if the product with the given code already exists
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
