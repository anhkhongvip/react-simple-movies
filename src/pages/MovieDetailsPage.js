import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbApi } from "../config/config";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbApi.getMovieDetails(movieId, ""), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <>
      <div className="pb-10">
        <div className="w-full h-[600px] relative">
          <div className="overlay absolute inset-0 bg-black bg-opacity-60"></div>
          <div
            className="w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
            }}
          ></div>
        </div>
        <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
          <img
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            className="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <h1 className="text-white text-center text-4xl mb-10">{title}</h1>
        {genres.length > 0 && (
          <div className="flex items-center justify-center gap-x-5 mb-10">
            {genres.map((item) => (
              <span
                key={item.id}
                className="py-2 px-4 border-[#F62682] text-primary border rounded-lg"
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
          {overview}
        </p>
        <MovieMeta type="credits"></MovieMeta>
        <MovieMeta type="videos"></MovieMeta>
        <MovieMeta type="similar"></MovieMeta>
      </div>
    </>
  );
};

function MovieMeta({type = "videos"}) {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbApi.getMovieDetails(movieId, `/${type}`),
    fetcher
  );
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <>
        <h2 className="text-center text-3xl mb-10">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                className="w-full h-[350px] object-cover rounded-lg mb-3"
                alt=""
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos") {
      return (
        <>
          <div className="py-10">
            <div className="flex flex-col gap-10">
              {results.slice(0, 5).map((item) => (
                <div key={item.id}>
                  <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block rounded-lg">
                    {item.name}
                  </h3>
                  <div className="w-full aspect-video">
                    <iframe
                      width="900"
                      height="506"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      title="Youtube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-fill"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
          <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

function MovieCredits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbApi.getMovieDetails(movieId, "/credits"),
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;

  return (
    <>
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              alt=""
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbApi.getMovieDetails(movieId, "/videos"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <>
      <div className="py-10">
        <div className="flex flex-col gap-10">
          {results.slice(0, 5).map((item) => (
            <div key={item.id}>
              <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block rounded-lg">
                {item.name}
              </h3>
              <div className="w-full aspect-video">
                <iframe
                  width="900"
                  height="506"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="Youtube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-fill"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbApi.getMovieDetails(movieId, "/similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
