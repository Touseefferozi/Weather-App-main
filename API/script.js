const countries = [
  "canada", "usa", "australia", "germany", "france", "india", "japan", "china", "brazil", "south-africa",
  "italy", "spain", "mexico", "argentina", "nigeria", "russia", "uk", "south-korea", "indonesia", "turkey",
  "pakistan", "dubai", "saudi-arabia", "afghanistan", "albania", "algeria", "andorra", "angola", "antigua-and-barbuda", "armenia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bhutan", "bolivia", "bosnia-and-herzegovina", "botswana", "brunei", "bulgaria", "burkina-faso", "burundi", "cabo-verde", "cambodia", "cameroon", "central-african-republic", "chad", "chile", "colombia", "comoros", "congo-brazzaville", "congo-kinshasa", "costa-rica", "croatia", "cuba", "cyprus", "czech-republic", "denmark", "djibouti", "dominica", "dominican-republic", "ecuador", "egypt", "el-salvador", "equatorial-guinea", "eritrea", "estonia", "eswatini", "ethiopia", "fiji", "finland", "gabon", "gambia", "georgia", "ghana", "greece", "grenada", "guatemala", "guinea", "guinea-bissau", "guyana", "haiti", "honduras", "hungary", "iceland", "iran", "iraq", "ireland", "israel", "jamaica", "jordan", "kazakhstan", "kenya", "kiribati", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "marshall-islands", "mauritania", "mauritius", "micronesia", "moldova", "monaco", "mongolia", "montenegro", "morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands", "new-zealand", "nicaragua", "north-macedonia", "norway", "oman", "palau", "panama", "papua-new-guinea", "paraguay", "peru", "philippines", "poland", "portugal", "qatar", "romania", "rwanda", "saint-kitts-and-nevis", "saint-lucia", "saint-vincent-and-the-grenadines", "samoa", "san-marino", "sao-tome-and-principe", "senegal", "serbia", "seychelles", "sierra-leone", "singapore", "slovakia", "slovenia", "solomon-islands", "somalia", "sri-lanka", "sudan", "suriname", "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand", "timor-leste", "togo", "tonga", "trinidad-and-tobago", "tunisia", "turkmenistan", "tuvalu", "uganda", "ukraine", "uruguay", "uzbekistan", "vanuatu", "vatican-city", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"
  /* Add the rest of the 99 countries here */
];

// Get the timezone for a country (simple map for demo)
const countryTimezones = {
  canada: 'America/Toronto',
  usa: 'America/New_York',
  australia: 'Australia/Sydney',
  germany: 'Europe/Berlin',
  france: 'Europe/Paris',
  india: 'Asia/Kolkata',
  japan: 'Asia/Tokyo',
  china: 'Asia/Shanghai',
  brazil: 'America/Sao_Paulo',
  'south-africa': 'Africa/Johannesburg',
  italy: 'Europe/Rome',
  spain: 'Europe/Madrid',
  mexico: 'America/Mexico_City',
  argentina: 'America/Argentina/Buenos_Aires',
  nigeria: 'Africa/Lagos',
  russia: 'Europe/Moscow',
  uk: 'Europe/London',
  'south-korea': 'Asia/Seoul',
  indonesia: 'Asia/Jakarta',
  turkey: 'Europe/Istanbul',
  pakistan: 'Asia/Karachi',          // Added timezone for Pakistan
  dubai: 'Asia/Dubai',               // Added timezone for Dubai
  'saudi-arabia': 'Asia/Riyadh'      // Added timezone for Saudi Arabia
  // Add more timezones as needed
};

// Function to fetch and display weather data
const getWeatherData = (country) => {
  const apiKey = "AIzaSyDevTWkIiWTzHeul2RS8Ac26TXEgTWkzNw";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      createWeatherCard(country, data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

// Function to create weather cards dynamically
const createWeatherCard = (country, weather) => {
  const weatherContainer = document.getElementById("weatherContainer");

  // Get the current time for the country
  const timezone = countryTimezones[country];
  const currentTime = luxon.DateTime.now().setZone(timezone).toLocaleString(luxon.DateTime.TIME_WITH_SECONDS);

  const card = document.createElement("div");
  card.classList.add("weather-card");
  card.setAttribute("data-aos", "fade-up");

  card.innerHTML = `
    <h2>${country.charAt(0).toUpperCase() + country.slice(1)}</h2>
    <p><strong>Temperature:</strong> ${weather.temperature || "--"}</p>
    <p><strong>Description:</strong> ${weather.description || "No data available"}</p>
    <p><strong>Wind Speed:</strong> ${weather.wind || "--"}</p>
    <p><strong>Current Time:</strong> ${currentTime || "--"}</p>
  `;

  weatherContainer.appendChild(card);
};

// Function to debounce user input for better performance
const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

// Function to search through the country cards
const searchCountry = () => {
  const searchValue = document.getElementById("searchBar").value.toLowerCase();
  const cards = document.querySelectorAll(".weather-card");

  cards.forEach((card) => {
    const countryName = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = countryName.includes(searchValue) ? "block" : "none";
  });
};

// Event listener for the search bar (debounced)
document.getElementById("searchBar").addEventListener("input", debounce(searchCountry, 300));

// Fetch weather data for all countries
countries.forEach((country) => {
  getWeatherData(country);
});
