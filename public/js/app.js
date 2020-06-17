const weatherForm = document.querySelector('form');
const addressInput = document.querySelector('input');
const error = document.querySelector('#error');
const success = document.querySelector('#success');
const loading = document.querySelector('#loading');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = addressInput.value;
    const url = 'http://localhost:3000/weather?address=' + location;


    loading.textContent = 'loading...';

    fetch(url).then(res => {
        res.json().then(data => {
            console.log(data)
            loading.textContent = '';
            if (data.error) {
                error.textContent = data.error;
                success.textContent = '';
            } else {
                success.textContent = data.forecast + ' ' + data.location;
                error.textContent = '';
            }
        })
    })
})