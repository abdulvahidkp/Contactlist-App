import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import toast,{ Toaster } from "react-hot-toast";

import ContactAdd from './ContactAddComponent'

import { userState,userLogout } from "../redux/features/userSlice";
import { Modal } from "@mui/material";

function ContactListPage() {
  const [contacts, setContacts] = useState([{ id: "r24234", name: "abdulvahidkp", email: "adula@gmail.cmo", phone: "9995278914" }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const [isOpen,setIsOpen] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch contacts from server
    // and set the contacts state
  }, []);

  const user = useSelector(userState);

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleLogout = () => {
    swal({
      title: 'Do you want to logout',
      text: 'Are you sure you want to logout',
      icon: 'warning',
      buttons: ['Cancel', 'Sure'],
    }).then((confirm)=>{
      if(confirm){
        dispatch(userLogout())
        navigate('/signin')
      }
    })
  }

  return (
    <>
      <ContactAdd isOpen={isOpen} setIsOpen={setIsOpen}/>
    <div className={`bg-gray-100  min-h-screen duration-75 ${isOpen && 'blur-sm'}`}>
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-lg font-bold capitalize text-gray-800">{user.username}'s Contacts</h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-4 duration-200" onClick={(e)=>setIsOpen(true)}>Add Contact</button>
              </div>
              <div className="relative">
                <input
                  type="search"
                  className="bg-white shadow-inner focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-64 appearance-none leading-normal"
                  placeholder="Search contacts"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <div className="ml-4">
                <button className="bg-red-500 hover:bg-red-600 duration-200 text-white py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 font-mono">CONTACT LISTS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <div onClick={(e) => setSelectedContact(contact)} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300" key={contact.id}>
              <div className="flex items-center mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">{contact.name}</h2>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
              </div>
              <a className="text-gray-700 mb-2">{contact.phone}</a>
            </div>
          ))}
        </div>
        {selectedContact && (
          <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Details</h3>
                  <div className="mt-5">
                    <p className="text-gray-900">{selectedContact.name}</p>
                    <p className="text-gray-600">{selectedContact.email}</p>
                    <p className="text-gray-600">{selectedContact.phone}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setSelectedContact(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    </>
  );
}

export default ContactListPage;
