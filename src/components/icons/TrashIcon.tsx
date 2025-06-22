import React from "react";

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 33 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9 29.5C8.175 29.5 7.469 29.2065 6.882 28.6195C6.295 28.0325 6.001 27.326 6 26.5V7H4.5V4H12V2.5H21V4H28.5V7H27V26.5C27 27.325 26.7065 28.0315 26.1195 28.6195C25.5325 29.2075 24.826 29.501 24 29.5H9ZM12 23.5H15V10H12V23.5ZM18 23.5H21V10H18V23.5Z"
      style={{ strokeWidth: 0 }}
    />
  </svg>
);

export default TrashIcon;
