import React, { useRef } from 'react';
import './App.css';
import XModal from './components/modal';

function App() {
  const modalRef = useRef();

  // Listen for clicks on the app root
  const handleAppClick = (e) => {
    if (
      modalRef.current &&
      modalRef.current.isOpen() &&
      !modalRef.current.isClickInsideModal(e)
    ) {
      modalRef.current.closeModal();
    }
  };

  return (
    <div className="App" style={{ minHeight: "100vh" }} onMouseDown={handleAppClick}>
      <XModal ref={modalRef} />
    </div>
  );
}

export default App;
