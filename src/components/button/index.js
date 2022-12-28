import React from "react";
import "./style.css";

export default function Button({
	className = "btn btn-primary",
	fullwidth = false,
	...props
}) {
	return (
		<button
			id="addToBasket"
			style={{ width: fullwidth ? "100%" : "auto", border: "2px solid #FFB75E", 
			background: "#fc466b",  
			background: "-webkit-linear-gradient(to right, #fc466b, #3f5efb)",  
			background: "linear-gradient(to right, #fc466b, #000000)"
			   }}
			onClick={props.onClick}
			className={className}
			{...props}
		>
			{props.children}
		</button>
	);
}


