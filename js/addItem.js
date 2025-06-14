import { loadItems, saveItems } from './storage.js';
import { getLoader } from './loader.js';

const addItemForm = document.querySelector('#warehouse-form');


// ограничение ввода даты с текущей даты
// форматируем дату для добавления 0 в числах чтобы числа всегда были двузначными иначе setAttribut min не будет применяться
const addZero = (number) => String(number).padStart(2, '0');
const formatDate = (date) => `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
// устанавливаем значение min в тег input type=date
document.querySelector('#storage').setAttribute('min', formatDate(new Date()))

// находим блоки инпутов для появления текста ошибки
const nameBlock = document.querySelector(".title-block");
const sectionBlock = document.querySelector(".section-block");
const weightBlock = document.querySelector(".weight-block");
const storageBlock = document.querySelector(".storage-block");

// создаем ошибку под полями ввода
const titleErrorMessage = document.createElement("span");
const sectionErrorMessage = document.createElement("span");
const weightErrorMessage = document.createElement("span");
const storageErrorMessage = document.createElement("span");

// добавляем класс к текстам ошибки
titleErrorMessage.classList.add("error-message");
sectionErrorMessage.classList.add("error-message");
weightErrorMessage.classList.add("error-message");
storageErrorMessage.classList.add("error-message");
title.addEventListener('input', function (e) {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1)
})
section.addEventListener('input', function (e) {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1)
})

// функция валидации полей ввода
function isValidate() {

    let success = true;

    if (title.value.trim() == '') {
        title.classList.add('error')
        titleErrorMessage.textContent = 'Введите название вещи'
        nameBlock.appendChild(titleErrorMessage)
        success = false
    } else {
        title.classList.remove('error')
        titleErrorMessage.remove()
    }

    if (section.value.trim() == '') {
        section.classList.add('error')
        sectionErrorMessage.textContent = 'Введите номер полки. Пример: B7 или G34'
        sectionBlock.appendChild(sectionErrorMessage)
        success = false
    } else {
        section.classList.remove('error')
        sectionErrorMessage.remove()
    }
    if (weight.value.trim() == '' || weight.value <= 0) {
        weight.classList.add('error')
        weightErrorMessage.textContent = 'Введите вес вещи'
        weightBlock.appendChild(weightErrorMessage)
        success = false
    } else {
        weight.classList.remove('error')
        weightErrorMessage.remove()
    }
    if (storage.value == '') {
        storage.classList.add('error')
        storageErrorMessage.textContent = 'Введите дату хранения больше текущей даты'
        storageBlock.appendChild(storageErrorMessage)
        success = false
    } else {
        storage.classList.remove('error')
        storageErrorMessage.remove()
    }

    return success
}


addItemForm.addEventListener('submit', (event) => {
    event.preventDefault();


    const title = document.querySelector("#title").value;
    const section = document.querySelector("#section").value;
    const weight = document.querySelector("#weight").value;
    const storage = document.querySelector("#storage").value;

    if (isValidate() === true) {

        const warehouses = loadItems();
        warehouses.push({ title, section, weight, storage });


        saveItems(warehouses);
        const container = document.querySelector('.container')
        const loaderEl = getLoader()
        container.append(loaderEl)

        setTimeout(() => {

            window.location.href = 'index.html';
        }, 1500);

    }

});