const API = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let citiesAndStates = [];

const fetchData = async () => {
    const data = await fetch(API);
    let result = await data.json();
    for (let i = 0; i < result.length; i++) {
        let city = result[i].city;
        let state = result[i].state;
        citiesAndStates.push({ city, state }); 
    }
    //console.log(citiesAndStates); // To verify the array content
};

const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
};

const showSuggestions = (input) => {
    const suggestionsContainer = document.getElementById('autocomplete-suggestions');
    suggestionsContainer.innerHTML = '';
    if (input.length === 0) return;

    const filteredSuggestions = citiesAndStates.filter(item => 
        item.city.toLowerCase().includes(input.toLowerCase()) || 
        item.state.toLowerCase().includes(input.toLowerCase())
    );

    filteredSuggestions.forEach(item => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('autocomplete-suggestion');
        suggestionElement.innerHTML = `${highlightMatch(item.city, input)}, ${highlightMatch(item.state, input)}`;
        suggestionsContainer.appendChild(suggestionElement);
    });
};

document.getElementById('autocomplete-input').addEventListener('input', (e) => {
    const input = e.target.value;
    showSuggestions(input);
});

fetchData();