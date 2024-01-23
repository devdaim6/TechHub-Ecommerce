import { connectMongoDB } from "@/lib/db";
import Product from "@/models/product";
import { redis } from "@/utils/redis";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  const { productId } = params;
  const field = searchParams.get("field");

  await connectMongoDB();
  if (field == "reviews") {
    const product = await Product.findOne({ _id: productId }).select("reviews");
    return NextResponse.json(product?.reviews);
  }

  const product = await Product.findOne({ _id: productId }).select("-reviews");
  if (field == product?.productCode) {
    return NextResponse.json(product);
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
