const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const autocompleteDropdown = document.getElementById('autocompleteDropdown');

let data = [];

function selectSuggestion(suggestion) {
    const currentValue = searchInput.value;
    const words = currentValue.split(' ');
    
    words[words.length - 1] = suggestion;
    searchInput.value = words.join(' ');
    
    autocompleteDropdown.style.display = 'none';
}

function displaySuggestions(suggestions) {
    autocompleteDropdown.innerHTML = '';
    if (suggestions.length === 0) {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = 'Nothing found';
        autocompleteDropdown.appendChild(suggestionDiv);
    }
    
    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = suggestion;
        suggestionDiv.onclick = () => selectSuggestion(suggestion);
        autocompleteDropdown.appendChild(suggestionDiv);
    });

    autocompleteDropdown.style.display = 'block';
}

async function fetchSuggestions(query) {
    try {
        const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/autocomplete?query=${query}&api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043`);
        const textResponse = await response.text();
        const suggestions = JSON.parse(textResponse);
        displaySuggestions(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}


searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    
    if (query.length > 0) {
        fetchSuggestions(query);
    } else {
        autocompleteDropdown.style.display = 'none';
    }
});

document.addEventListener('click', (event) => {
    if (!autocompleteDropdown.contains(event.target) && event.target !== searchInput) {
        autocompleteDropdown.style.display = 'none';
    }
});


searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();

    if (query.length == 0 && sortOption != "") {
        data = [];
        sortItems(sortOption);
        return;
    } else if (query.length == 0) {
        data = [];
        renderItems(items);
        return;
    }

    try {
        const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/goods?query=${encodeURIComponent(query)}&api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043`);
        data = await response.json();

        if (data.length === 0) {
            itemsContainer.innerHTML = '<p>Нет товаров, соответствующих вашему запросу.</p>';
        } else if (sortOption != "") {
            sortItems(sortOption);
        } else {
            renderItems(data);
        }

    } catch {
        console.error("Error fetching search results:", error);
        itemsContainer.innerHTML = '<p>There was an error fetching the search results. Please try again later.</p>';
    }
});