import { useEffect, useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ScrewCard from "./ScrewCard";
import * as bootstrap from "bootstrap";
import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import Toast from "./Toast";

class ScrewData {
  id!: number;
  type!: string;
  size!: number;
  stock!: number;
  price!: number;
}

class orderResponse {
  orderId!: number;
  screwId!: number;
  quantity!: number;
  total!: number;
}

const App = () => {
  const [screws, setScrews] = useState(new Set<ScrewData>());
  const [newType, setNewType] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [lastOrder, setLastOrder] = useState<orderResponse | null>(null);

  const toast = useRef<bootstrap.Toast | null>(null);

  const loadData = async () => {
    const response = await fetch("http://localhost:3000/api/screw");
    const data: Object[] = await response.json();

    setScrews(new Set(plainToInstance(ScrewData, data)));
  };

  const addScrew = async (screwData: Omit<ScrewData, "id">) => {
    const response = await fetch(`http://localhost:3000/api/screw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(screwData),
    });

    const data: Object = await response.json();

    setScrews(new Set(screws).add(plainToInstance(ScrewData, data)));
  };

  const deleteScrew = async (id: number) => {
    const target = [...screws].find((target) => target.id === id);

    const newSet = new Set(screws);
    newSet.delete(target!);
    setScrews(newSet);

    fetch(`http://localhost:3000/api/screw/${id}`, { method: "DELETE" });
  };

  const orderScrew = async (screwId: number, quantity: number) => {
    const response = await fetch(`http://localhost:3000/api/screw/rendeles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ screwId, quantity }),
    });

    const data: orderResponse = await response.json();

    setLastOrder(data);
    toast.current!.show();

    loadData();
  };

  useEffect(() => {
    loadData();

    toast.current = new bootstrap.Toast(document.querySelector(".toast")!, {
      animation: true,
      autohide: true,
      delay: 10000,
    });
  }, []);

  return (
    <>
      <div className="container my-4" style={{ maxWidth: "1024px" }}>
        <div className="row justify-content-start mx-auto mb-4">
          <div className="form-floating mb-3 col-sm-3">
            <input
              className="form-control"
              value={newType}
              onChange={(event) => {
                setNewType(event.target.value);
              }}
            ></input>
            <label className="mx-2 mb-1">Típus:</label>
          </div>

          <div className="form-floating mb-3 col-sm-3">
            <input
              className="form-control"
              value={newSize}
              onChange={(event) => {
                setNewSize(event.target.value);
              }}
            ></input>
            <label className="mx-2 mb-1">Méret (mm):</label>
          </div>

          <div className="form-floating mb-3 col-sm-3">
            <input
              className="form-control"
              value={newStock}
              onChange={(event) => {
                setNewStock(event.target.value);
              }}
            ></input>
            <label className="mx-2 mb-1">Készlet:</label>
          </div>

          <div className="form-floating mb-3 col-sm-3">
            <input
              className="form-control"
              value={newPrice}
              onChange={(event) => {
                setNewPrice(event.target.value);
              }}
            ></input>
            <label className="mx-2 mb-1">Ár:</label>
          </div>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={() => {
              if (newType && newSize && newStock && newPrice) {
                addScrew({
                  type: newType,
                  size: parseInt(newSize),
                  stock: parseInt(newStock),
                  price: parseFloat(newPrice),
                });
              }
            }}
          >
            Hozzáad
          </button>
        </div>

        <div className="row gx-3 gy-4 justify-content-start mx-auto">
          {[...screws].map((screw) => (
            <ScrewCard
              key={crypto.randomUUID()}
              id={screw.id}
              type={screw.type}
              stock={screw.stock}
              size={screw.size}
              price={screw.price}
              orderCallback={orderScrew}
              deleteCallback={() => deleteScrew(screw.id)}
            />
          ))}
        </div>
      </div>

      <Toast heading="A rendelés sikeresen leadva!">
        {lastOrder !== null && (
          <>
            <p>A rendelés részletei:</p>
            <p>Rendelés sorszáma: {lastOrder!.orderId}</p>
            <p>Csavar azonosítója: {lastOrder!.screwId}</p>
            <p>Csavar mennyisége: {lastOrder!.quantity} db</p>
            <p>Összeg: {lastOrder!.total} Ft</p>
          </>
        )}
      </Toast>
    </>
  );
};

export default App;
