// https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/goods/{id}?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043
// https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043
selectedGoods = [];
let price = 0;
const priceDiv = document.getElementById('final-price-value');

const itemsContainer = document.getElementById('order-container');


async function calculatePrice() {
    price = 0;
    const ids = JSON.parse(localStorage.getItem('ids')) || [];
    if (ids.length === 0) {
        console.log('No IDs found in localStorage.');
        return;
    }

    for (const id of ids) {
        const card = document.querySelector(`[data-id="${id}"]`);
        price += parseInt(card.dataset.price, 10);
    }
    priceDiv.textContent = `${price}₽`;
};

function removeIdFromLocalStorage(item, card) {
    let ids = JSON.parse(localStorage.getItem('ids')) || [];
    ids = ids.filter(existingId => existingId !== item.id);
    localStorage.setItem('ids', JSON.stringify(ids));
    console.log(`ID ${item.id} removed from localStorage.`);
    card.remove();
    calculatePrice();
    if (ids.length == 0) {
        document.getElementById('none-chosen-div').style.display = 'block';
        document.getElementById('food-form').style.display = 'none';
    }
}

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
    button.textContent = 'Удалить';
    button.className = 'add-to-cart-btn';
    button.id = `add-${item.id}`;

    button.addEventListener('click', () => removeIdFromLocalStorage(item, card)); 


    imgDiv.appendChild(img);
    card.appendChild(imgDiv);
    card.appendChild(name);
    starsDiv.appendChild(starsP);
    card.appendChild(starsDiv);

    card.appendChild(priceDiv);
    card.appendChild(button);

    itemsContainer.appendChild(card);
}


async function loadFromLocalStorage() {
    const ids = JSON.parse(localStorage.getItem('ids')) || [];
    if (ids.length === 0) {
        document.getElementById('food-form').style.display = 'none';
        console.log('No IDs found in localStorage.');
        return;
    }
    document.getElementById('none-chosen-div').style.display = 'none';
    document.getElementById('food-form').style.display = 'block';
    for (const id of ids) {
        try {
            const response = await fetch(
                `https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/goods/${id}?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043`
            );
            const data = await response.json();
            selectedGoods.push(data);
        } catch (error) {
            console.error(`Error fetching data for ID ${id}:`, error);
        }
    }
    selectedGoods.forEach(item => {
        createItem(item);
    });
    calculatePrice();
};


document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
});