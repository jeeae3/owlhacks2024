
//
document.addEventListener('DOMContentLoaded', function () {
    // Path to your CSV file
    const csvFilePath = 'concerts.csv';

    // Fetch the CSV file
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            // Parse CSV data using PapaParse
            Papa.parse(data, {
                header: true,  // First row is the header
                complete: function(results) {
                    // Get the parsed data (array of objects)
                    const concerts = results.data;
                    displayConcerts(concerts);
                }
            });
        })
        .catch(error => console.error('Error fetching CSV:', error));

    // Function to generate and display all concert blocks
    function displayConcerts(concerts) {
        const container = document.getElementById('concerts-container');

        concerts.forEach(concert => {
            // Create a block for each concert
            const concertBlock = document.createElement('div');
            concertBlock.classList.add('concert-block', concert.genre, concert.featured, 'filterDiv', 'concert');

            // Add the genre as a data attribute (for filtering purposes)
            //concertBlock.setAttribute('data-genre', concert.genre);

            // Add the concert data to the block (excluding genre)
            concertBlock.innerHTML = `
                <h3>${concert.artist}</h3>
                <p><strong>Venue:</strong> ${concert.venue}</p>
                <p><strong>Date:</strong> ${concert.date}</p>
            `;

            // Append the block to the container
            container.appendChild(concertBlock);
        });
    }
});

//FILTER BUTTONS SRC: https://www.w3schools.com/howto/howto_js_filter_elements.asp

window.onload = function() {
  document.getElementById("default").click();
};

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

//parallax
document.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;

    const contents = document.querySelectorAll('.content');
    
    contents.forEach(content => {
        const offset = content.getBoundingClientRect().top; // Get the offset of the content
        const windowHeight = window.innerHeight;

        // Calculate opacity based on scroll position
        const opacity = Math.max(0, Math.min(1, 1 - (offset / windowHeight)));
        
        // Apply the opacity to the content
        content.style.opacity = opacity;
        content.style.transform = `translateY(${scrollPosition * 0.1}px)`; // Optional: adds subtle movement
    });
});