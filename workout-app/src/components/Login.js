import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import Cookies from "js-cookie"

export default function Login() {

    const validate = Yup.object({
        email: Yup.string().required("Required").email("Invalid email"),
        password: Yup.string().required("Required").min(6, "Password should be min 6 characters").max(12, "password should be max 12 charactors")

    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repassword: ''
        },
        validationSchema: validate,
        onSubmit: async (values) =>{
            const res = await fetch("http://localhost:4001/Login", {method: "GET", headers: {"Content-Type": "application/json"}})
            const data = await res.json()
            checkTheData(data)
            
        }
    })

    const checkTheData = (data) =>{
        const isUserData = data.find((each) => {
            if(each.email === formik.values.email && each.password === formik.values.password){
                return true
            }else{
                return false
            }
        })
        
        if(isUserData === undefined){
            alert("User not Register")
        }else{
            const token = isUserData.jwtToken
            Cookies.set("jwt_token", token, {expires: 30})
        }
    }

  return (
    <div>
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
            <div className='input-card'>
                <label htmlFor='email'>Email</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="text" id="email" name='email'/>
            </div>
            {formik.touched.email && formik.errors.email? <div>{formik.errors.email}</div>: null}
            <div className='input-card'>
                <label htmlFor='email'>Password</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" name="password"/>
            </div>
            {formik.touched.password && formik.errors.password? <div>{formik.errors.password}</div>: null}
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}
