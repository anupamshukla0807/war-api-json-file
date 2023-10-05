const axios = require('axios');

async function fetchNobelPrizes() {
    try {
    const response = await axios.get('http://api.nobelprize.org/v1/prize.json');
    const prizes = response.data.prizes || [];
    // Filter entries from year 2000 to 2019
    const filteredPrizes = prizes.filter((prize) => {
        const year = Number(prize.year);
        return year >= 2000 && year <= 2019;
    });

    // Filter entries with the 'Chemistry' category
    const chemistryPrizes = filteredPrizes.filter((prize) => {
      return prize.category === 'chemistry'; // 'che' is the code for 'Chemistry'
    });

    // Extract names of people who won Chemistry prizes
    const chemistryWinners = chemistryPrizes.map((prize) => {
        return prize.laureates.map((laureate) => {
        return laureate.firstname + ' ' + laureate.surname;
        });
    }).flat();

    return chemistryWinners;
    } catch (error) {
    throw new Error('Error fetching Nobel Prize data: ' + error.message);
    }
}

// Call the function and handle the result
fetchNobelPrizes()
  .then((chemistryWinners) => {
    console.log('People who won Nobel Prizes in Chemistry from 2000 to 2019:');
    console.log(chemistryWinners);
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = fetchNobelPrizes;
