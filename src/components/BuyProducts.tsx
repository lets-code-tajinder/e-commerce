import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LeftSide from "./LeftSide";
import { API_URLS } from "../configs/urls";
import { httpPost } from "../utils/http";

interface Product {
  id: string;
  productImage: string;
  productQuantity: number;
  productName: string;
  productPrice: string;
}

const BuyProducts: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState<Product[]>([]);
  const [pid, setPid] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [qty, setQty] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputUidRef = useRef<HTMLInputElement>(null);

  const getProductDetails = async () => {
    const params = {
      productId: Number(id),
    };

    try {
      const res = await httpPost(API_URLS.GET_PRODUCT_BY_ID, params);
      setProductDetail(res.myData);
    } catch (errors) {
      console.error(errors);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("uid");
    if (session) {
      setUid(session);
    }

    if (id) {
      getProductDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = {
      userId: uid,
      productId: pid,
      qty,
    };

    try {
      await httpPost(API_URLS.ADD_TO_CART, params);
      setPid("");
      setUid("");
      setQty("");
      navigate("/checkout");
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <LeftSide />
          </div>
          <div className="col-md-8">
            {productDetail.length > 0 && (
              <form onSubmit={addFormData}>
                <div className="col-md-12 contact-us py-3 px-3 mb-4">
                  <p>{productDetail[0].productName}</p>
                </div>
                <div className="col-md-12 pt-3 pb-5 border mb-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="col-md-10 m-auto mb-5">
                        <img
                          style={{ width: "100%", height: "160px" }}
                          src={`/images/${productDetail[0].productImage}`}
                          alt="no img"
                        />
                      </div>
                      <div className="col-md-10 border m-auto">
                        <p className="p-2 m-0 text-center">
                          In Stock: {productDetail[0].productQuantity}
                        </p>
                      </div>
                      <div className="col-md-10 mt-5 m-auto">
                        <p className="m-0 pt-5 p-0">
                          <b>Details:</b>
                        </p>
                        <p className="m-0 p-0">
                          {productDetail[0].productName}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="col-md-12 mb-3">
                        Date Added: 2013-06-01 08:05:32
                      </div>
                      <div className="col-md-12 mb-4">
                        <h4>{productDetail[0].productName}</h4>
                      </div>
                      <div className="col-md-12 mb-4">
                        <p className="p-0 m-0">
                          Model: {productDetail[0].productName}
                        </p>
                        <p className="m-0 p-0">
                          Manufacturer: {productDetail[0].productName}
                        </p>
                      </div>
                      <div className="col-md-12 mb-4">
                        <table>
                          <tbody>
                            <tr>
                              <td className="qty">Enter quantity</td>
                              <td>
                                <input
                                  type="text"
                                  name="qty"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-12 mb-4">
                        <h2 className="pro_h2">
                          {productDetail[0].productPrice}
                        </h2>
                      </div>
                      <input
                        type="hidden"
                        name="pid"
                        ref={inputRef}
                        value={pid}
                      />
                      <input
                        type="hidden"
                        name="uid"
                        ref={inputUidRef}
                        value={uid}
                      />

                      <div className="col-md-12">
                        <input
                          className="pro_input"
                          type="submit"
                          name=""
                          value="Add to Cart"
                        />
                      </div>
                      <br />
                      <div className="col-md-12">
                        <Link to="/checkout">
                          <input
                            className="pro_input"
                            type="button"
                            name=""
                            value="CheckOut"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
            <div className="col-md-12 mt-4 border">
              <div className="col-md-11 mx-auto py-4">
                <form>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p>Enter Name </p>
                        </td>
                        <td>
                          <input type="text" name="" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Enter E-mail</p>
                        </td>
                        <td>
                          <input type="email" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Enter Review</p>
                        </td>
                        <td>
                          <textarea cols={22}></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Rating </p>
                        </td>
                        <td>
                          <input type="text" name="" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="snd-btn">
                    <button className="pro_input">Submit Query</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyProducts;
