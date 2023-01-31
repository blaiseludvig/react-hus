interface Props {
  key: string;
  id: number;
  type: string;
  size: number;
  stock: number;
  price: number;
  deleteCallback: () => void;
}

export default function ScrewCard(props: Props) {
  const { type, size, stock, price, deleteCallback } = props;
  return (
    <div className="card bg-light mb-3 col-sm-4" style={{ maxWidth: "18rem" }}>
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
      </div>
    </div>
  );
}
