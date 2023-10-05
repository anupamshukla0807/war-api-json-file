const axios = require('axios');

async function fetchRepositoryData(searchQuery) {
  try {
    const apiUrl = `https://api.github.com/search/repositories?q=${searchQuery}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.items.length > 0) {
      const repository = data.items[0];
      const ownerUrl = repository.owner.url;
      const branchesUrl = `${repository.url}/branches`;

      // Fetch owner details and branch count concurrently using Promise.all
      const [ownerResponse, branchesResponse] = await Promise.all([
        axios.get(ownerUrl),
        axios.get(branchesUrl),
      ]);

      const ownerData = ownerResponse.data;
      const branchesCount = branchesResponse.data.length;

      // Create the desired output object
      const output = {
        name: repository.name,
        full_name: repository.full_name,
        private: repository.private,
        owner: {
          login: ownerData.login,
          name: ownerData.name,
          followersCount: ownerData.followers,
          followingCount: ownerData.following,
        },
        licenseName: repository.license ? repository.license.name : null,
        score: repository.score,
        numberOfBranch: branchesCount,
      };

      return output;
    } else {
      throw new Error("No matching repositories found.");
    }
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}

// Replace "YOUR_SEARCH_QUERY_HERE" with your desired search query
const searchQuery = "YOUR_SEARCH_QUERY_HERE";

// Call the function and handle the result
fetchRepositoryData(searchQuery)
  .then((result) => {
    console.log("show the repository data ")
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

module.exports=fetchRepositoryData;