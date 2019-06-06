import ConditionalForm from 'conditional-fields-front';
import addSubmitHandler from '../../components/form';
import '../../assets/styles/main.scss';

addSubmitHandler();

new ConditionalForm(document.querySelector('form'), {
    onShow: (root) => root.closest('div.row').style.display = 'block',
    onHide: (root) => root.closest('div.row').style.display = 'none'
});
