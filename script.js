function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createProductList = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const request = await fetch(url);
  const response = await request.json();
  const results = await response.results;
  results.forEach(({ id, title, thumbnail }) => {
    const productItem = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const itemsSection = document.querySelector('.items');
    itemsSection.appendChild(createProductItemElement(productItem));
  });
};

const addItemsToShoppingCart = () => {
  document.querySelector('.items').addEventListener('click', async (event) => {
    if (event.target.className === 'item__add') {
      const itemSku = getSkuFromProductItem(event.target.parentElement);
      const url = `https://api.mercadolibre.com/items/${itemSku}`;
      await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const productItem = {
          itemSku,
          name: data.title,
          salePrice: data.price,
        };
        document.querySelector('.cart__items').appendChild(createCartItemElement(productItem));
      });
    }
  });
};

window.onload = () => {
  createProductList();
  addItemsToShoppingCart();
};
