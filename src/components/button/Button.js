import React, { Fragment } from "react";

const Button = ({onClick, className, bgColor = "primary", children}) => {
    let bgClassName = 'bg-primary';
    switch (bgColor) {
        case "primary":
            bgClassName = 'bg-primary'
            break;
        case "secondary":
            bgClassName = 'bg-secondary'
            break;
        default:
            
            break;
    }
  return (
    <Fragment>
      <button
        onClick={onClick}
        className={`w-full py-3 px-6 rounded-lg capitalize ${bgClassName} mt-auto ${className || ""}`}
      >
        {children}
      </button>
    </Fragment>
  );
};

export default Button;
