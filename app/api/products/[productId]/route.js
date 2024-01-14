import { connectMongoDB } from "@/lib/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  const { productId } = params;
  const field = searchParams.get("field");
  const product = await Product.findById(productId);
  const { reviews, ...productDetails } = product.toObject();
  if (field == "reviews") {
    return NextResponse.json(reviews);
  }
  if (field == product?.code) {
    return NextResponse.json(productDetails);
  }
  return NextResponse.json({ error: "Field must be specified" });
}

export async function PATCH(req) {
  try {
    const {
      code,
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

    await connectMongoDB();

    // Check if the product with the given code already exists
    const existingProduct = await Product.findOne({ code });

    if (existingProduct) {
      return NextResponse.json({
        message: "Product with the given code already exists.",
        success: false,
        status: 400,
      });
    }

    const newProduct = await Product.create({
      code,
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
      data: newProduct,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while creating the product.",
      success: false,
      status: 500,
    });
  }
}
