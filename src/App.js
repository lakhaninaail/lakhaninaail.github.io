import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutMe from "./components/Pages/AboutMe";
import Writing from "./components/Pages/Writing";
import Navbar from "./components/Navbar/Navbar";
import NBAGames from "./components/Pages/NBAGames";
import "./App.css";

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<AboutMe />} />
					<Route path="/aboutme" element={<AboutMe />} />
					<Route path="/writing" element={<Writing />} />
					<Route path="/nba-games" element={<NBAGames />} />
				</Routes>
				<></>
			</div>
		</Router>
	);
}

export default App;
