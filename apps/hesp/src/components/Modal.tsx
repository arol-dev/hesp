import React from "react";

const Modal = ({ children, showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div
          className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
        >
          <div className="p-4">
            {children}
            <button onClick={closeModal} className="mt-4">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;