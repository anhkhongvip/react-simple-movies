import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../../config/config";
import PropTypes from "prop-types";
//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(tmdbApi.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <Fragment>
      <div className="movie-list">
        {isLoading && (
          <>
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
              {new Array(5).fill(0).map((item, index) => (
                <>
                  <SwiperSlide key={index}>
                    <MovieCardSkeleton></MovieCardSkeleton>
                  </SwiperSlide>
                </>
              ))}
            </Swiper>
          </>
        )}
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Fragment>
  );
};
MovieList.propTypes = {
  type: PropTypes.string,
};
export default MovieList;
