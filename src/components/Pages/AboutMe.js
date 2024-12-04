import React from "react";
import "../../App.css";

function AboutMe() {
	return (
		<section>
			<h1>Hey, I'm Naail.</h1>
			<p>I'm an MIT-trained computer scientist.</p>
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
				.
			</p>
		</section>
	);
}

export default AboutMe;
