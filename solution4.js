const axios = require('axios');
const apiURL = "https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json";

// Function to fetch data from the API
async function fetchDataFromAPI(apiURL) {
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from the API: ${error}`);
  }
}

// Function to calculate the sum of statuses for all airports
function calculateSumOfStatuses(data, status) {
  return data.reduce((sum, airport) => sum + airport[status], 0);
}

// Function to process data and export it
async function processAndExportData() {
  try {
    const data = await fetchDataFromAPI(apiURL);

    // Filter the flights based on their status
    const filteredFlights = data.map((airport) => ({
      airport: airport["Airport Name"],
      cancelled: airport["Statistics"]["Flights"]["Cancelled"],
      delayed: airport["Statistics"]["Flights"]["Delayed"],
      diverted: airport["Statistics"]["Flights"]["Diverted"],
      onTime: airport["Statistics"]["Flights"]["On Time"],
    }));

    // Calculate the sum of statuses for all airports
    const totalCancelled = calculateSumOfStatuses(filteredFlights, "cancelled");
    const totalDelayed = calculateSumOfStatuses(filteredFlights, "delayed");
    const totalDiverted = calculateSumOfStatuses(filteredFlights, "diverted");
    const totalOnTime = calculateSumOfStatuses(filteredFlights, "onTime");

    // Check if the sum of statuses is equal to the total value
    const totalValue = totalCancelled + totalDelayed + totalDiverted + totalOnTime;
    
    const result = {
      "TotalCancelledFlights": totalCancelled,
      "TotalDelayedFlights": totalDelayed,
      "TotalDivertedFlights": totalDiverted,
      "TotalOnTimeFlights": totalOnTime,
      "totalValue": totalValue
    };
    return result; // Return the result
  } catch (error) {
    console.log(error); // Log any errors
    throw error;
  }
}
// Call the processing function and export its 

processAndExportData().then((data) => {
  console.log("Air Flight Ticket Price total Value");
  console.log(data);
});
module.exports =processAndExportData;
