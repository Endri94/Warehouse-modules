export function saveItems(warehouses) {
    localStorage.setItem('warehouses', JSON.stringify(warehouses));
}

export function loadItems() {
    const warehouses = localStorage.getItem('warehouses');
    return warehouses ? JSON.parse(warehouses) : [];
}