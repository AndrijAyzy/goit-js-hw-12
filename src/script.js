import {fetchPhoto} from './script-api.js'
import Notiflix from 'notiflix';

const search = document.querySelector('.search');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

moreBtn.style.display = 'none';

const key = "31nGg2fLhw7TyDw22bDRugWNv9R9hVyGKv";

let page = 1;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (search.value.trim() === '') {
        search.value = '';
        return;
    }
    gallery.innerHTML = '';
    page = 1;
    fetchPhoto(search.value.trim(), page)
        .then(data => {
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            } else {
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
                if (data.totalHits <= page * 40) {
                    creator(data.hits);
                    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                    moreBtn.style.display = 'none';
                } else {
                    page++;
                    creator(data.hits);
                    moreBtn.style.display = 'block';
                }
            }
        })
        .catch(error => Notiflix.Notify.failure(error));
});

moreBtn.addEventListener('click', () => {
    moreBtn.style.display = 'none';

    fetchPhoto(search.value.trim(), page)
        .then(data => {
            if (data.totalHits <= page * 40) {
                creator(data.hits);
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                moreBtn.style.display = 'none';
            } else {
                page++;
                creator(data.hits);
                moreBtn.style.display = 'block';
            }
        })
        .catch(error => Notiflix.Notify.failure(error));

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
