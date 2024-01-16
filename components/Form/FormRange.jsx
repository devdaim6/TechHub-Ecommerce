import { Slider } from "@nextui-org/react";
import React from "react";

const FormRange = ({ name, value, onChange }) => {
  return (
    <Slider
      label="Price Range"
      step={60}
      name={name}
      maxValue={10020}
      minValue={0}
      value={value}
      onChange={onChange}
      showTooltip={true}
      showSteps={true}
      showOutline={true}
      disableThumbScale={true}
      formatOptions={{ style: "currency", currency: "INR" }}
      className="max-w-md"
      tooltipValueFormatOptions={{
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }}
      classNames={{
        base: "max-w-md",
        filler: "bg-accent",
        labelWrapper: "mb-2",
        label: "font-medium text-default-700 text-medium",
        value: "font-medium text-default-500 text-small",
        thumb: [
          "transition-size",
          "bg-accent",
          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
          "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
        ],
        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
      }}
      tooltipProps={{
        offset: 10,
        classNames: {
          base: [
            "before:bg-accent",
          ],
          content: ["py-2 shadow-xl", "text-white ","bg-accent"],
        },
      }}
    />
  );
};

export default FormRange;
