// Variables to keep track of the current page and number of items per page
let currentPage = 1;
const itemsPerPage = 5; // Display 5 items at a time
let allDataLoaded = false; // Flag to check if all data is loaded

// Function to fetch and display items
function loadItems() {
  // If all data is already loaded, stop loading more
  if (allDataLoaded) {
    return;
  }

  // Show the loading indicator
  document.getElementById("loading").style.display = "block";

  // Simulate an API request (replace with a real API endpoint)
  setTimeout(() => {
    // Fetch data from the JSON file (you can replace this with an API call)
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        // Calculate the start and end indexes for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Get the items to display on the current page
        const itemsToDisplay = data.slice(startIndex, endIndex);

        // Render the items on the page
        const resultsContainer = document.getElementById("results");
        itemsToDisplay.forEach((item) => {
          const row = document.createElement("tr");
          const idCell = document.createElement("th");
          const nameCell = document.createElement("td");

          idCell.textContent = item.id;
          nameCell.textContent = item.first_name;

          row.appendChild(idCell);
          row.appendChild(nameCell);
          resultsContainer.appendChild(row);
        });

        // Increment the current page
        currentPage++;

        // If all data is loaded, set the flag to true and hide the table header
        if (endIndex >= data.length) {
          allDataLoaded = true;
          document.getElementById("table-header").style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      })
      .finally(() => {
        // Hide the loading indicator
        document.getElementById("loading").style.display = "none";
      });
  }, 5000); // Simulated delay (5 seconds)
}

// Event listener to load more items when the user reaches the bottom of the page
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (scrolled >= scrollable) {
    loadItems();
  }
});

// Initial load of items
loadItems();
