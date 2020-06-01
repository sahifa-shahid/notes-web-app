import React from 'react';
import './App.css';

import NewFileModal from './newFileModal'

export default function FrontPage({ open, setOpen, listID, setListID }) {
  return (
    <div className="side-page-container">
      <NewFileModal open={open} setOpen={setOpen} setListID={setListID} listID={listID} />
      <div className="front-page-container">
        <p style={{ color: 'black', fontSize: 50, fontFamily: 'Poppins-Regular' }}>
            Welcome to NOTESite!
        </p>
        <p style={{ color: 'black', fontSize: 20, fontFamily: 'Poppins-Light' }}>
            Click
            <a onClick={() => setOpen(true)}> here </a> 
            to get started!
        </p>
      </div>
    </div>
  );
};