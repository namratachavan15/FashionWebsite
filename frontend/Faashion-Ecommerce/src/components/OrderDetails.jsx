// OrderDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8081/orders/${id}`
      );

      setOrder(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  if (!order) {
    return <h2>Loading...</h2>;
  }

  const total =
    order.items?.reduce(
      (sum, item) =>
        sum +
        item.product.price * item.quantity,
      0
    ) || 0;

  return (

    <div
      style={{
        padding: "50px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          background: "#fff",
          padding: "30px",
        }}
      >

        <h1>Order Details</h1>

        <h3>
          Order ID :
          {order.id}
        </h3>

        <h3>
          Total :
          ₹{total}
        </h3>

        <div className="row mt-5">

          {order.items?.map((item, index) => (

            <div
              className="col-lg-4 col-md-6 col-12 mb-4"
              key={index}
            >

              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                }}
              >

                <img
                  src={item.product.image}
                  alt=""
                  className="img-fluid"
                  style={{
                    height: "350px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />

                <h4 className="mt-3">
                  {item.product.name}
                </h4>

                <p>
                  ₹{item.product.price}
                </p>

                <p>
                  Quantity :
                  {item.quantity}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
};

export default OrderDetails;