import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productObject, setProductObject] = useState(null);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/products/byId/${id}`).then((response) => {
      setProductObject(response.data);
      setEditData({
        title: response.data.title,
        description: response.data.description,
        category: response.data.category,
      });
    });

    axios.get('http://localhost:5000/categories').then((response) => {
      setListOfCategories(response.data);
    });
  }, [id]);

  if (!productObject) return <div>Cargando...</div>;

  const category = listOfCategories.find(cat => cat.id == productObject.category);

  const handleDelete = async () => {
    setIsDialogOpen(false);
    try {
      await axios.delete(`http://localhost:5000/products/deleteById/${id}`);
      navigate('/');  // Redirige a la lista de productos después de eliminar
    } catch (error) {
      console.error('Error eliminando el producto:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, editData);
      setProductObject(editData);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error actualizando el producto:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-black text-red-500">
      <div className="flex flex-col justify-center w-11/12 m-auto my-5 p-2 shadow-md rounded-lg bg-red-800">
        {!isEditMode ? (
          <>
            <Link className="" to={`/products/${productObject.id}`}>
              <div className="bg-red-600 text-white text-xl font-semibold p-2 rounded-t-lg">
                {productObject.title}
              </div>
            </Link>
            <div className="text-red-300 p-2">{productObject.description}</div>
            <div className="text-red-300 p-2">{category ? category.title : ""}</div>
            <div className="flex justify-end">
              <span className="text-red-500 self-end p-2 font-light">
                {productObject.updatedAt !== productObject.createdAt ? (
                  `Editado: ${formatDate(productObject.updatedAt)}`
                ) : (
                  `Creado: ${formatDate(productObject.createdAt)}`
                )}
              </span>
              <button
                onClick={() => setIsEditMode(true)}
                className="self-end bg-yellow-400 hover:bg-yellow-500 text-white font-semibold hover:text-white py-1 px-2 border border-yellow-500 hover:border-transparent rounded ml-2"
              >
                Editar
              </button>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="self-end bg-red-400 hover:bg-red-500 text-white font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded ml-2"
              >
                Eliminar
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEdit}>
            <div className="bg-red-600 text-white text-xl font-semibold p-2 rounded-t-lg">
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleChange}
                className="bg-red-600 text-white text-xl font-semibold p-2 rounded-t-lg w-full"
              />
            </div>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="text-red-300 p-2 w-full"
            />
            <select
              name="category"
              value={editData.category}
              onChange={handleChange}
              className="text-red-300 p-2 w-full"
            >
              {listOfCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
  
};

export default ProductDetail;
