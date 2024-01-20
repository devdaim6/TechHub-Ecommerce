"use client";
import { addItem } from "@/features/cart/cartSlice";
import {
  setPrice,
  setProductColor,
  setProductSize,
  setQuantity,
} from "@/features/products/singleProduct/singleProductSlice";
import { useProducts } from "@/hooks/useProduct";
import { handleAddToWishlist } from "@/utils/pushToWishlist";
import { generateAmountOptions, getUserFromLocalStorage } from "@/utils/util";
import { BookmarkPlus } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ScreenLoading from "../ui/ScreenLoading";
import StarRating from "../ui/StarRating";
import Reviews from "./Reviews";

const SingleProduct = ({ name, productId, productCode }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct);
  const { data, isLoading } = useProducts(productCode, productId);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const BreadCromStart = decodeURIComponent(name);

  const handleQuantity = (e) => {
    dispatch(setQuantity(parseInt(e.target.value)));
  };
  const handleColorChange = (color) => {
    dispatch(setProductColor(color));
  };
  const handlePriceChange = (price) => {
    dispatch(setPrice(price));
  };
  const handleVariantChange = (price, size, color) => {
    dispatch(setProductColor(color));
    dispatch(setProductSize(size));
    dispatch(setPrice(price));
  };
  const handleSizeChange = (size) => {
    dispatch(setProductSize(size));
  };
  const addToCart = () => {
    dispatch(
      addItem({
        productId: productId,
        quantity: product?.quantity,
        price: product?.price || data?.price,
        productColor: product?.productColor || data?.colors[0],
        productSize: product?.size || data?.sizes[0],
        name: data?.name,
        imageUrl: product?.imageUrl || data?.imageUrl,
      })
    );
  };

  return (
    <>
      {isLoading ? (
        <ScreenLoading />
      ) : (
        <>
          {" "}
          <section className="p-3">
            <div className="text-md breadcrumbs">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="#" className="truncate text-ellipsis">
                    {decodeURIComponent(
                      `${BreadCromStart.slice(
                        0,
                        BreadCromStart.indexOf(",")
                      )}- ${productCode}-${productId}`
                    )}
                  </Link>
                </li>
              </ul>
            </div>
            <div className=" mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
              <div>
                <img
                  src={data?.imageUrl}
                  alt={data?.name}
                  className="w-96 h-96 object-cover rounded-lg lg:w-full"
                />
                <div className="flex p-2 justify-between items-center">
                  <div className="flex px-2 items-center">
                    <p className="text-md font-semibold">
                      {data?.averageRating.toFixed(1)}
                    </p>
                    <StarRating rating={data?.averageRating.toFixed(1)} />
                    <p className="text-sm text-primary ml-1 cursor-pointer">
                      <Link href="#reviews">
                        (
                        {data?.reviewsCount === 1
                          ? `${data?.reviewsCount} review`
                          : `${data?.reviewsCount} reviews`}{" "}
                        )
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="wishlist cursor-pointer">
                    <button
                      onClick={async () => {
                        const res = await handleAddToWishlist(
                          productId,
                          getUserFromLocalStorage()?.id
                        );
                        if (res.success) toast.success(res.message);
                        else toast.error(res.message);
                      }}
                    >
                      <BookmarkPlus />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="capitalize text-3xl font-bold  ">
                  {data?.name}
                </h1>

                <p className="text-accent text-xl">
                  <span className="text-error ">
                    {data?.discount !== 0 && (
                      <span>
                        {"-"}
                        {data?.discount}
                        {"% "}
                      </span>
                    )}
                  </span>
                  &#8377;
                  {data?.price}&nbsp;{" "}
                </p>
                {data?.discount !== 0 && (
                  <p className="text-neutral-content/70 ">
                    M.R.P. &#8377;
                    <span style={{ textDecoration: "line-through" }}>
                      {(data?.price / (1 - data?.discount / 100)).toFixed(2)}
                    </span>
                  </p>
                )}
                <p className="mt-6 leading-8  ">{data?.description}</p>
                <div className="mt-6">
                  <h4 className="text-md font-medium tracking-wider capitalize">
                    Variants
                  </h4>
                  <div className="mt-2 grid grid-cols-3 gap-4 px-2">
                    {data?.variants.map((variant) => (
                      <button
                        key={variant._id}
                        type="button"
                        className={`border rounded-lg lg:flex lg:justify-between py-2 px-1 ${
                          variant.price == product?.price &&
                          variant.size == product?.size
                            ? "border-accent"
                            : "border-base-300"
                        }`}
                        onClick={() => {
                          handleVariantChange(
                            variant.price,
                            variant.size,
                            variant.color
                          );
                        }}
                      >
                        <p
                          className={`badge border-neutral`}
                          style={{ backgroundColor: variant?.color }}
                        ></p>
                        <p className="text-sm">
                          {data?.category.some(
                            (item) => item === "mugs" || item === "pens"
                          )
                            ? null
                            : variant?.size}
                        </p>
                        <p className="text-sm">&#8377;{variant.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor="amount">
                    <h4 className="text-md font-medium -tracking-wider capitalize">
                      Quantity
                    </h4>
                  </label>
                  <select
                    className="select select-accent select-bordered select-md"
                    id="quantity"
                    value={product?.quantity}
                    onChange={handleQuantity}
                  >
                    {generateAmountOptions(20)}
                  </select>
                </div>

                <div className="mt-5">
                  <button className="btn btn-accent btn-md" onClick={addToCart}>
                    Add to bag
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section ref={ref} className="mt-8 p-4 bg-neutral-light">
            <h2 className="text-2xl font-semibold mb-4">
              {" "}
              <div class="divider">Product Details</div>
            </h2>

            <ul className="list-disc pl-6">
              <li>Material: {data?.material}</li>
              {data?.category.some(
                (item) =>
                  item === "mugs" || item === "ceramic" || item === "bottle"
              ) ? (
                <li>
                  Capacity:{" "}
                  {data?.sizes.map((size) => (
                    <span>{size}</span>
                  ))}
                </li>
              ) : null}
              <li>Weight : {data?.weight}kg</li>
              <li>
                Color options:{" "}
                {data?.colors?.map((color) => (
                  <span>{color} ,</span>
                ))}
              </li>
              <li>
                Dimensions: {data?.dimensions?.length} x{" "}
                {data?.dimensions?.width} x {data?.dimensions?.height}cm (L x W
                x H)
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                {" "}
                <div class="divider">Product Description</div>
              </h3>
              <p className="text-neutral-content">
                {data?.detailedDescription}
              </p>
            </div>
            <div id="reviews" className="py-4 my-2">
              {inView && (
                <Reviews
                  productId={productId}
                  averageRating={data?.averageRating}
                  totalRating={data?.totalRating}
                  starRatings={data?.starRatings}
                  reviewsCount={data?.reviewsCount}
                />
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SingleProduct;
