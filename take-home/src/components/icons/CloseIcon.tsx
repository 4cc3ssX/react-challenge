import * as React from "react";
import { IIconProps } from ".";

const CloseIcon = (props: IIconProps) => {
  const { size, width = 9, height = 9, color = "#ffffff" } = props;
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m7.524 8.927-2.95-2.951L1.548 9 0 7.451l3.024-3.024-2.95-2.951L1.475.073l2.95 2.951L7.452 0 9 1.549 5.976 4.573l2.95 2.951-1.402 1.403Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;
