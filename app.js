// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAtookFQv8j-0690fwDTMV1OcYzJohSP2v-3kXnA8EQAqQVAsXC_fqmTxjKpV0wxiwGSKAXqSDPp2ZaSqyj1Z01lhqc3AjPvqGH6rM2BH1eh2RqJKGmAtcELebMUYsJl_JPQDwbAJOJaxDUWM46f7WJ8tmjGKZ6Ss0iyZPAOummJbxQVyY2NVvtlxqPHt4-nxGO7dPcPbUXySkoyNwNNWT552220Htnsdj9d-r5wufsRybdgie-BLfjBTnYpUqIOxJA4dR-EfHuMNKmAA';

// Mock function to check if the artist will be performing in Philadelphia
function isArtistInPhiladelphia(artistName) {
  // In a real-world scenario, you'd use an API like Ticketmaster, Songkick, or similar to check events.
  const artistsInPhiladelphia = ['Artist 1', 'Artist 3'];  // Example artist names performing in Philadelphia
  return artistsInPhiladelphia.includes(artistName);
}

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

async function getTopArtists() {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/artists?time_range=long_term&limit=5', 'GET'
  )).items;
}

// Function to display top artists in the DOM
async function displayTopArtists() {
  const topArtists = await getTopArtists();
  const artistsList = document.getElementById('top-artists-list');
  
  topArtists.forEach(artist => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${artist.images[0]?.url}" alt="${artist.name}">
      <div class="artist-info">
        <span>${artist.name}</span>
      </div>
    `;
    
    // Check if the artist is performing in Philadelphia and add notification icon
    if (isArtistInPhiladelphia(artist.name)) {
      const notificationIcon = document.createElement('div');
      notificationIcon.className = 'notification';
      notificationIcon.innerHTML = '!';
      listItem.appendChild(notificationIcon);
    }

    artistsList.appendChild(listItem);
  });
}

// Call the function to display the artists when the page loads
displayTopArtists();
