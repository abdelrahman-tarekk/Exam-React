import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
export default function Register() {

  let {setuserLogin} =useContext(UserContext);

  const [errMsg, seterrMsg] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  let navigate = useNavigate()

  function submitForm(val){
          setisLoading(true);
          axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, val)
          .then(response => {
            setisLoading(false);
            console.log(response?.data?.token);
            console.log(response?.data);
            

      if(response.data.message === 'success'){
      setuserLogin(response?.data?.token);
      localStorage.setItem("usertoken", response?.data?.token);
      navigate("/");
    }


          }).catch(err => {
            setisLoading(false);
            seterrMsg(err?.response?.data?.message);
            console.log(err);
          })
        }




  let validationRegisterForm = Yup.object().shape({ 
    name:Yup.string().required("name is required").min(3,"min 3 letters").max(10,"max 10 letters"),
    email:Yup.string().required("email is required").email("invalid email"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{4,10}$/, "invalid password"),
    rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")], "password not match"),
    phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, "invalid phone")
  })

  let formik =useFormik({
    initialValues: {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    onSubmit:submitForm,
    validationSchema:validationRegisterForm,
    validateOnMount: true,
  })

  useEffect(() => {
  }, [])
  return (
    <>
  <section>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

    <div className="w-full bg-gray-100 rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-400">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-green-600 md:text-2xl">
          Create an account
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-green-600">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="your name"
              required
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-600">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-green-600">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              className="bg-gray-50 border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-green-600">Confirm password</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              className="bg-gray-50 border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.rePassword}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-green-600">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="01xxxxxxxxx"
              className="bg-gray-50 border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>

          {errMsg && (
            <p className="text-sm text-red-600">{errMsg}</p>
          )}

          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || isLoading}
            className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              ${!(formik.isValid && formik.dirty) || isLoading
              ? "bg-green-300 text-white cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white focus:ring-4 focus:outline-none focus:ring-green-300"}`}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Create an account"}
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-green-600 hover:underline dark:text-green-500">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
</>
  )
}