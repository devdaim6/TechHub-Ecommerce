import { connectMongoDB } from "@/lib/db";
import Product from "@/models/product";
import User from "@/models/user";
import { NextResponse } from "next/server";
import randomstring from "randomstring";
export async function POST(req) {
  const { productId, rating, comment, image, title, userId, name } =
    await req.json();
  const reviewCode = randomstring.generate();
  try {
    await connectMongoDB();

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product) {
      return NextResponse.json({
        message: "Product not found.",
        success: false,
        status: 404,
      });
    }

    if (!user) {
      return NextResponse.json({
        message: "User not found.",
        success: false,
        status: 404,
      });
    }
    // Add the review to the product
    product.reviews.push({
      user: userId,
      rating,
      name: name || user?.name,
      comment,
      image,
      title,
      isReview: comment || title ? true : false,
      reviewCode,
    });

    user.reviews.push({
      productId,
      rating,
      name: user?.name,
      comment,
      image,
      title,
      isReview: comment || title ? true : false,
      reviewCode,
    });
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    product.averageRating = totalRating / product.reviews.length;
    const starRatings =
      product.starRatings || Array(5).fill({ star: 0, rating: 0 });

    const starIndex = rating - 1;

    if (!starRatings[starIndex]) {
      starRatings[starIndex] = { star: rating, rating: 0 };
    }
    starRatings[starIndex].ratings += 1;
    product.starRatings = starRatings;

    if (!comment || !title) {
      product.totalRating = totalRating;
    } else {
      product.totalRating = totalRating;

      product.reviewsCount += +1;
    }
    await user.save();
    await product.save();

    const addedReview = product.reviews.find(
      (review) => review.reviewCode === reviewCode
    );

    return NextResponse.json({
      message: "Review added successfully.",
      success: true,
      status: 201,
      data: addedReview?.reviewCode || null,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while adding the review.",
      success: false,
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { productId, reviewCode, userId } = await req.json();

    await connectMongoDB();

    // Find the product by ID
    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    if (!product) {
      return NextResponse.json({
        message: "Product not found.",
        success: false,
        status: 404,
      });
    }
    if (!user) {
      return NextResponse.json({
        message: "User not found.",
        success: false,
        status: 404,
      });
    }

    const reviewIndex = product.reviews.findIndex(
      (review) => review.reviewCode === reviewCode
    );
    const reviewIndexForUser = user.reviews.findIndex(
      (review) => review.reviewCode === reviewCode
    );

    if (reviewIndex === -1) {
      return NextResponse.json({
        message: "Review not found.",
        success: false,
        status: 404,
      });
    }
    if (reviewIndexForUser === -1) {
      return NextResponse.json({
        message: "Review not found in Users Review List.",
        success: false,
        status: 404,
      });
    }

    user.reviews.splice(reviewIndexForUser, 1);
    const deletedReview = product.reviews.splice(reviewIndex, 1)[0];
    if (product.reviews.length > 0) {
      const totalRating = product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      product.averageRating = totalRating / product.reviews.length;
    } else {
      product.averageRating = 0;
    }

    if (product.reviews.length === 0) {
      product.totalRating = 0;
      product.reviewsCount = 0;
    } else {
      const newTotalRating = product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      product.totalRating = newTotalRating;
      product.reviewsCount = product.reviews.filter(
        (review) => review.isReview
      ).length;
    }

    // Update star ratings
    const starIndex = deletedReview.rating - 1;
    if (product.starRatings && product.starRatings[starIndex]) {
      product.starRatings[starIndex].ratings -= 1;
    }
    await user.save();
    await product.save();

    return NextResponse.json({
      message: "Review deleted successfully.",
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while deleting the review.",
      success: false,
      status: 500,
    });
  }
}
