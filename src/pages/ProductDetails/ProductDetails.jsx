import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { CartContext } from '../../Context/Cart.context';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addTocart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error('Product ID is undefined or missing');
        setError('معرف المنتج غير موجود');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching product with ID:', id); // للتأكد من المعرف
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}` );
        setProduct(data.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch product', error);
        setError('حدث خطأ أثناء جلب بيانات المنتج');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-green-500 text-4xl" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center mt-20">
        <div className="text-red-500 text-xl font-bold mb-4">
          {error || 'لم يتم العثور على المنتج!'}
        </div>
        <p className="text-gray-600 mb-4">
          قد يكون المعرف غير صحيح أو غير موجود.
        </p>
        <Link to="/" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-lg shadow-lg">
        <div className="lg:w-1/2">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded-lg border"
          />
        </div>

        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 text-md">{product.description}</p>

          <div className="text-xl text-green-600 font-bold">
            {product.price} EGP
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-semibold">Brand: </span>
            {product.brand?.name || 'N/A'}
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-semibold">Category: </span>
            {product.category?.name || 'N/A'}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-gray-600">{product.ratingsAverage} / 5</span>
          </div>

          <button
            onClick={() => addTocart(product._id)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
