import {fetchPhoto} from './script-api.js'

const search = document.querySelector('.search');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

moreBtn.style.display = 'none';

const key = "31nGg2fLhw7TyDw22bDRugWNv9R9hVyGKv";


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (search.value.trim() === '') {
        search.value = '';
        return;
    }
    gallery.innerHTML = '';
    fetchPhoto(search.value.trim(), false)
        .then(data => {
            if (data.hits.length === 0) {
                console.log('Sorry, there are no images matching your search query. Please try again.')
            } else {
                console.log(data.totalHits);
                creator(data.hits);
            }
        })
        .catch(error => console.log(error));
    moreBtn.style.display = 'block';
});

moreBtn.addEventListener('click', (event) => {
    moreBtn.style.display = 'none';

    fetchPhoto(search.value.trim(), true)
        .then(data => creator(data.hits))
        .catch(error => console.log(error));

    moreBtn.style.display = 'block';
})

function creator(array) {
    array.forEach(element => {
        gallery.insertAdjacentHTML("beforeend", `
        <div class="photo-card">
        <img src="${element.webformatURL}" alt="${element.tags}" data-source="${element.largeImageURL}" loading="lazy" class="photo"/>
        <div class="info">
        <p class="info-item">
        <b>Likes</b>
        ${element.likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${element.views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${element.comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${element.downloads}
                    </p>
                </div>
            </div>
        `)
    })
}

// переделать поиск под AXIOS