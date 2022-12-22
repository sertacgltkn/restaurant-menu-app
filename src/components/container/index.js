import React from "react";
import classes from "./style.module.css";

export default function Container(props) {
	return (
		<div style={{ background: "#ffc107"}} className={`container ${classes.appContainer}`}>{props.children}</div>
	);
}
