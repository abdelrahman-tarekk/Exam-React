import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { setuserLogin } = useContext(UserContext)
  const [errMsg, seterrMsg] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function handleLogin(values) {
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then(res => {
        setisLoading(false)
        if (res.data.message === 'success') {
          setuserLogin(res.data.token)
          localStorage.setItem("usertoken", res.data.token)
          navigate('/')
        }
      }).catch(err => {
        setisLoading(false)
        seterrMsg(err?.response?.data?.message || "Login failed. Please try again.")
      })
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
      .matches(/^[A-Z][a-z0-9]{4,10}$/, "Invalid password format")
  })

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: handleLogin,
    validationSchema,
    validateOnMount: true
  })

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-600 md:text-2xl">
              Sign in to your account
            </h1>
            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-600">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-green-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-green-600">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-green-200 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  {showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(false)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    />
                  )}
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                )}
              </div>

              {errMsg && (
                <p className="text-sm text-red-600">{errMsg}</p>
              )}

              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty) || isLoading}
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
                  ${!(formik.isValid && formik.dirty) || isLoading
                    ? 'bg-green-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300'}`}
              >
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Sign in"}
              </button>

              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{' '}
                <a href="/register" className="font-medium text-green-600 hover:underline">
                  Register
                </a>
              </p>
              <p className="text-sm font-light text-gray-500">
                {' '}
                <a href="/forgetPassword" className="font-medium text-green-600 hover:underline">
                  Forget Password
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
