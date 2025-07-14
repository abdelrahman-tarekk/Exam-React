import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function VerifyResetCode() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const navigate = useNavigate();

  async function handleVerify(values) {
    setIsLoading(true)
    setSuccessMsg(null)
    setErrorMsg(null)

    try {
      const { data } = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
      navigate('/ResetPassword')

      setSuccessMsg('Code is correct')
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || 'Invalid or expired code')
    } finally {
      setIsLoading(false)
    }
  }

  const validationSchema = Yup.object().shape({ 
    resetCode: Yup.string()
      .required('Reset code is required')
      .matches(/^\d{6}$/, 'Code must be 6 digits'),
  })

  const formik = useFormik({
    initialValues: { resetCode: '' },
    onSubmit: handleVerify,
    validationSchema,
    validateOnMount: true,
  })

  return (
    <div className="flex flex-wrap flex-col mt-10">
      <h2 className="text-3xl font-bold text-green-600 mb-6">
        reset your account password
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
            Enter the 6-digit code
          </label>
          <input
            id="resetCode"
            name="resetCode"
            type="text"
            maxLength="6"
            value={formik.values.resetCode}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          />
          {formik.touched.resetCode && formik.errors.resetCode?
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800">{formik.errors.resetCode}</span>
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
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Verify Code'}
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

      {errorMsg && (
          <div className="bg-red-200 px-6 py-3 mx-2 my-1.5 rounded-md  text-lg flex items-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
          </path>
          </svg>
          <span className="text-red-800">{errorMsg}</span>
          </div>
      )}
    </div>
  )
}