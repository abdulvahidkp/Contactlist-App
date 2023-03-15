import React, { useEffect, useState } from "react";

function ContactAdd({ isOpen, setIsOpen }) {

  const [username,setUsername] = useState('');
  const [number,setNumber] = useState(null);
  const [email,setEmail] = useState('');

  useEffect(()=>{
    return () => {
      setEmail('')
      setNumber(null)
      setUsername('')
    }
  },[])

  const handleNewContact = () => {
    
  }

  

  return (
    <>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 ${isOpen ? "flex align-middle justify-center" : "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}
      >
        <div className="relative w-full h-full max-w-md md:h-auto ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={() => setIsOpen(false)}
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">New Contact</h3>
              <form className="space-y-6" action="#" onSubmit={(e)=>handleNewContact(e)}>
                <div className="flex flex-col mb-6">
                  <label htmlFor="username" className="mb-2 font-semibold text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-2 border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="number" className="mb-2 font-semibold text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    id="number"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="border-2 border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 duration-200 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600" style={{ width: "120px", height: "40px" }}>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactAdd;
