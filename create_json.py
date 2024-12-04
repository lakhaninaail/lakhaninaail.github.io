import json
import os

# Define the path to public folder
public_path = os.path.join('public', 'gameData.json')
public_path_new = os.path.join('public', 'impliedData.json')

# Sample game data structure
game_data = {
    "Detroit Pistons @ Boston Celtics": {
        "DK": {
            "spread": 14,
            "spread_odds": [-110, -110],
            "over_under": 221,
            "over_under_odds": [-110, -110],
            "ML": [700, -1110],
            "dk_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        },
        "MGM": {
            "spread": 13.5,
            "spread_odds": [-105, -115],
            "over_under": 221.5,
            "over_under_odds": [-105, -115],
            "mgm_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        }
    },
    "Indiana Pacers @ Brooklyn Nets": {
        "DK": {
            "spread": -1.5,
            "spread_odds": [-115, -105],
            "over_under": 227,
            "over_under_odds": [-110, -110],
            "ML": [-130, 110],
            "dk_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        },
        "MGM": {
            "spread": -1.5,
            "spread_odds": [-110, -110],
            "over_under": 227.5,
            "over_under_odds": [-110, -110],
            "mgm_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        }
    },
    "Los Angeles Lakers @ Miami Heat": {
        "DK": {
            "spread": 1,
            "spread_odds": [-110, -110],
            "over_under": 219.5,
            "over_under_odds": [-110, -110],
            "ML": [-105, -115],
            "dk_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        },
        "MGM": {
            "spread": 1.5,
            "spread_odds": [-110, -110],
            "over_under": 219.5,
            "over_under_odds": [-110, -110],
            "mgm_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        }
    },
    "Orlando Magic @ Philadelphia 76ers": {
        "DK": {
            "spread": -2.5,
            "spread_odds": [-115, -105],
            "over_under": 205,
            "over_under_odds": [-110, -110],
            "ML": [-135, 114],
            "dk_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        },
        "MGM": {
            "spread": -2.5,
            "spread_odds": [-110, -110],
            "over_under": 204.5,
            "over_under_odds": [-115, -105],
            "mgm_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        }
    },
    "Atlanta Hawks @ Milwaukee Bucks": {
        "DK": {
            "spread": 4,
            "spread_odds": [-110, -110],
            "over_under": 237,
            "over_under_odds": [-110, -110],
            "ML": [145, -175],
            "dk_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        },
        "MGM": {
            "spread": 3.5,
            "spread_odds": [-105, -115],
            "over_under": 236.5,
            "over_under_odds": [-115, -105],
            "mgm_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        }
    },
    "Minnesota @ LA": {
        "DK": {
            "spread": -3.5,
            "spread_odds": [-110, -110],
            "over_under": 209.5,
            "over_under_odds": [-110, -110],
            "ML": [-162, 136],
            "dk_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        },
        "MGM": {
            "spread": -3.5,
            "spread_odds": [-110, -110],
            "over_under": 209.5,
            "over_under_odds": [-110, -110],
            "mgm_sgp": [100, 100, 100, 100] # home & over, home & under, away & over, away & under
        }
    }
}

def odds_to_probability(odds):
    if odds < 0:
        return abs(odds) / (abs(odds) + 100)
    else:
        return 100 / (odds + 100)
    
def sgp_implied(sgp_odds):
    dkprice_to_probabilities = [odds_to_probability(_) for _ in sgp_odds]
    # implied - home covers
    home_over = dkprice_to_probabilities[0] / (dkprice_to_probabilities[0] + dkprice_to_probabilities[1])
    home_under = dkprice_to_probabilities[1] / (dkprice_to_probabilities[0] + dkprice_to_probabilities[1])
    # implied - away covers
    away_over = dkprice_to_probabilities[2] / (dkprice_to_probabilities[2] + dkprice_to_probabilities[3])
    away_under = dkprice_to_probabilities[3] / (dkprice_to_probabilities[2] + dkprice_to_probabilities[3])
    return [home_over, home_under, away_over, away_under]

def spread_implied(spread_odds):
    return [odds_to_probability(spread_odds[0]) / (odds_to_probability(spread_odds[0]) + odds_to_probability(spread_odds[1])), odds_to_probability(spread_odds[1]) / (odds_to_probability(spread_odds[0]) + odds_to_probability(spread_odds[1]))]

def sgp_fairs(sgp_odds, spread_odds):
    spread_implied_prob = spread_implied(spread_odds)
    sgp_implied_prob = sgp_implied(sgp_odds)
    fairs = [spread_implied_prob[0] * sgp_implied_prob[0] / (sgp_implied_prob[0] + sgp_implied_prob[1]), spread_implied_prob[0] * sgp_implied_prob[1] / (sgp_implied_prob[0] + sgp_implied_prob[1]), spread_implied_prob[1] * sgp_implied_prob[2] / (sgp_implied_prob[2] + sgp_implied_prob[3]), spread_implied_prob[1] * sgp_implied_prob[3] / (sgp_implied_prob[2] + sgp_implied_prob[3])]
    return fairs

def edge(sgp_fairs, mgm_sgp):
    edge = []
    mgm_sgp_prob = [odds_to_probability(_) for _ in mgm_sgp]
    for i in range(4):
        edge.append(sgp_fairs[i] / mgm_sgp_prob[i] - 1)
    return edge

def kelly(sgp_fairs, mgm_sgp):
    mgm_sgp_prob = [odds_to_probability(_) for _ in mgm_sgp]
    sizing = []
    for i in range(4):
        sizing.append((sgp_fairs[i] - mgm_sgp_prob[i]) / (1 - mgm_sgp_prob[i]))
    return sizing

new_game_data = {}

for game_name, game_details in game_data.items():
    new_game_data[game_name] = {
        "home_win": spread_implied(game_details["DK"]["spread_odds"])[0],
        "away_win": spread_implied(game_details["DK"]["spread_odds"])[1],
        "sgp_implied": sgp_implied(game_details["DK"]["dk_sgp"]),
        "sgp_fairs": sgp_fairs(game_details["DK"]["dk_sgp"], game_details["DK"]["spread_odds"]),
        "edge": edge(sgp_fairs(game_details["DK"]["dk_sgp"], game_details["DK"]["spread_odds"]), game_details["MGM"]["mgm_sgp"]),
        "kelly": kelly(sgp_fairs(game_details["DK"]["dk_sgp"], game_details["DK"]["spread_odds"]), game_details["MGM"]["mgm_sgp"])
    }

# Write to the public folder
with open(public_path, 'w') as f:
    json.dump(game_data, f, indent=4)

with open(public_path_new, 'w') as f:
    json.dump(new_game_data, f, indent=4)
