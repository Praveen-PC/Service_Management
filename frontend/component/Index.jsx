import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import Heaader from "./common/Heaader";

const Index = () => {
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [motorName, setMotorName] = useState("");
  const [motorType, setMotorType] = useState("");
  const [product, setProduct] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [solvedQuantity, setSolvedQuantity] = useState("0");
  const [remarks, setRemarks] = useState("");
  const [person, setPerson] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/", {
        company,
        date,
        motorName,
        motorType,
        product,
        type,
        quantity,
        solvedQuantity,
        remarks,
        person,
      })
      .then((res) => {
        console.log(res.data);
        console.log("Data is inserted");
        setCompany("");
        setDate("");
        setMotorName("");
        setMotorType("");
        setProduct("");
        setType("");
        setQuantity("");
        setSolvedQuantity("0");
        setRemarks("");
        setPerson("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Heaader />
      <div className="container">
        <div className="shadow-lg mt-4 p-4 bg-body rounded border">
          <h1 className="text-center text-primary mb-4">In & Out</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">
                Company:
              </label>
              <input
                type="text"
                className="form-control"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                placeholder="Enter Company Name"
              />
            </div>
            <div className="row">
  <div className="col-lg-6 col-md-6 col-sm-12">
    <div className="mb-3">
      <label htmlFor="product" className="form-label">
        Motor Name:
      </label>
      <select
        className="form-select"
        id="product"
        value={motorName}
        onChange={(e) => setMotorName(e.target.value)}
        required
      >
        <option value="">Select Motor</option>
        <option value="SI21">SI21</option>
        <option value="SI22">SI22</option>
        <option value="Hexmoto">Hexmoto</option>
      </select>
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-12">
    <div className="mb-3">
      <label htmlFor="type" className="form-label">
        Motor Type:
      </label>
      <select
        className="form-select"
        id="type"
        value={motorType}
        onChange={(e) => setMotorType(e.target.value)}
        required
      >
        <option value="">Select Motor Type</option>
        {motorName === "SI21" && (
          <>
            <optgroup label="AC-Motor">
              <option value="3HP AC">3HP AC</option>
              <option value="5HP AC">5HP AC</option>
              <option value="7.5HP AC">7.5HP AC</option>
            </optgroup>
            <optgroup label="DC-Motor">
              <option value="3HP DC">3HP DC</option>
              <option value="5HP DC">5HP DC</option>
              <option value="7.5HP DC">7.5HP DC</option>
            </optgroup>
          </>
        )}
        {motorName === "SI22" && (
          <>
            <optgroup label="AC-Motor">
              <option value="1HP AC">1HP AC</option>
              <option value="2HP AC">2HP AC</option>
              <option value="3HP AC">3HP AC</option>
            </optgroup>
            <optgroup label="DC-Motor">
              <option value="1HP DC">1HP DC</option>
              <option value="2HP DC">2HP DC</option>
              <option value="3HP DC">3HP DC</option>
            </optgroup>
          </>
        )}
        {motorName === "Hexmoto" && (
          <>
            <optgroup label="AC-Motor">
              <option value="1HP AC">1HP AC</option>
              <option value="3HP AC">3HP AC</option>
              <option value="5HP AC">5HP AC</option>
              <option value="7.5HP AC">7.5HP AC</option>
              <option value="10HP AC">10HP AC</option>
            </optgroup>
            <optgroup label="DC-Motor">
              <option value="1HP DC">1HP DC</option>
              <option value="3HP DC">3HP DC</option>
              <option value="5HP DC">5HP DC</option>
              <option value="7.5HP DC">7.5HP DC</option>
              <option value="10HP DC">10HP DC</option>
            </optgroup>
          </>
        )}
      </select>
    </div>
  </div>
</div>


     

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="mb-3">
                  <label htmlFor="product" className="form-label">
                    Product:
                  </label>
                  <select
                    className="form-select"
                    id="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                  >
                    <option value="">Select Repaired Product</option>
                    <option value="pcb">PCB</option>
                    <option value="rmu">RMU</option>
                    <option value="controller">CONTROLLER</option>
                    <option value="keypad">KEYPAD</option>
                    <option value="accessories">ACCESSORIES</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type:
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select Return Type</option>
                    <option value="returnable">RETURNABLE</option>
                    <option value="non-returnable">NON-RETURNABLE</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                placeholder="Enter Number of Repaired Quantity"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="remarks" className="form-label">
                Remarks:
              </label>
              <textarea
                className="form-control"
                id="remarks"
                rows="3"
                placeholder="Leave a comment here"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="person" className="form-label">
                By:
              </label>
              <input
                type="text"
                className="form-control"
                id="person"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                required
                placeholder="Enter Your Name"
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary px-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;


