import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URLS } from "../configs/urls";
import { httpGet } from "../utils/http";

interface Category {
  id: string;
  categoryName: string;
}

const LeftSide: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await httpGet(API_URLS.FETCH_CATEGORIES);

      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="col-md-12 border cat_heading">
        <p className="mt-3">CATEGORIES</p>
      </div>
      <div className="col-md-12">
        <ul className="list-inline border">
          {data.map((result) => (
            <Link
              key={result.id}
              to={`/show-products/${result.id}`}
              className="text-decoration-none text-dark"
            >
              <li className="border-bottom py-2 px-3">{result.categoryName}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
