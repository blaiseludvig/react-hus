import { useEffect, useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import MeatCard from "./MeatCard";
import * as bootstrap from "bootstrap";
import "reflect-metadata";
import { plainToInstance } from "class-transformer";

class MeatData {
  id!: number;
  animal!: string;
  type!: string;
  cut!: string;
  price!: number;
}

const App = () => {
  const [meats, setMeats] = useState(new Set<MeatData>());
  const [newAnimal, setNewAnimal] = useState("");
  const [newType, setNewType] = useState("");
  const [newCut, setNewCut] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const loadData = async () => {
    const response = await fetch("http://localhost:3000/api/meat");
    const data: Object[] = await response.json();

    setMeats(new Set(plainToInstance(MeatData, data)));
  };

  const addMeat = async (meatData: Omit<MeatData, "id">) => {
    const response = await fetch(`http://localhost:3000/api/meat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meatData),
    });

    const data: Object = await response.json();

    setMeats(new Set(meats).add(plainToInstance(MeatData, data)));
  };

  const deleteMeat = async (id: number) => {
    const target = [...meats].find((target) => target.id === id);

    const newSet = new Set(meats);
    newSet.delete(target!);
    setMeats(newSet);

    fetch(`http://localhost:3000/api/meat/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    loadData();
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
            <label className="mx-2 mb-1">Állat:</label>
          </div>

          <div className="form-floating mb-3 col-sm-3">
            <input
              className="form-control"
              value={newAnimal}
              onChange={(event) => {
                setNewAnimal(event.target.value);
              }}
            ></input>
            <label className="mx-2 mb-1">Típus:</label>
          </div>

          <div className="form-floating mb-3 col-sm-3">
            <input
              className="form-control"
              value={newCut}
              onChange={(event) => {
                setNewCut(event.target.value);
              }}
            ></input>
            <label className="mx-2 mb-1">Rész:</label>
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
              if (newType && newAnimal && newCut && newPrice) {
                addMeat({
                  animal: newAnimal,
                  type: newType,
                  cut: newCut,
                  price: parseFloat(newPrice),
                });
              }
            }}
          >
            Hozzáad
          </button>
        </div>

        <div className="row gx-3 gy-4 justify-content-start mx-auto">
          {[...meats].map((meat) => (
            <MeatCard
              key={crypto.randomUUID()}
              id={meat.id}
              animal={meat.animal}
              type={meat.type}
              cut={meat.cut}
              price={meat.price}
              deleteCallback={() => deleteMeat(meat.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
