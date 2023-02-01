import { useState } from "react";

interface Props {
  key: string;
  id: number;
  type: string;
  size: number;
  stock: number;
  price: number;
  orderCallback: (id: number, quantity: number) => Promise<void>;
  deleteCallback: () => void;
}

export default function ScrewCard(props: Props) {
  const { id, type, size, stock, price, deleteCallback, orderCallback } = props;
  const [quantity, setQuantity] = useState("");

  return (
    <>
      <div className="col-md-6 col-lg-4">
        <div className="card bg-light">
          <div className="card-header d-flex justify-content-end">
            <button
              type="button"
              className="btn-close btn-close-danger"
              aria-label="Close"
              onClick={deleteCallback}
            ></button>
          </div>
          <div className="card-body">
            <p className="card-text">{`Típus: ${type}`}</p>
            <p className="card-text">{`Méret: ${size} mm`}</p>
            <p className="card-text">{`Készlet: ${stock} db`}</p>
            <p className="card-text">{`Ár: ${price} Ft`}</p>
            <div
              className="d-flex justify-content-center mb-3"
              style={{ maxHeight: "3rem" }}
            >
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  if (quantity === "") {
                    return;
                  } else if (parseInt(quantity) <= 1) {
                    setQuantity("");
                  } else {
                    setQuantity((parseInt(quantity) - 1).toString());
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fff"
                  className="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                    stroke="#fff"
                    strokeWidth="1"
                  ></path>
                </svg>
              </button>
              <div className="form-floating mx-2">
                <input
                  className="form-control"
                  style={{ maxHeight: "3rem" }}
                  value={quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                ></input>
                <label className="mb-1">db:</label>
              </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  if (quantity === "") {
                    setQuantity("1");
                    return;
                  } else {
                    setQuantity((parseInt(quantity) + 1).toString());
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-dash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    stroke="#fff"
                    strokeWidth="1"
                  ></path>
                </svg>
              </button>
            </div>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={() => {
                if (quantity) {
                  orderCallback(id, parseInt(quantity));
                }
              }}
            >
              Rendelés
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
