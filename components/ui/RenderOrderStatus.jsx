import { Chip } from "@nextui-org/react";
import { DotIcon } from "lucide-react";

const statusMappings = {
  shipped: { variant: "flat", color: "primary" },
  pending: { variant: "flat", color: "warning" },
  cancelled: { variant: "flat", color: "secondary" },
  delivered: { variant: "flat", color: "success" },
  processing: { variant: "flat", color: "primary" },
};

const RenderOrderStatus = ({ orderStatus }) => {
  const { variant, color } = statusMappings[orderStatus] || {};

  if (!variant || !color) {
    return null;
  }

  return (
    <Chip
      startContent={<DotIcon size={18} />}
      variant={variant}
      color={color}
      className="capitalize text-md"
    >
      {orderStatus}
    </Chip>
  );
};

export default RenderOrderStatus;
