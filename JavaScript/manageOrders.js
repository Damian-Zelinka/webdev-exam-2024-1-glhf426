const mainDiv = document.getElementById('main-div');
let ordersData = {};
let dishesData = {};
let price = 0;

async function calculatePrice(array) {
    price = 0;
    const ids = array;
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

async function loadAllOrders() {

    const ordersResponse = await fetch('https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043');
    ordersData = await ordersResponse.json();

    const dishesResponse = await fetch('https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/goods?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043');
    dishesData = await dishesResponse.json();

    let counter = 1;

    for (const order of ordersData) {
            
        // let dishNames = [];
        // let price = 0;


        // let dishes = '';
        // dishNames.forEach((dish) => {
        //     dishes += `${dish}, `;
        // });
        // dishes = dishes.substring(0, dishes.length - 2);
        

        // ///////////// take care of time variable
        // const createdAt = order.created_at;
        // const date = new Date(createdAt);

        // const day = String(date.getDate()).padStart(2, '0');
        // const month = String(date.getMonth() + 1).padStart(2, '0');
        // const year = date.getFullYear();
        // const hours = String(date.getHours()).padStart(2, '0');
        // const minutes = String(date.getMinutes()).padStart(2, '0');

        // const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;


        ///////////// creating each order element and inserting it

        calculatePrice(order.good_ids);


        const orderDiv = document.createElement('div');
        const orderNumber = document.createElement('p');
        const orderDate = document.createElement('p');
        const orderContent = document.createElement('p');
        const orderPrice = document.createElement('p');
        const orderTime = document.createElement('p');
        const orderAction = document.createElement('div');
        const span = document.createElement('span');

        const eye = document.createElement('img');
        eye.className = 'bootstrap-icon';
        eye.id = 'view-btn';
        eye.src = "./images/eye.svg";
        eye.setAttribute('data-order', counter);
        eye.setAttribute('data-price', price);
        eye.addEventListener('click', (event) => createViewAlert(event));

        const pen = document.createElement('img');
        pen.id = 'edit-btn';
        pen.className = 'bootstrap-icon';
        pen.src = "./images/pencil-square.svg";
        pen.setAttribute('data-order', counter);
        pen.setAttribute('data-price', price);

        const trash = document.createElement('img');
        trash.id = 'delete-btn';
        trash.className = 'bootstrap-icon';
        trash.src = "./images/trash3.svg";
        trash.setAttribute('data-order', counter);
        trash.setAttribute('data-price', price);
        trash.addEventListener('click', (event) => createDeleteAlert(event));


        span.className = 'line-span';

        orderDiv.className = 'orders-item';

        orderNumber.textContent = counter;
        orderNumber.className = 'orders-number';

        orderDate.textContent = order.delivery_date;
        orderDate.className = 'orders-date';

        // orderContent.textContent = dishes;
        orderContent.className = 'orders-content';

        orderPrice.textContent = `${price}ք`;
        orderPrice.className = 'orders-price';

        // if (order.delivery_type == 'now') {
        //     orderTime.textContent = 'Как можно скорее (с 07:00 до 23:00)';
        //     orderTime.className = 'orders-time';
        // } else {
        //     let deliveryTime = order.delivery_time;
        //     let updatedDeliveryTime = deliveryTime.substring(0, deliveryTime.length - 3);
        //     orderTime.textContent = updatedDeliveryTime;
        //     orderTime.className = 'orders-time';
        // }

        orderAction.className = 'icons-div';
        
        orderAction.appendChild(eye);
        orderAction.appendChild(pen);
        orderAction.appendChild(trash);

        orderDiv.id = `order-div-${counter}`;

        orderDiv.appendChild(orderNumber);
        orderDiv.appendChild(orderDate);
        // orderDiv.appendChild(orderContent);
        orderDiv.appendChild(orderPrice);
        // orderDiv.appendChild(orderTime);
        orderDiv.appendChild(orderAction);
        
        mainDiv.appendChild(orderDiv);
        mainDiv.appendChild(span);

        counter += 1;
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    mainDiv.style.display = 'none';
    await loadAllOrders();
    document.getElementById('loading-div').style.display = 'none';
    mainDiv.style.display = 'flex';
});