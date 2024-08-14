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
    <div className="container">
      <div className="row">
        <div className="col-12 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Colour, Type..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="col-md-3">
          <div className="filters">
            <h4>Colors</h4>
            {["Red", "Blue", "Green"].map((color) => (
              <div key={color}>
                <input
                  type="checkbox"
                  id={color}
                  value={color}
                  onChange={() => handleFilterChange("colors", color)}
                />
                <label htmlFor={color}>{color}</label>
              </div>
            ))}

            <h4>Gender</h4>
            {["Men", "Women"].map((gender) => (
              <div key={gender}>
                <input
                  type="checkbox"
                  id={gender}
                  value={gender}
                  onChange={() => handleFilterChange("gender", gender)}
                />
                <label htmlFor={gender}>{gender}</label>
              </div>
            ))}

            <h4>Price</h4>
            {["0-RS250", "RS251-450", "RS450"].map((price) => (
              <div key={price}>
                <input
                  type="checkbox"
                  id={price}
                  value={price}
                  onChange={() => handleFilterChange("price", price)}
                />
                <label htmlFor={price}>{price}</label>
              </div>
            ))}

            <h4>Type</h4>
            {["Polo", "Hoodie", "Basic"].map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  id={type}
                  value={type}
                  onChange={() => handleFilterChange("type", type)}
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <div className="row">
            {filteredItems.map((item) => (
              <div className="col-md-3 mb-4" key={item.id}>
                <Card product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


