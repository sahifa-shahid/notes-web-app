import React, { useState } from 'react';
import { ButtonGroup, ButtonToolbar, IconButton, Icon, Alert } from 'rsuite';

import './App.css';
import DeleteFileModal from './deleteFileModal'

export default function NotesPage({listID, setListID, index }) {
  const [openWarning, setOpenWarning] = useState(false)

  function save(text) {
    let copy = listID
    copy[index].data = text
    setListID([...copy])
  }

  console.log(listID)

  async function saveDoc() { 
    try {
      let headers = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ '_id': listID[index]._id, 'data': listID[index].data }),
      }
      await fetch('/saveNote', headers);
      Alert.success('The document has been saved!')
    }
    catch (error) {
      console.error(error);
      Alert.error('Sorry, an error occurred! Please try again')
    }
  }

  return (
    <div className="side-page-container">
      <DeleteFileModal openWarning={openWarning} setOpenWarning={setOpenWarning} setListID={setListID} listID={listID} index={index}/>
      <div className="second-container">
        <div className="on-the-right">
          <ButtonToolbar>
            <IconButton icon={<Icon icon="close" />} onClick={() => setOpenWarning(true)}/>
          </ButtonToolbar>
        </div>
        <p style={{ color: 'black', fontSize: 50, marginBottom: 5, marginTop: 5, fontFamily: 'Poppins-Light' }}>{listID[index].title}</p>
        <div className="right">
          <ButtonToolbar>
            <IconButton icon={<Icon icon="save" />} onClick={() => { saveDoc() }}/>
            <ButtonGroup>
              <IconButton icon={<Icon icon="bold" />} />
              <IconButton icon={<Icon icon="italic" />} />
              <IconButton icon={<Icon icon="underline" />} />
              <IconButton icon={<Icon icon="strikethrough" />} />
            </ButtonGroup>
            <ButtonGroup>
              <IconButton icon={<Icon icon="list-ol" />} />
              <IconButton icon={<Icon icon="list-ul" />} />
            </ButtonGroup>
            <ButtonGroup>
              <IconButton icon={<Icon icon="align-left" />} />
              <IconButton icon={<Icon icon="align-center" />} />
              <IconButton icon={<Icon icon="align-right" />} />
              <IconButton icon={<Icon icon="align-justify" />} />
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <form >
          <textarea
            style={{ borderColor: 'white', padding: 8 }}
            className="text-area"
            placeholder="Start taking some notes!"
            value={listID[index].data}
            onChange={text => {save(text.target.value)}} />
          <ButtonToolbar style={{marginTop: 5}}>
            <IconButton icon={<Icon icon="save" />} onClick={() => { saveDoc() }}>Save</IconButton>
          </ButtonToolbar>
        </form>
      </div>
    </div>
  );
};