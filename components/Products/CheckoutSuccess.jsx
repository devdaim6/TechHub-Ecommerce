import { clearCart } from "@/features/cart/cartSlice";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box ">
          <h3 className="text-accent  text-xl flex justify-center">
            <CheckIcon size={50} />
          </h3>
          <p className="py-4 font-bold text-center text-accent text-accent">
            Order Confirmed!
          </p>
          <div className="modal-action flex justify-center">
            <form method="dialog">
              <Link href="/orders">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="btn btn-accent btn-block"
                >
                  Continue
                </button>
              </Link>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CheckoutSuccess;
