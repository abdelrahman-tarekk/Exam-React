import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const navigate = useNavigate()

  async function handleReset(values) {
    setIsLoading(true)
    setErrMsg(null)
    setSuccessMsg(null)

    try {
      const { data } = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        {
          email: values.email,
          newPassword: values.password,
        }
      )
      setSuccessMsg(data.message)
      setTimeout(() => navigate('/login'), 1000)
    } catch (err) {
      setErrMsg(err?.response?.data?.message || 'Error resetting password')
    } finally {
      setIsLoading(false)
    }
  }

  const validationSchema = Yup.object().shape({ 
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{4,10}$/, "invalid password"),
    confirmPassword: Yup.string().required("repassword is required").oneOf([Yup.ref("password")], "password not match"),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: handleReset,
    validationSchema,
    validateOnMount: true,
  })

  return (
          <div className="flex flex-wrap flex-col mt-10">
      <h2 className="text-3xl font-bold text-green-600 mb-6">
        Reset Your Password
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />

          {formik.touched.email && formik.errors.email?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800">{formik.errors.email}</span>
          </div>:null}


        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />

          {formik.touched.password && formik.errors.password ?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800">{formik.errors.password}</span>
          </div>:null}


        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />

          {formik.touched.confirmPassword && formik.errors.confirmPassword?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800">{formik.errors.confirmPassword}</span>
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
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Reset Password'}
        </button>
      </form>

      {successMsg && (
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800">{successMsg}</span>
          </div>

      )}
      {errMsg && (
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800">{errMsg}</span>
          </div>
      )}
    </div>
  )
}