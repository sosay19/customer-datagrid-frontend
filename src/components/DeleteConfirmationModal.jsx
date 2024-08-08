import React from 'react';
import { Popup } from 'devextreme-react/popup';
import Button from 'devextreme-react/button';
import './DeleteConfirmationModal.css';  // Import CSS for styling

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete, rowData }) => {
    return (
        <Popup
            visible={isOpen}
            title="Delete Functionality"
            onHiding={onClose}
            width={400}
            height={200}
            dragEnabled={true}
            showCloseButton={true}
            closeOnOutsideClick={true}
        >
            <div className="delete-confirmation-content">
                <p className="delete-prompt">Are you sure you want to delete?</p>
                <div className="modal-actions">
                    <Button text="Confirm" type="danger" onClick={onDelete} />
                    <Button text="Cancel" onClick={onClose} />
                </div>
            </div>
        </Popup>
    );
};

export default DeleteConfirmationModal;
