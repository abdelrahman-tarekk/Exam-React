import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {

  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [errMsg, seterrMsg] = useState(null)

  async function handleForgetPassword(values) {
    setisLoading(true)
    setMessage(null)
    seterrMsg(null)

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
      navigate('/VerifyResetCode')
      setMessage(data?.message)
    } catch (err) {
      seterrMsg(err?.response?.data?.message || 'Something went wrong')
    } finally {
      setisLoading(false)
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email'),
  })

  const formik = useFormik({
    initialValues: { email: '' },
    onSubmit: handleForgetPassword,
    validationSchema,
    validateOnMount: true,
  })

  return (
    <div className="flex flex-wrap flex-col mt-10">
      <h2 className="text-3xl font-bold text-green-600 mb-6">
        please enter your verification code
      </h2>

      <form onSubmit={formik.handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          />
          {formik.touched.email && formik.errors.email?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800"> {formik.touched.email && formik.errors.email}</span>
          </div>:null}
        </div>

        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty) || isLoading}
          className={`w-fit py-2 px-4 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            !(formik.isValid && formik.dirty) || isLoading
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Send Reset Code'}
        </button>
      </form>

      {message && (
        <div className="mt-4 text-green-600 text-center font-medium">
          {message}
        </div>
      )}

      {errMsg && (
        <div className="mt-4 text-red-600 text-center font-medium">
          {errMsg}
        </div>
      )}
    </div>
  )
}