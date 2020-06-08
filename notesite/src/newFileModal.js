import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';

import './App.css';

export default function NewFileModal({ open, setOpen, listID, setListID }) {
    const [title, setTitle] = useState("")

    async function add() {
        try {
            let headers = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'title': title }),
            }
            let response = await fetch('/addNote', headers);
            let responseJson = await response.json();
            let copy = listID
            copy.push({ "_id": responseJson._id, "title": title, "data": "" })
            setListID([...copy])
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="modal-container">
            <Modal show={open} onHide={() => { setOpen(false); setTitle("") }}>
                <Modal.Header>
                    <Modal.Title>New Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <textarea
                            style={{ borderColor: 'white', padding: 8, fontFamily: 'Poppins-Light', fontSize: 40 }}
                            className="title-area"
                            placeholder="Enter the title of your document!"
                            value={title}
                            onChange={text => setTitle(text.target.value)} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { setOpen(false); add(); setTitle("") }} appearance="default">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}