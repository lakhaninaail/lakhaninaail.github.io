import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
	return (
		<nav class="navbar">
			<div class="title">
				<h3 class="navbar-header">Naail Lakhani</h3>
			</div>
			<div class="navbar-items">
				<Link to="/aboutme">About</Link>
				<Link to="/writing">Writing</Link>
			</div>
		</nav>
	);
}

export default Navbar;
