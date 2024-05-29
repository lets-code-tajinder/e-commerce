import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/" className="text-decoration-none text-dark">
                HOME
              </Link>
            </li>
            <li className="list-inline-item">
              <Link
                to="/new-products"
                className="text-decoration-none text-dark"
              >
                NEW PRODUCT
              </Link>
            </li>
            <li className="list-inline-item">
              <Link
                to="/special-products"
                className="text-decoration-none text-dark"
              >
                SPECIAL
              </Link>
            </li>
            <li className="list-inline-item">
              <Link
                to="/all-products"
                className="text-decoration-none text-dark"
              >
                ALL PRODUCTS
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="/contact" className="text-decoration-none text-dark">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <p>
            Copyright <i className="fa fa-copyright" aria-hidden="true"></i>
            2013 Enest. Privacy Notice
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
