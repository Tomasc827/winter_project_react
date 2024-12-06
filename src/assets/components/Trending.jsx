import { useState, useEffect } from 'react';

const TrendingMoviesCarousel = () => {
  const [movies, setMovies] = useState([]);

 
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('data/data.json');
      const data = await response.json();
      setMovies(data.content.filter(movie => movie.isTrending));
    };

    fetchMovies();
  }, []);
  const renderCategoryIcon = (category) => {
    if (category === "Movie") {
      return (
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
            fill="#FFF"
            opacity=".75"
          />
        </svg>
      );
    } else if (category === "TV Series") {
      return (
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z"
            fill="#FFF"
            opacity=".75"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap py-8 ">
        <h1 className="text-4xl font-bold text-left mb-8 text-figma-white">Trending</h1>
      <div className="flex space-x-4">
        {movies.map((movie, index) => (
          <div key={index} className="inline-block w-64">
            <div className="relative">
              <img
                src={movie.thumbnail.trending.small}
                alt={movie.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-figma-greyish-blue p-4 rounded-b-lg">
                <p className="text-sm">{movie.year} •</p>
                {renderCategoryIcon(movie.category)}

                <p className="text-sm mt-1">{movie.category} •</p>
                <p className="text-sm mt-1">{movie.rating}</p>
                <h3 className="font-semibold text-xl text-figma-white">{movie.title}</h3>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMoviesCarousel;
