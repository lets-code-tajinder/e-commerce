import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URLS } from "../configs/urls";

interface Category {
  id: string;
  categoryName: string;
}

const LeftSide: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(API_URLS.FETCH_CATEGORIES)
      .then((res) => {
        setData(res.data);
      })
      .catch((errors) => {
        console.error(errors);
      });
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
