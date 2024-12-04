import React, { useState, useEffect } from "react";

function NBAGames() {
	const [gamesData, setGamesData] = useState({});
	const [impliedGamesData, setImpliedGamesData] = useState({});

	useEffect(() => {
		fetch("/gameData.json")
			.then((response) => response.json())
			.then((data) => setGamesData(data));
	}, []);

	useEffect(() => {
		fetch("/impliedData.json")
			.then((response) => response.json())
			.then((implied_data) => setImpliedGamesData(implied_data));
	}, []);

	const gameStyle = {
		marginBottom: "30px",
	};

	const gridContainerStyle = {
		display: "flex",
		gap: "40px",
		position: "relative",
		marginLeft: "50px",
		marginBottom: "25px",
		alignItems: "flex-end", // This will align items at the bottom
	};

	const gridStyle = {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		height: "100%",
	};

	const tableStyle = {
		borderCollapse: "collapse",
		marginTop: "10px",
	};

	const cellStyle = {
		border: "1px solid black",
		padding: "5px",
		textAlign: "center",
		width: "50px",
		height: "30px",
	};

	const axisLabelStyle = {
		padding: "5px",
		textAlign: "center",
		width: "50px",
		height: "30px",
	};

	const yAxisLabelStyle = {
		position: "absolute",
		left: "-50px",
		top: "50%",
		transform: "translateY(-50%) rotate(-90deg)",
		whiteSpace: "nowrap",
	};

	const xAxisLabelStyle = {
		position: "absolute",
		bottom: "-25px",
		width: "100%",
		textAlign: "center",
	};

	const bookmakerLabelStyle = {
		textAlign: "center",
		marginBottom: "5px",
		fontWeight: "bold",
		height: "auto",
	};

	return (
		<div>
			<h1>12/3 NBA Games</h1>
			<ul style={{ listStyleType: "none", padding: 0 }}>
				{Object.entries(gamesData).map(([game, data]) => (
					<li key={game} style={gameStyle}>
						{game}
						<div style={gridContainerStyle}>
							<div style={gridStyle}>
								<div style={bookmakerLabelStyle}>DK Spread Odds</div>
								<table style={tableStyle}>
									<tbody>
										<tr>
											<td style={axisLabelStyle}>Home</td>
											<td style={cellStyle}>{data.DK.spread_odds[0]}</td>
											<td style={cellStyle}>
												{impliedGamesData[game].home_win}
											</td>
										</tr>
										<tr>
											<td style={axisLabelStyle}>Away</td>
											<td style={cellStyle}>{data.DK.spread_odds[1]}</td>
											<td style={cellStyle}>
												{impliedGamesData[game].away_win}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div style={gridStyle}>
								<div style={bookmakerLabelStyle}>DK SGP</div>
								<table style={tableStyle}>
									<tbody>
										<tr>
											<td style={cellStyle}></td>
											<td style={cellStyle}>{"O " + data.DK.over_under}</td>
											<td style={cellStyle}>{"U " + data.DK.over_under}</td>
										</tr>
										<tr>
											<td style={cellStyle}>{"+" + data.DK.spread}</td>
											<td style={cellStyle}>{data.DK.dk_sgp[0]}</td>
											<td style={cellStyle}>{data.DK.dk_sgp[1]}</td>
										</tr>
										<tr>
											<td style={cellStyle}>{"-" + data.DK.spread}</td>
											<td style={cellStyle}>{data.DK.dk_sgp[2]}</td>
											<td style={cellStyle}>{data.DK.dk_sgp[3]}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div style={gridStyle}>
								<div style={bookmakerLabelStyle}>MGM SGP</div>
								<table style={tableStyle}>
									<tbody>
										<tr>
											<td style={cellStyle}></td>
											<td style={cellStyle}>{"O " + data.MGM.over_under}</td>
											<td style={cellStyle}>{"U " + data.MGM.over_under}</td>
										</tr>
										<tr>
											<td style={cellStyle}>{"+" + data.MGM.spread}</td>
											<td style={cellStyle}>{data.MGM.mgm_sgp[0]}</td>
											<td style={cellStyle}>{data.MGM.mgm_sgp[1]}</td>
										</tr>
										<tr>
											<td style={cellStyle}>{"-" + data.MGM.spread}</td>
											<td style={cellStyle}>{data.MGM.mgm_sgp[2]}</td>
											<td style={cellStyle}>{data.MGM.mgm_sgp[3]}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div style={gridStyle}>
								<div style={bookmakerLabelStyle}>MGM Bets</div>
								<table style={tableStyle}>
									<tbody>
										<tr>
											<td style={cellStyle}></td>
											<td style={cellStyle}>{"O " + data.MGM.over_under}</td>
											<td style={cellStyle}>{"U " + data.MGM.over_under}</td>
										</tr>
										<tr>
											<td style={cellStyle}>{"+" + data.MGM.spread}</td>
											<td style={cellStyle}>
												{impliedGamesData[game].kelly[0]}
											</td>
											<td style={cellStyle}>
												{impliedGamesData[game].kelly[1]}
											</td>
										</tr>
										<tr>
											<td style={cellStyle}>{"-" + data.MGM.spread}</td>
											<td style={cellStyle}>
												{impliedGamesData[game].kelly[2]}
											</td>
											<td style={cellStyle}>
												{impliedGamesData[game].kelly[3]}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default NBAGames;
