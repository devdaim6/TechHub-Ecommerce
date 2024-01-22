"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Link from "next/link";

const ProductCancelModal = ({
  handleCancelOrder,
  orderCode,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {" "}
      <Modal
        className="bg-neutral rounded-lg p-4"
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-error">
                Are You Sure To Cancel This Order ?
              </ModalHeader>
              <ModalBody>
                <p>
                  Canceling your order means the selected items will not be
                  processed or shipped. Before canceling, please consider the
                  following:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>
                    Review your order details to ensure all important
                    information is correct.
                  </li>
                  <li>
                    Confirm your decision to cancel, as this action cannot be
                    undone.
                  </li>
                  <li className="font-semibold text-primary">
                    If order details haven&apos;t updated, try refreshing the
                    page.
                  </li>
                  <li>
                    For any questions or concerns,{" "}
                    <Link href="/contact">contact us</Link>.
                  </li>
                </ul>
                <p>
                  If you&apos;re certain about canceling, click &ldquo;Cancel
                  Order&ldquo; below. Otherwise, click outside this dialog or
                  the &ldquo;Keep Order&ldquo; button to maintain your order.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  className="px-2 py-1 rounded-lg"
                  variant="flat"
                  onPress={() => setIsOpen(false)}
                >
                  Keep Order
                </Button>
                <Button
                  color="primary"
                  className="px-2 py-1 rounded-lg"
                  variant="flat"
                  onPress={async () => handleCancelOrder(orderCode)}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
    </>
  );
};

export default ProductCancelModal;
