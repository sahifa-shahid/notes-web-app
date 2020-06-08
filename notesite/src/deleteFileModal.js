import React from 'react';
import { Modal, Button, Alert } from 'rsuite';

import './App.css';

export default function DeleteFileModal({ openWarning, setOpenWarning, listID, setListID, index }) {

    async function deleteDoc() {
        try {
            let headers = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ '_id': listID[index]._id }),
            }
            await fetch('/deleteNote', headers);
            let copy = listID
            copy.splice(index, 1)
            setListID([...copy])
            Alert.success('The document has been successfully deleted!')
        }
        catch (error) {
            console.error(error);
            Alert.error('Sorry, an error occurred! Please try again')
        }
    }

    return (
        <div className="modal-container">
            <Modal show={openWarning} onHide={() => setOpenWarning(false)} size="xs">
                <Modal.Header>
                    <Modal.Title>Deleting Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you would like to proceed?
                    You will not be able to recover the data once it's been deleted.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { setOpenWarning(false); deleteDoc(); }} appearance="default">
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}