import serialize from 'form-serialize';
import keys from 'lodash/keys';
import Swal from 'sweetalert2';

const onSubmit = (form) => (event) => {
    event.preventDefault();

    const data = serialize(form, {hash: true});
    const dataKeys = keys(data);

    const formData = dataKeys
        .map((key) => `
            <div class="result__row">
                <div class="result__key">${key}:</div>
                <div class="result__value">${data[key]}</div>
            </div>
        `)
        .join('');

    Swal.fire({
        html: `
            <div class="result">
                <div class="result__title">Submitted data:</div>
            
                ${formData}
            </div>
        `,
        confirmButtonText: 'Close',
        customClass: {
            popup: 'modal-wrapper',
        }
    });
};

const addSubmitHandler = () => {
    const forms = document.querySelectorAll('.form');

    [].slice.call(forms).forEach((form) => form.addEventListener('submit', onSubmit(form)));
};

export default addSubmitHandler;
