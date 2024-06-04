import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const navigate = useNavigate();

  const [listOfCategories, setListofCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setListofCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const initialValues = {
    title: '',
    description: '',
    category: '',
    error: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.number().required('Category is required').nullable(),
  });

  const onSubmit = (data, { setSubmitting, setErrors }) => {
    axios.post('http://localhost:5000/products', data)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        setErrors({ error: 'There was an error submitting the form' });
        console.error('There was an error creating the product!', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="createProductPage bg-black text-red-500">
      <h1 className="mb-6 text-2xl font-bold leading-none tracking-tight text-red-300 md:text-3xl lg:text-4xl">Create products</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form className="formContainer flex flex-col bg-red-800 w-2/5 m-auto p-5 rounded-lg shadow-md">
            <ErrorMessage name="title" component="span" className="text-red-500" />
            <label htmlFor="title" className="text-red-300">Title:</label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="p-2 my-4 bg-red-900 border border-red-700 rounded-md shadow-sm focus:outline-none focus:border-red-500 text-red-100"
            />
            <ErrorMessage name="description" component="span" className="text-red-500" />
            <label htmlFor="description" className="text-red-300">Description:</label>
            <Field
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              className="p-2 my-4 bg-red-900 border border-red-700 rounded-md shadow-sm focus:outline-none focus:border-red-500 text-red-100"
            />
            <ErrorMessage name="category" component="span" className="text-red-500" />
            <label htmlFor="category" className="text-red-300 mt-2">Category:</label>
            <Field
              as="select"
              id="category"
              name="category"
              className="p-2 my-4 bg-red-900 border border-red-700 rounded-md shadow-sm focus:outline-none focus:border-red-500 text-red-100"
            >
              <option value="" label="Select category" />
              {listOfCategories.map((value, key) => (
                <option key={key} value={value.id} className="bg-red-900 text-red-100">{value.title}</option>
              ))}
            </Field>
            <ErrorMessage name="error" component="div" className="text-red-500" />
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
  
}

export default CreateProduct;
