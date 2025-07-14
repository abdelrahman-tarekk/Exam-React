import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/Cart.context';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartId, resetCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const validationSchema = Yup.object({
    details: Yup.string().required('Details is required'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Invalid phone'),
    city: Yup.string().required('City is required'),
  });

  const PayCash = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem('usertoken') } }
      );
      if (res?.data?.status === 'success') {
        toast.success('Order created successfully');
        resetCart();
        setTimeout(() => {
          navigate('/allorders');
        }, 1500);
      }
    } catch (err) {
      toast.error('Order failed');
    } finally {
      setLoading(false);
    }
  };

  const PayOnline = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem('usertoken') } }
      );
      if (res?.data?.status === 'success') {
        window.location.href = res?.data?.session?.url;
      }
    } catch (err) {
      toast.error('Failed to create checkout session');
    } finally {
      setLoading(false);
    }
  };

  const detectPayment = (values) => {
    if (isOnline) {
      PayOnline(values);
    } else {
      PayCash(values);
    }
  };

  const formik = useFormik({
    initialValues: { details: '', phone: '', city: '' },
    validationSchema,
    onSubmit: detectPayment,
    validateOnMount: true,
  });

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="details" className="block">Details</label>
          <input id="details" name="details" type="text" className="w-full border rounded p-2" {...formik.getFieldProps('details')} />
          {formik.touched.details && formik.errors.details && <p className="text-red-600 text-sm mt-1">{formik.errors.details}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block">Phone</label>
          <input id="phone" name="phone" type="tel" className="w-full border rounded p-2" {...formik.getFieldProps('phone')} />
          {formik.touched.phone && formik.errors.phone && <p className="text-red-600 text-sm mt-1">{formik.errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="city" className="block">City</label>
          <input id="city" name="city" type="text" className="w-full border rounded p-2" {...formik.getFieldProps('city')} />
          {formik.touched.city && formik.errors.city && <p className="text-red-600 text-sm mt-1">{formik.errors.city}</p>}
        </div>

        <button
          type="submit"
          onClick={() => setIsOnline(false)}
          disabled={!formik.isValid || loading}
          className={`w-full py-2 rounded text-white ${formik.isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-green-300 cursor-not-allowed'}`}
        >
          Pay Cash
        </button>

        <button
          type="submit"
          onClick={() => setIsOnline(true)}
          disabled={!formik.isValid || loading}
          className={`w-full py-2 rounded text-white ${formik.isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
        >
          Pay Online
        </button>
      </form>
    </div>
  );
}