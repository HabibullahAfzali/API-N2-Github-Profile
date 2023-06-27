const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const searchInput = document.getElementById("search");
const main = document.getElementById("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  if (searchTerm) {
    getUserProfile(searchTerm);
    searchInput.value = "";
  }
});

async function getUserProfile(username) {
  try {
    const response = await fetch(APIURL + username);
    if (response.ok) {
      const data = await response.json();
      displayUserProfile(data);
    } else {
      displayError("User not exist with this Username");
    }
  } catch (error) {
    displayError("An error occurred. Please try again.");
  }
}

function displayUserProfile(user) {
  main.innerHTML = `
    <div class="card">
      <img class="avatar" src="${user.avatar_url}" alt="User Avatar">
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
          <li>
            <strong>Followers:</strong>
            <span>${user.followers}</span>
          </li>
          <li>
            <strong>Following:</strong>
            <span>${user.following}</span>
          </li>
          <li>
            <strong>Public Repos:</strong>
            <span>${user.public_repos}</span>
          </li>
        </ul>
        <a class="repo" href="${user.html_url}" target="_blank">View Profile</a>
      </div>
    </div>
  `;
}

function displayError(message) {
  main.innerHTML = `<p class="error">${message}</p>`;
}
