import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"

export default function Register() {

    const validate = Yup.object({
        email: Yup.string().required("Required").email("Invalid email"),
        password: Yup.string().required("Required").min(6, "Password should be min 6 characters").max(12, "password should be max 12 charactors"),
        repassword: Yup.string().required("Required").oneOf([Yup.ref('password'), null], "password is not match")

    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repassword: ''
        },
        validationSchema: validate,
        onSubmit: async(values) =>{
            const newData = {
                email: values.email,
                password: values.password
            }
            const res = await fetch("http://localhost:4001/Login", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...newData, jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ"}) })
            const data = await res.json()
            console.log(data)
        }
    })
  return (
    <div className='register-card'>
        <form className='form-card' autoComplete='off' onSubmit={formik.handleSubmit}>
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
            <div className='input-card'>
                <label htmlFor='repassword'>Re-Password</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.repassword} type="password" id="repassword" name='repassword'/>
            </div>
            {formik.touched.repassword && formik.errors.repassword? <div>{formik.errors.repassword}</div>: null}
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}
