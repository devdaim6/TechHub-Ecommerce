import { useSelector } from "react-redux";

const CartTotals = () => {
  const { cartTotal, shipping, orderTotal } = useSelector(
    (state) => state.cartState
  );

  return (
    <>
      {cartTotal > 0 && (
        <>
          {" "}
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="flex justify-between text-xs border-b border-neutral pb-2">
                <span>Subtotal</span>
                <span className="font-medium">{cartTotal?.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-xs border-b border-neutral pb-2">
                <span>Shipping {shipping?.toFixed(2)==0.00 && "(Free Shipping)"}</span>
                <span className="font-medium">{shipping?.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-xs border-b border-neutral pb-2">
                <span>Tax</span>
                <span className="font-medium">{0?.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-sm mt-4 pb-2">
                <span>Order Total</span>
                <span className="font-medium">&#8377;{orderTotal?.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CartTotals;
