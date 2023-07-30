const data = [
  {
    id: 1,
    name: 'Smoking in heaven',
    img: './images/IMG_3102.jpg',
    price: 374,
    cat: 'Dress',
  },
  {
    id: 2,
    name: 'Hanging man',
    img: './images/IMG_3103.jpg',
    price: 554,
    cat: 'Sport',
  },
  {
    id: 3,
    name: 'Two heads',
    img: './images/IMG_3105.jpg',
    price: 124,
    cat: 'Casual',
  },
  {
    id: 4,
    name: 'Fool',
    img: './images/IMG_3166.jpg',
    price: 664,
    cat: 'Luxury',
  },
  {
    id: 5,
    name: 'Uncensored',
    img: './images/IMG_3167.jpg',
    price: 554,
    cat: 'Dress',
  },
  {
    id: 6,
    name: 'Scream',
    img: './images/IMG_3179.jpg',
    price: 254,
    cat: 'Sport',
  },
  {
    id: 7,
    name: 'Spit',
    img: './images/IMG_3180.jpg',
    price: 234,
    cat: 'Casual',
  },
  {
    id: 8,
    name: 'Troubled',
    img: './images/IMG_3181.jpg',
    price: 740,
    cat: 'Dress',
  },
  {
    id: 9,
    name: 'Joker',
    img: './images/IMG_3214.jpg',
    price: 214,
    cat: 'Sport',
  },
  {
    id: 10,
    name: 'Reality',
    img: './images/IMG_3269.jpg',
    price: 244,
    cat: 'Luxury',
  },
];

const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.search');
const categoriesContainer = document.querySelector('.cats');
const priceRange = document.querySelector('.priceRange');
const priceValue = document.querySelector('.priceValue');

const displayProducts = (filterdProducts) => {
  productsContainer.innerHTML = filterdProducts
    .map(
      (product) =>
        `
   <div class="product">
            <img
              src="${product.img}"
              alt=""
            />
            <span class="name">${product.name}</span>
            <span class="priceText">$${product.price}</span>
          </div>
  `
    )
    .join('');
};

displayProducts(data);

searchInput.addEventListener('keyup', (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    'All',
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];
  categoriesContainer.innerHTML = categories
    .map(
      (cat) =>
        `
   <span class='cat'>${cat}</span>
  `
    )
    .join('');

  categoriesContainer.addEventListener('click', (e) => {
    const selectedCategories = e.target.textContent;

    selectedCategories === 'All'
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === selectedCategories));
  });
};

const setPrice = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = '$' + maxPrice;

  priceRange.addEventListener('input', (e) => {
    priceValue.textContent = '$' + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};

setCategories();
setPrice();
