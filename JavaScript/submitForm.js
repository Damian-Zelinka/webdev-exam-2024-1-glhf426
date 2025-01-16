const form = document.getElementById('food-form');

const checkbox = document.getElementById('newsletter');

// Listen for the change event
checkbox.addEventListener('change', () => {
    const value = checkbox.checked ? 1 : 0;
    console.log(value); // Logs 1 if checked, 0 if not
    checkbox.value = value; // Update the value of the checkbox
});

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Format: dd.mm.yyyy
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('starting');

    const hiddenInput = document.getElementById('hidden-array');
    const ids = JSON.parse(localStorage.getItem('ids'));

    // hiddenInput.value = JSON.stringify(ids);
    const date = document.getElementById('input-date');
    let unformattedDate = date.value;

    const formattedDate = formatDate(unformattedDate);
    console.log(formattedDate);
    // date.value = formattedDate;
    console.log(date.value);

    let formData = new FormData(form);
    formData.set("delivery_date", formattedDate);
    
    for (id of ids) {
        formData.append("good_ids", id);
    }

    fetch('https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders?api_key=a8b02171-a483-48cd-9b9e-4f91c00e3043', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            response.json();
            console.log('sent');
            console.log(response);
        });
        
});