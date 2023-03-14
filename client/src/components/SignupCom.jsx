import axios from '../api/axios';
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { signup } from '../api/userApi/userApi.js'

function SignupCom() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [err,setErr] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!username || !email || !password ) return setErr(true)
    try {
      let data = signup({username,email,password})
      navigate('/signin')
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6">
              <label htmlFor="username" className="mb-2 font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="border-2 border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
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
                required
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
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>
          </form>
          <div className='mt-3'>
            <p>already have an account <Link to='/signin' className='hover:underline text-blue-600'>signin</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupCom;
