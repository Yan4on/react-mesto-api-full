import React from 'react';
import { InputAddCard } from './PopupHTML';
import PopupWithForm from './PopupWithForm.js';

function AddCardPopup({ isOpen, onClose, onAddPlace }) {

    const [place, setPlace] = React.useState("");
    const [link, setLink] = React.useState("");

    // Обработчик нажатия кнопки Создать
    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: place,
            link
        });
    }

    // Обработчик ввода данных в поля
    function handleChange(e) {
        // если аттрибут name имеет значение name, то устанавливаем setPlace
        // иначе setLink
        e.target.name === "name" ?
            setPlace(e.target.value) :
            setLink(e.target.value);
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            btnName="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <InputAddCard
                onChange={handleChange}
            />
        </PopupWithForm>
    );
}

export default AddCardPopup;