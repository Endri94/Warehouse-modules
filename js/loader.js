// получение loader
export function getLoader() {
    const loaderEl = document.createElement('div')
    loaderEl.classList.add('loader')
    for (let i = 1; i <= 8; i++) {
        const divEl = document.createElement('div');
        loaderEl.append(divEl)

    }
    return loaderEl
}