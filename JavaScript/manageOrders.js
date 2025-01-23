const mainDiv = document.getElementById('main-div-deletable');
let ordersData = {};
let dishesData = {};
let goods = [];
let price = 0;


async function calculatePrice(array) {
    price = 0;
    console.log(array);
    const ids = array;
    if (ids.length === 0) {
        console.log('No IDs found in localStorage.');
        return;
    }

    for (const id of ids) {
        for (const response of dishesData) {
            if (response.id == id) {
                if (response.discount_price != null) {
                    price += parseInt(response.discount_price, 10);
                } else {
                    price += parseInt(response.actual_price, 10);
                }
                goods.push(response.name);
            }
        }
    }
};


/////////////////////////////////////////////////////////////////////////////


async function loadAllOrders() {

    const ordersResponse = await fetch('https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043');
    ordersData = await ordersResponse.json();

    const dishesResponse = await fetch('https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/goods?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043');
    dishesData = await dishesResponse.json();

    let counter = 1;

    for (const order of ordersData) {
        goods = [];
        calculatePrice(order.good_ids);


        const time = order.delivery_interval;
        const deliveryDate = order.delivery_date;
        const date = new Date(deliveryDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;

        function formatDateTime(createdDateTime) {
            const date = new Date(createdDateTime);
        
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
        
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
        
            return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
        }
    
        const formattedDateTime = formatDateTime(order.created_at);

        const dateTime = `${formattedDate}\n${time}`;
        console.log(dateTime);
        let goodsNames = goods.join(' ;\n');
        goodsNames = goodsNames.substring(0, goodsNames.length - 2);
        console.log(goodsNames);
        const orderDiv = document.createElement('div');
        const orderNumber = document.createElement('p');
        const orderDate = document.createElement('p');
        const orderContent = document.createElement('p');
        const orderPrice = document.createElement('p');
        const orderTime = document.createElement('p');
        orderTime.innerText = dateTime;
        orderTime.className = 'orders-date-time';
        const orderAction = document.createElement('div');
        const span = document.createElement('span');

        const eye = document.createElement('img');
        eye.className = 'bootstrap-icon';
        eye.id = 'view-btn';
        eye.src = "./images/eye.svg";
        eye.setAttribute('data-order', counter);
        eye.setAttribute('data-price', price);
        eye.addEventListener('click', (event) => createViewAlert(event, formattedDate, formattedDateTime, price, goodsNames));

        const pen = document.createElement('img');
        pen.id = 'edit-btn';
        pen.className = 'bootstrap-icon';
        pen.src = "./images/pencil-square.svg";
        pen.setAttribute('data-order', counter);
        pen.setAttribute('data-price', price);
        pen.addEventListener('click', (event) => createEditAlert(event, formattedDate, formattedDateTime, price, goodsNames));

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

        orderDate.textContent = formattedDateTime;
        orderDate.className = 'orders-date';

        orderContent.innerText = goodsNames;
        orderContent.className = 'orders-content';

        orderPrice.textContent = `${price}ք`;
        orderPrice.className = 'orders-price';

        orderAction.className = 'icons-div';
        
        orderAction.appendChild(eye);
        orderAction.appendChild(pen);
        orderAction.appendChild(trash);

        orderDiv.id = `order-div-${counter}`;

        orderDiv.appendChild(orderNumber);
        orderDiv.appendChild(orderDate);
        orderDiv.appendChild(orderContent);
        orderDiv.appendChild(orderPrice);
        orderDiv.appendChild(orderTime);
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