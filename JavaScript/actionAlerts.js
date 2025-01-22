let formData = new FormData();

function submitEditAlert(formData, orderId) {


    fetch(`https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders/${orderId}?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043`, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            response.json();
            console.log('sent');
            console.log(response);
        })
        .finally(() => {
            location.reload();
        });
}

let submitBtnFlag = false;
const submitEditButton = document.getElementById('submit-edit-btn');


function refreshOrderNumber() {

    let refreshCounter = 1;
    for (let i = 1; i < 11; i++) {
        if (document.getElementById(`order-div-${i}`)) {
            let div = document.getElementById(`order-div-${i}`);
            number = div.querySelector('.orders-number');
            number.textContent = refreshCounter;
            refreshCounter += 1; 
        }
    }
}


function deleteBtnAction(event) {
    
    orderId = ordersData[event.target.dataset.order - 1];

    fetch('https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders/' + orderId.id + '?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043', {
        method: 'DELETE',        
    });

    placeholderElement = event.target.parentElement;
    targetElement = placeholderElement.parentElement;
    targetElement.previousElementSibling.remove();
    targetElement.remove();
    refreshOrderNumber();
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('delete-alert-div').style.display = 'none';
};


function createDeleteAlert(event) {
    document.getElementById('overlay').style.display = 'block';


    const deleteAlertDiv = document.createElement('div');
    const deleteSubDiv1 = document.createElement('div');
    const deleteSubDiv2 = document.createElement('div');
    const deleteSubDiv3 = document.createElement('div');
    const sub1p = document.createElement('p');
    const sub1x = document.createElement('img');
    const sub2p = document.createElement('p');
    const deleteButtonNo = document.createElement('button');
    const deleteButtonYes = document.createElement('button');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');


    deleteAlertDiv.id = "delete-alert-div";
    deleteSubDiv1.id = "delete-sub-div-1";
    deleteSubDiv2.id = "delete-sub-div-2";
    deleteSubDiv3.id = "delete-sub-div-3";
    sub1p.id = "delete-sub-1-p";
    sub1p.textContent = 'Удаление заказа';
    sub2p.id = "delete-sub-2-p";
    sub2p.textContent = 'Вы уверуны, что хотите удалить заказ?';
    sub1x.id = "delete-sub-1-x";
    sub1x.src = "./images/pngfind.com-x-png-1320307.png";
    deleteButtonNo.id = "delete-no";
    deleteButtonYes.id = "delete-yes";
    span1.className = "line-span";
    span2.className = "line-span";
    deleteButtonNo.id = "delete-no";
    deleteButtonNo.textContent = 'Отмена';
    deleteButtonYes.id = "delete-yes";
    deleteButtonYes.textContent = 'Да';


    sub1x.addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'none';
        deleteAlertDiv.remove();
        formData = new FormData();
    });

    deleteButtonNo.addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'none';
        deleteAlertDiv.remove();
        formData = new FormData();
    });

    deleteButtonYes.addEventListener('click', () => {
        deleteBtnAction(event);
        document.getElementById('overlay').style.display = 'none';
        deleteAlertDiv.remove();
        showMessage('Order removed successfully!');
        setTimeout(() => {
            deleteMessage();
        }, 3000);
        formData = new FormData();
    });


    deleteSubDiv1.appendChild(sub1p);
    deleteSubDiv1.appendChild(sub1x);

    deleteSubDiv2.appendChild(span1);
    deleteSubDiv2.appendChild(sub2p);
    deleteSubDiv2.appendChild(span2);

    deleteSubDiv3.appendChild(deleteButtonNo);
    deleteSubDiv3.appendChild(deleteButtonYes);

    deleteAlertDiv.appendChild(deleteSubDiv1);
    deleteAlertDiv.appendChild(deleteSubDiv2);
    deleteAlertDiv.appendChild(deleteSubDiv3);
    mainDiv.appendChild(deleteAlertDiv);
}


document.getElementById('create-sub-1-x').addEventListener('click', () => {
    document.getElementById('view-alert-div').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('order-summary').remove();
    document.getElementById('deletable-span').remove();
    formData = new FormData();
});


function createViewAlert(event, date, created_at, price, items) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('view-alert-div').style.display = 'block';
    
    const currentOrder = ordersData[event.target.dataset.order - 1];
    console.log(currentOrder);

    const table = document.createElement("table");
    table.id = "order-summary";

    const addRow = (label, value) => {
        const row = document.createElement("tr");
        row.className = 'table-row';
        const labelCell = document.createElement("td");
        labelCell.className = 'table-label';
        const valueCell = document.createElement("td");
        valueCell.className = 'table-value';
        
        labelCell.innerHTML = `<strong>${label}</strong>`;
        valueCell.textContent = value;
        
        row.appendChild(labelCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    };
      
    addRow("Дата оформления", created_at);
    addRow("Имя", currentOrder.full_name);
    addRow("Номер телефона", currentOrder.phone);
    addRow("Email", currentOrder.email);
    addRow("Адрес доставки", currentOrder.delivery_address);
    addRow("Дата доставки", date);
    addRow("Время доставки", currentOrder.delivery_interval);
    addRow("Состав заказа", items);
    addRow("Стоимость", `${price}ք`);
    addRow("Комментарий", currentOrder.comment);

    document.getElementById('view-alert-div-subdiv').appendChild(table);
    const span2 = document.createElement('span');
    span2.id = 'deletable-span';
    span2.className = "line-span";
    document.getElementById('view-alert-div-subdiv').appendChild(span2);


    submitEditButton.style.display = 'none';  
}

function createEditAlert(event, date, created_at, price, items) {

    //	https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders/{order-id}?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043

    document.getElementById('overlay').style.display = 'block';
    document.getElementById('view-alert-div').style.display = 'block';
    submitEditButton.style.display = 'block';
    
    
    const currentOrder = ordersData[event.target.dataset.order - 1];
    console.log(currentOrder);

    const table = document.createElement("table");
    table.id = "order-summary";

    const addRow = (label, value) => {
        const row = document.createElement("tr");
        row.className = 'table-row';
        const labelCell = document.createElement("td");
        labelCell.className = 'table-label';
        const valueCell = document.createElement("td");
        valueCell.className = 'table-value';
        
        labelCell.innerHTML = `<strong>${label}</strong>`;
        valueCell.textContent = value;
        
        row.appendChild(labelCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    };

    const addRowInput = (label, value) => {
        const row = document.createElement("tr");
        row.className = 'table-row';
        const labelCell = document.createElement("td");
        labelCell.className = 'table-label';
        const valueCell = document.createElement("td");
        valueCell.className = 'table-value';
        
        labelCell.innerHTML = `<strong>${label}</strong>`;
        valueCell.appendChild(value);
        
        row.appendChild(labelCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    };



    function addToFormData(key, value) {
        if (formData.has(key)) {
            formData.set(key, value);
        } else {
            formData.append(key, value);
        }
    };

    //create inputs

    nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'input-field';
    nameInput.name = 'full_name';
    nameInput.value = currentOrder.full_name;
    nameInput.addEventListener('change', () => addToFormData('full_name', nameInput.value));

    phoneInput = document.createElement('input');
    phoneInput.type = 'text';
    phoneInput.className = 'input-field';
    phoneInput.name = 'phone';
    phoneInput.value = currentOrder.phone;
    phoneInput.addEventListener('change', () => addToFormData('phone', phoneInput.value));

    emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.className = 'input-field';
    emailInput.name = 'email';
    emailInput.value = currentOrder.email;
    emailInput.addEventListener('change', () => addToFormData('email', emailInput.value));

    addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.className = 'input-field';
    addressInput.name = 'delivery_address';
    addressInput.value = currentOrder.delivery_address;
    addressInput.addEventListener('change', () => addToFormData('delivery_address', addressInput.value));

    dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.className = 'input-field';
    dateInput.name = 'delivery_date';
    dateInput.value = currentOrder.delivery_date;
    dateInput.addEventListener('change', () => addToFormData('delivery_date', dateInput.value));

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', formattedDate);


    const timeSelect = document.createElement('select');
    timeSelect.id = 'input-time';
    timeSelect.className = 'input-field';
    timeSelect.name = 'delivery_interval';


    const timeOptions = [
        { value: "08:00-12:00", text: "08:00 - 12:00" },
        { value: "12:00-14:00", text: "12:00 - 14:00" },
        { value: "14:00-18:00", text: "14:00 - 18:00" },
        { value: "18:00-22:00", text: "18:00 - 22:00" }
    ];

    timeOptions.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        timeSelect.appendChild(option);
    });

    timeSelect.value = currentOrder.delivery_interval;
    timeSelect.addEventListener('change', () => addToFormData('delivery_interval', timeSelect.value));


    commentInput = document.createElement('textarea');
    commentInput.id = 'comments-textarea';
    commentInput.name = 'comment';
    commentInput.value = currentOrder.comment;
    commentInput.addEventListener('change', () => addToFormData('comment', commentInput.value));

      
    addRow("Дата оформления", created_at);
    addRowInput("Имя", nameInput);
    addRowInput("Номер телефона", phoneInput);
    addRowInput("Email", emailInput);
    addRowInput("Адрес доставки", addressInput);
    addRowInput("Дата доставки", dateInput);
    addRowInput("Время доставки", timeSelect);
    addRow("Состав заказа", items);
    addRow("Стоимость", `${price}ք`);
    addRowInput("Комментарий", commentInput);

    document.getElementById('view-alert-div-subdiv').appendChild(table);
    const span2 = document.createElement('span');
    span2.id = 'deletable-span';
    span2.className = "line-span";
    document.getElementById('view-alert-div-subdiv').appendChild(span2);

    if (!submitBtnFlag) {
        submitEditButton.addEventListener('click', () => submitEditAlert(formData, currentOrder.id));
        submitBtnFlag = true;
    }
}


