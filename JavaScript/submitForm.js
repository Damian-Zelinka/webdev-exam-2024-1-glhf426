const form = document.getElementById('food-form');

const checkbox = document.getElementById('newsletter');

const dateInput = document.getElementById('input-date');

const today = new Date();


const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);


const formattedDate = tomorrow.toISOString().split('T')[0];

dateInput.setAttribute('min', formattedDate);


checkbox.addEventListener('change', () => {
    const value = checkbox.checked ? 1 : 0;
    console.log(value);
    checkbox.value = value;
});

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('starting');

    const hiddenInput = document.getElementById('hidden-array');
    const ids = JSON.parse(localStorage.getItem('ids'));

    const date = document.getElementById('input-date');
    let unformattedDate = date.value;

    const formattedDate = formatDate(unformattedDate);
    console.log(formattedDate);
    console.log(date.value);

    let formData = new FormData(form);
    formData.set("delivery_date", formattedDate);
    
    for (id of ids) {
        formData.append("good_ids", id);
    }

    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            if (response.status === 422) {
                const data = await response.json();
                showMessage(data.error || 'Ошибка в данных заказа.');
            } else {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
        } else {
            showMessage('Order created successfully! You will be redirected back to store.');
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('overlay').style.backgroundColor = 'transparent';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 5000);
        }

    } catch (error) {
        showMessage(error.message || 'Произошла ошибка. Попробуйте ещё раз.');
    }
});