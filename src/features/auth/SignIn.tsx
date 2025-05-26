'use client'

import {useForm} from 'react-hook-form';

import styles from './signIn.module.scss'
import {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface SignInProps {
    email: string
    password: string
    // onSubmit: (data: { email: string, password: string }) => void
}

export const SignIn = ({email, password, onSubmit}: SignInProps) => {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm(
        {
            defaultValues: {
                email: 'admin@gmail.com',
                password: 'admin'
            },
            mode: "onBlur"
        }
    )

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSumbitTest = (data) => {
        alert(JSON.stringify(data))
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSumbitTest)}>
                <h1>Sign In</h1>
                <div>
                    <span>Email</span>
                    <input {...register('email', {
                        required: 'The email is required',
                        pattern: {
                            message: 'The email match the format example@example.com',
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        }
                    })}/>
                        {errors?.email && <p>{errors?.email?.message || 'Some error'}</p>}
                </div>
                <div>
                    <span>Password</span>
                    <input type={showPassword ? 'password' : 'text'} {...register('password', {
                        required: 'The password is required',
                        minLength: {
                            value: 5,
                            message: 'Minimum of 5 characters'
                        }
                    })}/>
                    <span onClick={togglePasswordVisibility} className={styles.span}>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>
                    {errors?.password && <p>{errors?.password?.message || 'Some error'}</p>}
                </div>
                <div>
                    <button type={'submit'} onClick={() => {
                    }} disabled={!isValid}>Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};
