export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "931a8d4e4647b95275eae77fba94d7b2";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
export const tmdbApi = {
  getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
  getMovieDetails: (movieId, type) => `${tmdbEndpoint}/${movieId}${type}?api_key=${apiKey}`,
};
