import { useState } from "react";

interface Props {
  key: string;
  id: number;
  animal: string;
  type: string;
  cut: string;
  price: number;
  deleteCallback: () => void;
}

export default function MeatCard(props: Props) {
  const { animal, type, cut, price, deleteCallback } = props;

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
            <p className="card-text">{`Állat: ${animal}`}</p>
            <p className="card-text">{`Típus: ${type}`}</p>
            <p className="card-text">{`Rész: ${cut}`}</p>
            <p className="card-text">{`Ár: ${price} Ft/kg`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
