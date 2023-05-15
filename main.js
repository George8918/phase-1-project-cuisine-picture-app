

const tabs = document.querySelectorAll('.tablinks');
const imagesContainer = document.querySelector('.image-container');
const searchInput = document.querySelector('#search-input');
const randomizeBtn = document.querySelector('#randomize-btn');
const clearBtn = document.querySelector('#clear-btn');


let currentTab = '';
let imagesData = [];


function fetchImageData(cuisine) {
  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${cuisine}&image_type=photo&per_page=100`)
    .then(response => response.json())
    .then(data => {
      if (data.hits) {
        imagesData = data.hits.map((hit) => {
          return {
            id: hit.id,
            imageUrl: hit.webformatURL,
            title: hit.tags
          }
        })
        displayImages(imagesData);
      } else {
        console.log('No result 404')
      }
    })
}

function displayImages(images) {
    const imagesContainer = document.querySelector('.image-container');
    imagesContainer.innerHTML = "";
    images.forEach(image => {
        const imageElement = document.createElement("img")
        imageElement.src = image.imageUrl;
        imageElement.alt = image.title;
        imagesContainer.appendChild(imageElement);

    })
}

function filterImages(query) {
    const filteredImages = imagesData.filter(image => {
        return image.title.toLowerCase().includes(query.toLowerCase());
    });
    displayImages(filteredImages);
}



tabs.forEach(tab => {
  tab.addEventListener('click', () => {
      currentTab = tab.getAttribute('data-cuisine')
      fetchImageData(currentTab);
  });
});

searchInput.addEventListener('input', () => {
  filterImages(searchInput.value);
});

clearBtn.addEventListener('click', () => {
  searchInput.value ='';
  displayImages(imagesData);
});

// Initial fetch
fetchImageData(currentTab);
