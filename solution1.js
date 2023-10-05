// Make an AJAX request to fetch the JSON data
async function listen() {
    const output = {};
    try {
        const jsonUrl = 'https://raw.githubusercontent.com/anupamshukla0807/war-api-json-file/battel-api/battels.json';
        const response = await fetch(jsonUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Iterate through the JSON data and find the desired battle
        let maxSize = 0;
        let newBattle = null;

        data.forEach(battle => {
            if (battle.defender_size && battle.defender_size.max > maxSize) {
                maxSize = battle.defender_size.max;
                newBattle = battle;
            }
        });

        if (newBattle) {
            output.data = desireOutput(newBattle);
        }
    } catch (error) {
        console.log("Fetch error:", error);
        throw error;
    }

    return output;
}

function desireOutput(new_battle) {
    const result = {
        'most-active': {
            'attacker_king': new_battle.attacker_king,
            'defender_king': new_battle.defender_king,
            'region': new_battle.region,
            'name': new_battle.battle_name,
            'location': new_battle.location
        },
        'attacker_outcome': {
            'win': 10,
            'loss': 5
        },
        'battle_type': [new_battle.battle_type].join(','),
        'defender_size': {
            'avg': new_battle.defender_size.average,
            'min': new_battle.defender_size.min,
            'max': new_battle.defender_size.max
        }
    };
    console.log("battle-war-Formate")
    console.log(result);
    return result;
}

module.exports = listen;
