import { loadItems, saveItems } from './storage.js';
import { getLoader } from './loader.js';

const container = document.querySelector('.container');
const loaderEl = getLoader();
container.append(loaderEl);

setTimeout(() => {
    const warehousesBody = document.querySelector('#warehouse-tbody');
    const addItemBtn = document.querySelector('#addItemBtn');
    const headers = document.querySelectorAll('#warehouse-table thead th.sortable');

    let warehouses = loadItems();

    let currentSort = {
        column: null,
        ascending: true
    };

    function renderItems() {
        warehousesBody.innerHTML = '';

        warehouses.forEach((warehouse, index) => {
            const row = document.createElement('tr');
            row.innerHTML =
                ` 
            <td class="table-dark">${warehouse.title}</td>
            <td class="table-dark">${warehouse.section}</td>
            <td class="table-dark">${warehouse.weight}</td>
            <td class="table-dark">${warehouse.storage}</td>
            <td><button data-index="${index}" class="deleteBtn btn btn-danger delete-btn w-100">Удалить</button></td>
            `;
            warehousesBody.appendChild(row);
        });
    }

    function deleteItem(index) {
        warehouses.splice(index, 1);
        saveItems(warehouses);
        renderItems();
    }

    function sortItems(column) {
        if (currentSort.column === column) {
            currentSort.ascending = !currentSort.ascending;
        } else {
            currentSort.column = column;
            currentSort.ascending = true;
        }
        warehouses.sort((a, b) => {
            let valA = a[column];
            let valB = b[column];

            if (!isNaN(Number(valA)) && !isNaN(Number(valB))) {
                valA = Number(valA);
                valB = Number(valB);
            } else {
                valA = String(valA).toLowerCase();
                valB = String(valB).toLowerCase();
            }

            if (valA < valB) return currentSort.ascending ? -1 : 1;
            if (valA > valB) return currentSort.ascending ? 1 : -1;
            return 0;
        });
    }

    headers.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            const column = header.dataset.column;
            sortItems(column);
            updateSortIndicators();
            renderItems();
        });
    });

    // функция отображения направления сортировки(стрелки)
    function updateSortIndicators() {
        headers.forEach(header => {
            header.textContent = header.textContent.replace(/[\u25B2\u25BC]/g, '').trim();
            if (header.dataset.column === currentSort.column) {
                header.textContent += currentSort.ascending ? ' ▲' : ' ▼';
                header.classList.remove('sorted-asc', 'sorted-desc');
                header.classList.add(currentSort.ascending ? 'sorted-asc' : 'sorted-desc');
            }
        });
    }

    warehousesBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            const confirmation = confirm('Вы точно хотите удалить вещь?');
            if (confirmation) {
                const index = Number(event.target.dataset.index);
                deleteItem(index);
            }
        }
    });

    addItemBtn.addEventListener('click', () => {
        const container = document.querySelector('.container');
        const loaderEl = getLoader();
        container.append(loaderEl);
        setTimeout(() => {
            window.location.href = 'add-item.html';
        }, 1000);
    });

    renderItems();
    loaderEl.remove();
}, 1500);

