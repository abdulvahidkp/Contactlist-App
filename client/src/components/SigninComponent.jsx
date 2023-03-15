import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import {userState,removeErr} from '../redux/features/userSlice';
import { signin } from '../redux/Thunk/userThunk';

function SigninCom() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(userState)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password) return 
    dispatch(signin({email,password}))
  };

  useEffect(()=>{
    return () => {
      dispatch(removeErr());
    };
  },[])

  return (
    <>
    {user.isLogged && < Navigate to='/' /> }
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <p className="text-red-600">{user.login?.err.message}</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="border-2 border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-2 font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="border-2 border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 duration-200 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600" style={{ width: "120px", height: "40px" }}  disabled={user.login.isLoading}>
                {user.login.isLoading ? <svg className="animate-spin h-5 w-5 mx-auto border-t-2 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg> : "Login"}
            </button>
          </form>
          <div className='mt-3'>
            <p>don't have an account <Link to='/signup' className='hover:underline text-blue-600'>signup</Link></p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SigninCom;
