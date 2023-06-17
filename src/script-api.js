export async function fetchPhoto(request, more) {
    let page = 1;
    if (more === false) {
        page = 1;
        return;
    } else {
        page++;
    }
    const axios = require('axios');
    const query = request.split(" ").join("+");
    return fetch(`https://pixabay.com/api/?key=37372386-536360ba144753f1ce789d08e&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
        .then(response => response.json())
        .then(data => data)
        .catch((error) => console.log(error));
}