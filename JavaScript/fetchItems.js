const api = "a8b02171-a483-48cd-9b9e-4f91c00e3043";

const allItemsURL = "https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/autocomplete?query=a&api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043";


const itemsContainer = document.getElementById('main-content-items-div');
let items = [];


function processIdsFromLocalStorage() {

    const ids = JSON.parse(localStorage.getItem('ids')) || [];


    if (ids.length === 0) {
        console.log('No IDs found in localStorage.');
        return;
    }
    ids.forEach(id => {
        console.log(`Processing ID: ${id}`);

    });
}


function removeIdFromLocalStorage(item, card) {
    let ids = JSON.parse(localStorage.getItem('ids')) || [];
    ids = ids.filter(existingId => existingId !== item.id);
    localStorage.setItem('ids', JSON.stringify(ids));
    console.log(`ID ${item.id} removed from localStorage.`);
    card.classList.remove('selected-card');
}


function selectItem(item, button, card) {
    
    let ids = JSON.parse(localStorage.getItem('ids')) || [];
    
    if (!ids.includes(item.id)) {
        ids.push(item.id);
        localStorage.setItem('ids', JSON.stringify(ids));
        console.log(`ID ${item.id} added to localStorage.`);
        button.textContent = 'Удалить';
        card.classList.add('selected-card');
        if (window.getComputedStyle(document.getElementById('notification-text')).display === 'none') {
            showMessage('Added to cart');
        } else {
            deleteMessage();
            setTimeout(() => {
                showMessage('Added to cart');
            }, 250);
        }

    } else {
        button.textContent = 'Добавить';
        removeIdFromLocalStorage(item, card);
        if (window.getComputedStyle(document.getElementById('notification-text')).display === 'none') {
            showMessage('Removed from cart');
        } else {
            deleteMessage();
            setTimeout(() => {
                showMessage('Removed from cart');
            }, 250);
        }
    }
};


function createItem(item) {
    const card = document.createElement('div');
    card.className = 'item';
    card.setAttribute('data-id', item.id);
    if (item.discount_price != null) {
        card.setAttribute('data-price', item.discount_price);
    } else {
        card.setAttribute('data-price', item.actual_price);
    }

    const imgDiv = document.createElement('div');
    imgDiv.className = 'item-image';

    const img = document.createElement('img');
    img.src = item.image_url;
    img.alt = item.name;

    const name = document.createElement('h3');
    name.textContent = item.name;
    name.className = 'item-name';

    const starsDiv = document.createElement('div');
    starsDiv.className = 'item-stars-div';

    const starsP = document.createElement('p');
    starsP.className = 'item-stars-p';
    starsP.textContent = item.rating;

    const starsImg = document.createElement('img');
    starsImg.className = 'item-stars-img';

    if (0 < item.rating < 0.3) {
        starsImg.src = "./images/stars_0.png";
    } else if (0.3 <= item.rating && item.rating < 0.7) {
        starsImg.src = "./images/stars_05.png";
    } else if (0.7 <= item.rating && item.rating < 1.3) {
        starsImg.src = "./images/stars_1.png";
    } else if (1.3 <= item.rating && item.rating < 1.7) {
        starsImg.src = "./images/stars_15.png";
    } else if (1.7 <= item.rating && item.rating < 2.3) {
        starsImg.src = "./images/stars_2.png";
    } else if (2.3 <= item.rating && item.rating < 2.7) {
        starsImg.src = "./images/stars_25.png";
    } else if (2.7 <= item.rating && item.rating < 3.3) {
        starsImg.src = "./images/stars_3.png";
    } else if (3.3 <= item.rating && item.rating < 3.7) {
        starsImg.src = "./images/stars_35.png";
    } else if (3.7 <= item.rating && item.rating < 4.3) {
        starsImg.src = "./images/stars_4.png";
    } else if (4.3 <= item.rating && item.rating < 4.7) {
        starsImg.src = "./images/stars_45.png";
    } else {
        starsImg.src = "./images/stars_5.png";
    };

    const priceDiv = document.createElement('div');
    priceDiv.className = 'item-price-div';


    if (item.discount_price != null) {

        const actualPrice = document.createElement('p');
        actualPrice.className = 'item-price-discount';
        actualPrice.textContent = `${item.actual_price}₽`;

        const discountPrice = document.createElement('p');
        discountPrice.className = 'item-price';
        discountPrice.textContent = `${item.discount_price}₽`;

        const discount = document.createElement('p');
        discount.className = 'item-discount';
        let unformattedDiscount = ((item.actual_price - item.discount_price) / item.actual_price) * 100;
        let roundedDiscount = Math.round(unformattedDiscount);
        discount.textContent = `${1 - roundedDiscount}%`;

        priceDiv.appendChild(discountPrice);
        priceDiv.appendChild(actualPrice);
        priceDiv.appendChild(discount);
    } else {
        const actualPrice = document.createElement('p');
        actualPrice.className = 'item-price';
        actualPrice.textContent = `${item.actual_price}₽`;
    
        priceDiv.appendChild(actualPrice);
    };

    const button = document.createElement('button');
    button.setAttribute('data-button-id', item.id);
    button.textContent = 'Добавить';
    button.className = 'add-to-cart-btn';
    button.id = `add-${item.id}`;

    button.addEventListener('click', () => selectItem(item, button, card)); 


    imgDiv.appendChild(img);
    card.appendChild(imgDiv);
    card.appendChild(name);
    starsDiv.appendChild(starsP);
    starsDiv.appendChild(starsImg);
    card.appendChild(starsDiv);

    card.appendChild(priceDiv);
    card.appendChild(button);

    itemsContainer.appendChild(card);
}


function displayItems() { //toto nam loaduje itemy

    fetch('https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/goods?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showMessage(data.error);
            }
            // console.log(data.error);
            const sortedItems = data.sort((a, b) => {

                return a.name.localeCompare(b.name);
            });

            items = [...sortedItems];

            items.forEach(item => {
                createItem(item);
            });
        })
        .finally(() => {
            items.forEach(item => {
                const ids = JSON.parse(localStorage.getItem('ids')) || [];
                if (ids.includes(item.id)) {
                    const card = document.querySelector(`[data-id="${item.id}"]`);
                    const button = document.querySelector(`[data-button-id="${item.id}"]`);
                    card.classList.add('selected-card');
                    button.textContent = 'Удалить';
                }
            });
        });
}


document.addEventListener('DOMContentLoaded', () => {
    displayItems();
});