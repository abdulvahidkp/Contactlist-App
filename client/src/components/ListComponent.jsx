import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";

import { getContacts } from "../redux/Thunk/contactThunk";
import ContactAdd from "./ContactAddComponent";
import ContactEdit from "./ContactEditComponent";

import { userState, userLogout } from "../redux/features/userSlice";
import axios from "../api/axios";
import { clearContacts, contactState, deleteContact } from "../redux/features/contactSlice";

function ContactListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [edit_id, setEdit_id] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector(contactState);
  const user = useSelector(userState);

  useEffect(() => {
    const getContact = async () => {
      dispatch(getContacts());
    };
    getContact();
  }, []);

  const filteredContacts = contacts.contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleLogout = () => {
    swal({
      title: "Do you want to logout",
      text: "Are you sure you want to logout",
      icon: "warning",
      buttons: ["Cancel", "Sure"],
    }).then((confirm) => {
      if (confirm) {
        dispatch(clearContacts());
        dispatch(userLogout());
        navigate("/signin");
      }
    });
  };

  const handleDelete = async (num) => {
    swal({
      title: "Do you want to delete",
      text: "Are you sure you want to delete",
      icon: "warning",
      buttons: ["Cancel", "Sure"],
    }).then(async(confirm)=>{
      if(!confirm) return
      let userToken = localStorage.getItem("user");
      let { data } = await axios.delete(`/api/contact?number=${num}`, {
        headers: {
          Authorization: userToken,
        },
      });
      dispatch(deleteContact(num));
    })
  };

  return (
    <>
      <ContactAdd isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`bg-gray-100  min-h-screen duration-75 ${isOpen && "blur-sm"}`}>
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
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-4 duration-200" onClick={(e) => setIsOpen(true)}>
                    Add Contact
                  </button>
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
                  <button className="bg-red-500 hover:bg-red-600 duration-200 text-white py-2 px-4 rounded" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 font-mono">CONTACT LISTS</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.isLoading ? (
              <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : filteredContacts.length ? (
              filteredContacts.map((contact, key) => (
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg flex justify-between transition duration-300" key={contact.id}>
                  <div onClick={(e) => setSelectedContact(contact)}>
                    <div className="flex items-center mb-4">
                      <div>
                        <h2 className="text-lg font-medium text-gray-800">{contact.name}</h2>
                        <p className="text-gray-600">{contact.email}</p>
                      </div>
                    </div>
                    <a className="text-gray-700 mb-2">{contact.number}</a>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <button className="p-1 bg-green-600 rounded text-white hover:bg-green-700 duration-200 w-16" onClick={() => setEdit_id(key)}>
                        Edit
                      </button>
                    </div>
                    <div>
                      <button className="p-1 bg-red-600 rounded text-white hover:bg-red-700 duration-200 w-16" onClick={() => handleDelete(contact.number)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  {edit_id === key && <ContactEdit setEdit_id={setEdit_id} email={contact.email} name={contact.name} number={contact.number} />}
                </div>
              ))
            ) : (
              <p className="text-2xl font-bold text-gray-600">No Contacts Available</p>
            )}
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
                      <p className="text-gray-600">{selectedContact.number}</p>
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
