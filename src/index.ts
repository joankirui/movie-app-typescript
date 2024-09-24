const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a620d2010d6df084e8a28f2a5b5e21c5&page=1';

// most popular movie
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?api_key=a620d2010d6df084e8a28f2a5b5e21c5&query=';
// searched movie
const movieBox = document.querySelector<HTMLDivElement>('#movie-box');
//interface for object shapes and type for everything else to maintain a clear and consistent codebase.
interface Movie {
  original_title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

interface ApiResponse {
    results: Movie[];
}
const getMovies = async (api: string) => {
  const response = await fetch(api);
  const data: ApiResponse = await response.json();
  console.log(data);
  showMovies(data.results);
};

const showMovies = (data: Movie[]) => {
  if (movieBox) {movieBox.innerHTML = '';
  // empty the moviebox
  data.forEach((element) => {
    const imagePath =
      element.poster_path === null
        ? 'img/image-missing.png'
        : IMGPATH + element.poster_path;
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
        <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title"> 
                        <h2>${element.original_title} </h2>
                        <span> 
                        ${element.vote_average}<span>
                    </div>
                    <h3>Overview:</h3>
                    <p> 
                    ${element.overview}
                    
                    </p>
                 </div>
                 `;
    movieBox.appendChild(box);
  });
}
};

const searchInput = document.querySelector<HTMLInputElement>('#search')
if (searchInput) {
  searchInput.addEventListener('keyup', function (event) {
    const target = event.target as HTMLInputElement;
    if (target.value !== '') {
      getMovies(SEARCHAPI + target.value);
    } else {
      getMovies(APIURL);
    }
  });
}
// Initial call
getMovies(APIURL);
