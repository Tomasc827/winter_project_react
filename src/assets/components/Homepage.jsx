import { useEffect, useState } from "react";

const Homepage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setItems(data.content);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchData();
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
    <div className="p-8">
      <h1 className="text-4xl font-bold text-left mb-8 text-figma-white">
        Recommended for you
      </h1>
      {items.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <li key={index}>
              <img
                src={item.thumbnail?.regular?.small || ""}
                alt={item.title}
                className="w-full h-auto mb-4 rounded"
              />
              <p className="text-sm text-figma-greyish-blue">
                <span className="font-medium">{item.year}</span> •{" "}
                <span className="flex items-center">
                  {renderCategoryIcon(item.category)}
                  <span className="font-medium">{item.category}</span>
                </span>{" "}
                • <span className="font-medium">{item.rating}</span>
                <h2 className="text-lg font-semibold text-figma-white">
                  {item.title}
                </h2>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}
    </div>
  );
};

export default Homepage;
