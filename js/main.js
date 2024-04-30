let startCarPrice = 0;
const bayNowButtons = document.querySelectorAll('.buy-now-btn');


bayNowButtons.forEach(buyNowButton => buyNowButton.addEventListener('click', function() {
    const productItem = this.closest('.product-item');

    if (productItem) {
        const carImg = productItem.querySelector('.car-img');
        const carPrice = productItem.querySelector('.price');
        const carName = productItem.querySelector('.car-name');

        openModal(carImg, carPrice, carName)
    }
}));

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function() {
    closeModal();
})

const checkboxes = document.querySelectorAll('.checkbox-input');
checkboxes.forEach(checkbox => checkbox.addEventListener('change', function() {
    const configurationPrice = this.getAttribute('value');

    handleCarPrice(configurationPrice, this.checked)
}));

function openModal(carImg, carPrice, carName) {
    const modal = document.querySelector('.modal');

    const imgWrapper = modal.querySelector('.car-img-container');
    const name = modal.querySelector('.car-name');
    const price = modal.querySelector('.price');

    if(imgWrapper) imgWrapper.appendChild(carImg.cloneNode(true));
    if(name) name.textContent = carName.textContent;
    if(price) {
        price.textContent = carPrice.textContent;
        price.value = carPrice.getAttribute('data-price')
    }

    modal.style.display = "block";
}

function closeModal() {
    const modal = document.querySelector('.modal');
    const imgWrapper = modal.querySelector('.car-img-container');
    imgWrapper.innerHTML = "";

    checkboxes.forEach(checkbox => checkbox.checked = false);

    modal.style.display = "none";
}

function handleCarPrice(configurationPrice, isChecked) {
    const modal = document.querySelector('.modal');
    
    const price = modal.querySelector('.price');

    const newValue = isChecked ? Number(price.value) + Number(configurationPrice) : Number(price.value) - Number(configurationPrice);

    price.value = newValue.toFixed(2);
    price.textContent = `${(Number(price.value).toLocaleString('de-DE'))} €`
}

