import React from "react";
import "../../App.css";

function AboutMe() {
	return (
		<section>
			<h1>Hey, I'm Naail.</h1>
			<p>
				I'm an MIT-trained computer scientist interested in game theory, web
				development, and AI.
			</p>
			<p>
				In the past, I've engineered data pipelines at{" "}
				<a href="https://www.twosigma.com/" class="hyperlink">
					Two Sigma
				</a>
				; researched, developed, and tested prediction models at{" "}
				<a href="https://sig.com/" class="hyperlink">
					SIG
				</a>
				; and built internal tools for options trading at{" "}
				<a href="https://www.imc.com/us/" class="hyperlink">
					IMC
				</a>
				.
			</p>
			<p>
				I'm an avid poker player and ex-president of the{" "}
				<a href="https://poker.mit.edu/" class="hyperlink">
					MIT Poker Club
				</a>
				. I helped lead the first ever women's only poker tournament in
				Cambridge, Queen's Full House, and was an instuctor for 15.S50, a poker
				theory course taken by 100+ MIT students over IAP.
			</p>
			<p>
				Now, I'm working on creating an elo-based poker matchmaking platform.
			</p>
		</section>
	);
}

export default AboutMe;
