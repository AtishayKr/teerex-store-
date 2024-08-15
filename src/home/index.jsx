import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { fetchCatalogue } from "../features/catalogue/catalogueSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.catalogue);

  const [filters, setFilters] = useState({
    colors: [],
    gender: [],
    price: [],
    type: [],
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCatalogue());
    }
  }, [status, dispatch]);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const newValues = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: newValues };
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredItems = items.filter((item) => {
    const matchesFilters =
      (filters.colors.length === 0 || filters.colors.includes(item.color)) &&
      (filters.gender.length === 0 || filters.gender.includes(item.gender)) &&
      (filters.price.length === 0 ||
        filters.price.some((range) => {
          const [min, max] = range.split("-").map((p) => parseInt(p.replace("RS", ""), 10));
          return item.price >= min && (max ? item.price <= max : true);
        })) &&
      (filters.type.length === 0 || filters.type.includes(item.type));

    const matchesSearchTerm =
      item.name.toLowerCase().includes(searchTerm) ||
      item.color.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm);

    return matchesFilters && matchesSearchTerm;
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="container mt-2" >
        <div className="input-group">
          <input
            type="text"
            className="form-control rounded"
            placeholder="Search by Name, Colour, Type..."
            value={searchTerm} onChange={handleSearchChange}
          />
          <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init>search</button>
        </div>

        <div className="row mt-4">
          <div className="col-md-3 text-start">
            <div className="card shadow-sm p-3 mb-4 sticky-md-top" style={{ top: '5px', height: 'auto' }}>
              <div className="card-body">
                <h4 className="card-title">Colors</h4>
                {["Red", "Blue", "Green"].map((color) => (
                  <div key={color} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={color}
                      value={color}
                      onChange={() => handleFilterChange("colors", color)}
                    />
                    <label className="form-check-label" htmlFor={color}>
                      {color}
                    </label>
                  </div>
                ))}

                <h4 className="card-title mt-4">Gender</h4>
                {["Men", "Women"].map((gender) => (
                  <div key={gender} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={gender}
                      value={gender}
                      onChange={() => handleFilterChange("gender", gender)}
                    />
                    <label className="form-check-label" htmlFor={gender}>
                      {gender}
                    </label>
                  </div>
                ))}

                <h4 className="card-title mt-4">Price</h4>
                {["0-250", "251-450", "450+"].map((price) => (
                  <div key={price} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={price}
                      value={price}
                      onChange={() => handleFilterChange("price", price)}
                    />
                    <label className="form-check-label" htmlFor={price}>
                      {price}
                    </label>
                  </div>
                ))}

                <h4 className="card-title mt-4">Type</h4>
                {["Polo", "Hoodie", "Basic"].map((type) => (
                  <div key={type} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={type}
                      value={type}
                      onChange={() => handleFilterChange("type", type)}
                    />
                    <label className="form-check-label" htmlFor={type}>
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-9 mx-auto">
            <div className="row justify-content-center">
              {filteredItems.map((item) => (
                <div className="col-md-4 mb-4 d-flex justify-content-center" key={item.id}>
                  <Card product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


