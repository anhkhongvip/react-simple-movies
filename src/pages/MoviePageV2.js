import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import MovieList from "../components/movie/MovieList";
import { fetcher } from "../config/config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import Button from "../components/button/Button";
import useSWRInfinite from "swr/infinite";

const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=931a8d4e4647b95275eae77fba94d7b2&page=${nextPage}`
  );
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // const { data, error,  size, setSize } = useSWRInfinite(
  //   (index) =>
  //     `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${
  //       index + 1
  //     }`,
  //   fetcher
  // );
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=931a8d4e4647b95275eae77fba94d7b2&page=${nextPage}&query='${filterDebounce}'`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=931a8d4e4647b95275eae77fba94d7b2&page=${nextPage}`
      );
    }
  }, [filterDebounce, nextPage]);

  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];

  useEffect(() => {
    if (!data || !data.total_results) return;
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setNextPage(event.selected + 1);
    setItemOffset(newOffset);
  };

  return (
    <Fragment>
      <div className="p-10">
        <div className="flex mb-5">
          <div className="flex-1">
            <input
              type="text"
              className="w-full p-4 bg-slate-800 outline-none text-white"
              placeholder="Type here to search..."
              onChange={handleFilterChange}
            ></input>
          </div>
          <button className="p-4 bg-primary text-white rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        {loading && (
          // <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
          <div className="grid grid-cols-4 gap-10">
            {new Array(itemsPerPage).fill(0).map((item, index) => (
              <>
                <MovieCardSkeleton key={index}></MovieCardSkeleton>
              </>
            ))}
          </div>
        )}
        <div className="grid grid-cols-4 gap-10">
          {!loading &&
            movies.length > 0 &&
            movies.map((item) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
        </div>
        <div className="mt-10 text-center">
          <Button className="max-w-[250px]">Load more</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default MoviePage;
