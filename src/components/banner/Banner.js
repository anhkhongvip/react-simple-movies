import React, { Fragment } from "react";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieList from "../movie/MovieList";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=931a8d4e4647b95275eae77fba94d7b2`,
    fetcher
  );

  const { data: dataGenres } = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=931a8d4e4647b95275eae77fba94d7b2`,
    fetcher
  );

  const movies = data?.results || [];
  const genres = dataGenres?.genres || [];
  console.log(movies);
  return (
    <Fragment>
      <section className="banner h-[500px] page-container mb-20 overflow-hidden">
        <Swiper grabCursor="true" slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <BannerItem item={item} genres={genres}></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </Fragment>
  );
};

function BannerItem({ item, genres }) {
  const { title, poster_path, genre_ids, id } = item;
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="w-full h-full rounded-lg bg-white relative">
        <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-lg object-top"
        />
        <div className="absolute left-5 bottom-5 w-full text-white">
          <h2 className="font-bold text-3xl mb-3">{title}</h2>
          <div className="flex items-center gap-x-3 mb-8">
            {genres.length > 0 &&
              genres.map((item) => {
                if (genre_ids.indexOf(item.id) !== -1) {
                  return (
                    <span key={item.id} className="py-2 px-4 border border-white rounded-md">
                      {item.name}
                    </span>
                  );
                }
                return null;
              })}
          </div>
          <Button bgColor="secondary" className="max-w-[200px]" onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
          {/* <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
            Watch Now
          </button> */}
        </div>
      </div>
    </Fragment>
  );
}

export default Banner;
