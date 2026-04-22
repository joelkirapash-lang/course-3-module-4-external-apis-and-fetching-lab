// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');
const stateInput = document.getElementById('state-input');
const fetchButton = document.getElementById('fetch-alerts');

fetchButton.addEventListener('click', () => {
  const state = stateInput.value.trim();
  if (state) {
    fetchAlerts(state);
  }
});

async function fetchAlerts(stateAbbr) {
  try {
    const response = await fetch(weatherApi + stateAbbr);
    const data = await response.json();

    alertsDisplay.innerHTML = '';
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
    stateInput.value = '';

    const title = document.createElement('h2'); 
    title.textContent = ${data.title}: ${data.features.length};
    alertsDisplay.appendChild(title); 

    data.features.forEach(feature => {
      const p = document.createElement('p');
      p.textContent = feature.properties.headline;
      alertsDisplay.appendChild(p);
    });

  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}
