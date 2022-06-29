import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";
const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          className="w-full h-[250px] object-cover rounded-lg mb-5"
          alt=""
        />
        <div className="flex flex-col flex-1">
          <h3 className=" text-xl font-bold mb-3">{title}</h3>
          <div className="flex items-center justify-between text-sm opacity-50 mb-10">
            <span>{new Date(release_date).getFullYear()}</span>
            <span>{vote_average}</span>
          </div>
          <Button bgColor="secondary" onClick={() => navigate(`/movie/${id}`)}>
            Watch Now
          </Button>
          {/* <button
            onClick={() => navigate(`/movie/${id}`)}
            className="w-full py-3 px-6 rounded-lg capitalize bg-primary mt-auto"
          >
            Watch now
          </button> */}
        </div>
      </div>
    </Fragment>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <Fragment>
      <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
        <LoadingSkeleton height="250px" width="100%" radius="8px"></LoadingSkeleton>
        <div className="mb-5"></div>
        {/* <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          className="w-full h-[250px] object-cover rounded-lg mb-5"
          alt=""
        /> */}
        <div className="flex flex-col flex-1">
          <LoadingSkeleton height="10px" width="100%"></LoadingSkeleton>
          <div className="mb-5"></div>
          <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <LoadingSkeleton height="10px" width="80px"></LoadingSkeleton>
          <LoadingSkeleton height="10px" width="20px"></LoadingSkeleton>
          </div>
          <div className="py-3 px-6 mt-auto">
            <LoadingSkeleton height="30px" width="100%" radius="8px"></LoadingSkeleton>
          </div>
          
          {/* <Button bgColor="secondary" onClick={() => navigate(`/movie/${id}`)}>
            Watch Now
          </Button> */}
          {/* <button
            onClick={() => navigate(`/movie/${id}`)}
            className="w-full py-3 px-6 rounded-lg capitalize bg-primary mt-auto"
          >
            Watch now
          </button> */}
        </div>
      </div>
    </Fragment>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
