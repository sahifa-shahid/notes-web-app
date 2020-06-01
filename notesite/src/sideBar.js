import React, { useState } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon, Dropdown, Divider } from 'rsuite';

import './App.css';
import NotesPage from './notesPage';
import NewFileModal from './newFileModal';
import FrontPage from './frontPage';

export default function SideBar() {
  const [open, setOpen] = useState(false)
  const [listID, setListID] = useState([])
  const [index, setIndex] = useState(0)

  return (
    <div>
      <div className="sidebar-area">
        <Dropdown.Menu style={{ width: 200, borderRadius: 0, backgroundColor: '#C0C0C0' }}>
          <div className="title-container">
            <Icon icon="lightbulb-o" size='2x' style={{ paddingRight: 5 }}></Icon>
            <p style={{ fontFamily: 'Poppins-Regular', fontSize: 28, flex: 0, display: 'inline-block' }}>NOTESite</p>
          </div>
          <NewFileModal open={open} setOpen={setOpen} setListID={setListID} listID={listID} />
          <Dropdown.Item onSelect={() => setOpen(true)}>
            <Icon icon="plus" />New File
          </Dropdown.Item>
          <Divider style={{ marginTop: 6, marginBottom: 6 }} />
          {listID.map(function(item, index) {
            return (
              <Dropdown.Item onSelect={() => setIndex(index)}>{item.title}</Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </div>
      {listID.length === 0 ? <FrontPage open={open} setOpen={setOpen} setListID={setListID} listID={listID}/> : <NotesPage setListID={setListID} listID={listID} index={index}/>} 
    </div>
  )
};
