import React, { useEffect, useState } from "react";
import LeftSide from "./LeftSide";
import { API_URLS } from "../configs/urls";
import { httpPost } from "../utils/http";

interface CartItem {
  id: string;
  fullName: string;
  productName: string;
  qty: number;
}

const CheckOut: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getCartData = async () => {
    const session = localStorage.getItem("uid");
    if (session) {
      try {
        const res = await httpPost(API_URLS.GET_CART_DATA, { userId: session });
        setCartItems(res.myData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <LeftSide />
          </div>
          <div className="col-md-8">
            <div className="col-md-12 contact-us py-3 px-3 mb-4">
              <p>Check Out</p>
            </div>
            <div className="col-md-12 pt-3 pb-5 border mb-4">
              <div className="col-md-11 m-auto">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User Name</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.fullName}</td>
                        <td>{item.productName}</td>
                        <td>{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
