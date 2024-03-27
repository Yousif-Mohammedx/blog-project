import React from 'react';
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, userNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/users";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "../../store/reducers/userReducers";

const RegisterPage = () => {
    const navigate = userNavigate()
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user)
    const { mutate, isLoading } = useMutation({
        mutationFn: ({ name, email, password }) => {
            return signup({ name, email, password });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message)
            console.log(error);
        },
    })

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);
    const { register, handleSubmit, formState: { errors, isValid },
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });
    const submitHandler = (data) => {
        console.log(data);
    };
    const password = watch('password');
    return (
        <MainLayout>
            <section className='container mx-auto px-5 py-10'>
                <div className='w-full max-w-sm mx-auto'>
                    <h1 className='font-roboto text-2xl font-bold text-center text-dark-hard mb-8'>Sign Up</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="name" className="text-[#5a7164] font-semibold block">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    minLength: {
                                        value: 1,
                                        message: "Name length must be at least 1 character",
                                    },
                                    required: {
                                        value: true,
                                        message: "Name is required",
                                    },
                                })}
                                placeholder="Enter name"
                                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`}
                            />
                            {errors.name?.message && (<p className='text-red-500 text-xs mt-1'>{errors.name?.message}</p>)}
                        </div>
                        <div className='flex flex-col mb-6 w-full'>
                            <label htmlFor="email" className='text-[#5a7164] font-semibold block'>Email</label>
                            <input type="email" id='email'
                                {...register("email", {
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Enter a valid email",
                                    },
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    }
                                })}
                                placeholder='Enter email'
                                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}
                            />
                            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
                        </div>
                        <div className='flex flex-col mb-6 w-full'>
                            <label htmlFor="password" className='text-[#5a7164] font-semibold block'>Password</label>
                            <input type="password" id='password' {...register("password",
                                {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password length must be at least 6 characters",
                                    },
                                })} placeholder='Enter password' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}
                            />
                            {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
                        </div>
                        <div className='flex flex-col mb-6 w-full'>
                            <label htmlFor="confirmPassword" className='text-[#5a7164] font-semibold block'>Confirm Password</label>
                            <input type="password" id='confirmPassword' {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "Confirm password is requierd"
                                },
                                validate: (value) => {
                                    if (value !== password) {
                                        return "Password do not match";
                                    }
                                },
                            })} placeholder='Enter Confirmation Password' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}
                            />
                            {errors.confirmPassword && <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword.message}</p>}
                        </div>
                        <Link to="/forgot-password" className='text-sm font-semitbold text-primary'>Forgot password?</Link>
                        <button type="submit" disabled={!isValid} className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>Register</button>
                        <p className='text-sm font-semibold text-[#5a7184]'>You have an account?
                            <Link to="/login" className='text-primary'> Login now</Link>
                        </p>
                    </form>
                </div>
            </section>
        </MainLayout>
    )
}

export default RegisterPage;