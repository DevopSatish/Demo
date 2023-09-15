const form = document.getElementById("myForm");

// Get the div where you want to display the data
const displayDiv = document.getElementById("displayData");

// Add an event listener to the form for form submission
form.addEventListener("submit", function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get form data
  const formData = new FormData(form);

  // Create an HTML table to display the form data
  let tableHtml = '<h2>Form Data:</h2><table class="table table-bordered">';
  formData.forEach(function (value, key) {
    tableHtml += `
                    <tr>
                        <td><strong>${key}:</strong></td>
                        <td>${value}</td>
                    </tr>
                `;
  });
  tableHtml += "</table>";

  // Set the table HTML to the displayDiv
  displayDiv.innerHTML = tableHtml;
});
