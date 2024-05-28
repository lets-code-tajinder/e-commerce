import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeftSide from "./LeftSide";

interface SearchProductsProps {
  data: string;
}

interface Product {
  id: string;
  productImage: string;
  productQuantity: string;
  productName: string;
  productPrice: string;
}

const SearchProducts: React.FC<SearchProductsProps> = ({ data = "" }) => {
  const [searchData, setSearchData] = useState<Product[]>([]);

  useEffect(() => {
    alert(data);
    const fd = new FormData();
    fd.append("search", data);
    axios
      .post("http://localhost/enest1/search.php", fd)
      .then((res) => {
        setSearchData(res.data.myData);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, [data]);

  return (
    <>
      <Header />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <LeftSide />
          </div>
          <div className="col-md-8">
            <div className="col-md-12 contact-us py-3 px-3 mb-4">
              <p>Search Products</p>
            </div>
            {searchData.map((result) => (
              <div className="col-md-12 pt-3 pb-5 border mb-4" key={result.id}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="col-md-10 m-auto mb-5">
                      <img
                        style={{ width: "100%", height: "160px" }}
                        src={`/images/${result.productImage}`}
                        alt="no img"
                      />
                    </div>
                    <div className="col-md-10 border m-auto">
                      <p className="p-2 m-0 text-center">
                        In Stock: {result.productQuantity}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="col-md-12 mb-3">
                      Date Added: 2013-06-01 08:05:32
                    </div>
                    <div className="col-md-12 mb-4">
                      <h4>{result.productName}</h4>
                    </div>
                    <div className="col-md-12 mb-4">
                      <p className="p-0 m-0">Model: {result.productName}</p>
                      <p className="m-0 p-0">
                        Manufacturer: {result.productName}
                      </p>
                    </div>
                    <div className="col-md-12 mb-4">
                      <h2 className="pro_h2">{result.productPrice}</h2>
                    </div>
                    <div className="col-md-12">
                      <Link to={`/buy-products/${result.id}`}>
                        <input
                          className="pro_input"
                          type="button"
                          value="BUY NOW"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <Footer />
      </div>
    </>
  );
};

export default SearchProducts;
