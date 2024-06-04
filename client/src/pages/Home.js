import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function Home() {
  const [listOfProducts, setListofProducts] = useState([]);
  const [listOfCategories, setListofCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Número de productos por página

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((response) => {
      setListofProducts(response.data);
    });
    axios.get("http://localhost:5000/categories").then((response) => {
      setListofCategories(response.data);
    });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listOfProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-black text-red-500">
      <h1 className="mb-6 text-2xl font-bold leading-none tracking-tight text-red-300 md:text-3xl lg:text-4xl">Products</h1>
      {currentProducts.map((product, key) => {
        const category = listOfCategories.find(cat => cat.id === product.category);
        return (
          <div
            key={key}
            className="flex flex-col justify-center w-64 m-auto my-5 p-2 shadow-md rounded-lg bg-red-800"
          >
            <Link className="" to={`/products/${product.id}`}>
              <div className="bg-red-600 text-white text-xl font-semibold p-2 rounded-t-lg">
                {product.title}
              </div>
            </Link>
            <div className="text-red-300 p-2"> {product.description} </div>
            <div className="text-red-300 p-2">{category ? category.title : ""}</div>
          </div>
        );
      })}
      <div className="mt-4 flex justify-center">
        {[...Array(Math.ceil(listOfProducts.length / productsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-1"
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
  
}

export default Home