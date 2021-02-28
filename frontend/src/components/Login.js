import React, { useState, memo } from 'react';
import FormSign from './FormSign';

const Login = memo(({ authLogin, inputPass  }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

        if (!email || !password) {
            return;
        }

        authLogin(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
            });
    }

    return (
        <FormSign
            name="sign-in"
            title="Вход"
            btnName="Войти"
            onChange={handleChange}
            onSubmit={handleSubmit}
            inputPass={inputPass}
        />
    );
});

export default Login;