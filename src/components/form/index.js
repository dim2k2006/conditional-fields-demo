import serialize from 'form-serialize';
import Swal from 'sweetalert2';

const onSubmit = (form) => (event) => {
    event.preventDefault();

    const formData = Object.keys(serialize(form, {hash: true}))
        .map((key) => `
            <div class="result__row">
                <div class="result__key">${key}</div>
                <div class="result__value">${value}</div>
            </div>
        `);


    Swal.fire({
        type: 'success',
        title: 'Submitted data:',
        html: `<div class="result">${formData}</div>`,
        confirmButtonText: 'Ok'
    });
};

const addSubmitHandler = () => {
    const forms = document.querySelectorAll('.form');

    [].slice.call(forms).forEach((form) => form.addEventListener('submit', onSubmit(form)));
};

export default addSubmitHandler;
