let sortOption = "";


function renderItems(sortedItems) {
    itemsContainer.innerHTML = '';

    sortedItems.forEach(item => {
        createItem(item);
    });
}

function sortItems(sortOption) {
    let sortedItems = [...items];

    if (data.length == 0) {
        switch (sortOption) {
        case 'price-asc':
            sortedItems.sort((a, b) => a.actual_price - b.actual_price);
            break;
        case 'price-desc':
            sortedItems.sort((a, b) => b.actual_price - a.actual_price);
            break;
        case 'rating-desc':
            sortedItems.sort((a, b) => b.rating - a.rating);
            break;

        case 'rating-asc':
            sortedItems.sort((a, b) => a.rating - b.rating);
            break;
        default:
            break;
        }
        renderItems(sortedItems);
    } else {
        switch (sortOption) {
        case 'price-asc':
            data.sort((a, b) => a.actual_price - b.actual_price);
            break;
        case 'price-desc':
            data.sort((a, b) => b.actual_price - a.actual_price);
            break;
        case 'rating-desc':
            data.sort((a, b) => b.rating - a.rating);
            break;

        case 'rating-asc':
            data.sort((a, b) => a.rating - b.rating);
            break;
        default:
            break;
        }
        renderItems(data);
    }
}


document.getElementById('sortDropdown').addEventListener('change', (e) => {
    sortOption = e.target.value;
    sortItems(sortOption);
});
