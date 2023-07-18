// Requisição para adicionar um novo produto
function addProduct() {
    const productData = {
        name: document.querySelector('#product-name').value,
        quantity: document.querySelector('#product-quantity').value,
        price: document.querySelector('#product-price').value
    };

    fetch('/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}

// Requisição para adicionar um novo pedido
function addOrder() {
    const orderData = {
        client: document.querySelector('#order-client').value,
        product: document.querySelector('#order-product').value,
        quantity: document.querySelector('#order-quantity').value,
        price: document.querySelector('#order-price').value
    };

    fetch('/add-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
}
