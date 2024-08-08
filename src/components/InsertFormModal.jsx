// src/components/TableManagementPage/InsertFormModal.js

import React from 'react';
import {
    Form,
    SimpleItem,
} from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import { Popup } from 'devextreme-react/popup';
import './InsertFormModal.css';  // Import CSS for styling

const InsertFormModal = ({ isOpen, onClose }) => {
    const handleSubmit = () => {
        // Add form submission logic here
        onClose();
    };

    return (
        <Popup
            visible={isOpen}
            title="Add New Record"
            onHiding={onClose}
            width={600}
            height={400}
            dragEnabled={true}
            showCloseButton={true}
            closeOnOutsideClick={true}
        >
            <div className="insert-form-modal-content">
                <Form>
                    <SimpleItem
                        dataField="dummyWorkdone"
                        label={{ text: 'Work Done (meters)' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Work Done',
                        }}
                    />
                    <SimpleItem
                        dataField="dummyManDays"
                        label={{ text: 'Man Days' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Man Days',
                        }}
                    />
                    <SimpleItem
                        dataField="dummyManpowerCost"
                        label={{ text: 'Manpower Cost' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Manpower Cost',
                        }}
                    />
                    <SimpleItem
                        dataField="dummyEquipmentCost"
                        label={{ text: 'Equipment Cost' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Equipment Cost',
                        }}
                    />
                    <SimpleItem
                        dataField="dummyTotalCost"
                        label={{ text: 'Total Cost' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Total Cost',
                        }}
                    />
                    <div className="insert-form-modal-actions">
                        <Button text="Submit" type="default" onClick={handleSubmit} />
                        <Button text="Cancel" onClick={onClose} />
                    </div>
                </Form>
            </div>
        </Popup>
    );
};

export default InsertFormModal;
