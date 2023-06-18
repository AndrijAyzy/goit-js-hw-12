import axios from 'axios';
import Notiflix from 'notiflix';

export async function fetchPhoto(request, page) {
    const query = request.split(" ").join("+");
    // console.log('page', page);
    return axios.get(`https://pixabay.com/api/?key=37372386-536360ba144753f1ce789d08e&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
        .then(response => response.data)
        .catch(error => Notiflix.Notify.failure(error));
}