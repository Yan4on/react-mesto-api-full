import React, { useState, memo } from 'react';
import { useHistory } from 'react-router-dom';
import FormSign from './FormSign';

const Register = memo(({ changeCurrUrl, authRegister, inputPass }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    // Обработчик ввода данных в поля
    function handleChange(e) {

        const { name, value } = e.target;

        //обновляем значение поля после каждого ввода символа
        name === "email" ?
            setEmail(value) :
            setPassword(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        authRegister(email, password);
    }

    return (
        <FormSign
            name="sign-up"
            title="Регистрация"
            btnName="Зарегистрироваться"
            onChange={handleChange}
            onSubmit={handleSubmit}
            changeCurrUrl={changeCurrUrl}
            inputPass={inputPass }
        />
    );
});

export default Register;