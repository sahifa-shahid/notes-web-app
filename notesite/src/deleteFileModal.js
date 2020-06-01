import React from 'react';
import { Modal, Button } from 'rsuite';

import './App.css';

export default function DeleteFileModal({ openWarning, setOpenWarning, listID, setListID, index}) {
    function deleteDoc() {
        let copy = listID
        copy.splice(index, 1)
        setListID([...copy])
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