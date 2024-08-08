// src/components/TableManagementPage/EditFormModal.js

import React from 'react';
import {
    Form,
    Item,
    SimpleItem,
} from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import { Popup } from 'devextreme-react/popup';
import './EditFormModal.css';  // Import CSS for styling

const EditFormModal = ({ isOpen, onClose, rowData }) => {
    const handleSubmit = () => {
        // Add form submission logic here
        onClose();
    };

    return (
        <Popup
            visible={isOpen}
            title="Edit Record"
            onHiding={onClose}
            width={600}
            height={400}
            dragEnabled={true}
            showCloseButton={true}
            closeOnOutsideClick={true}
        >
            <div className="edit-form-modal-content">
                <Form>
                    <SimpleItem
                        dataField="dummyWorkdone"
                        label={{ text: 'Work Done (meters)' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Work Done',
                            value: rowData?.dummyWorkdone,
                        }}
                    />
                    <SimpleItem
                        dataField="dummyManDays"
                        label={{ text: 'Man Days' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Man Days',
                            value: rowData?.dummyManDays,
                        }}
                    />
                    <SimpleItem
                        dataField="dummyManpowerCost"
                        label={{ text: 'Manpower Cost' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Manpower Cost',
                            value: rowData?.dummyManpowerCost,
                        }}
                    />
                    <SimpleItem
                        dataField="dummyEquipmentCost"
                        label={{ text: 'Equipment Cost' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Equipment Cost',
                            value: rowData?.dummyEquipmentCost,
                        }}
                    />
                    <SimpleItem
                        dataField="dummyTotalCost"
                        label={{ text: 'Total Cost' }}
                        editorType="dxTextBox"
                        editorOptions={{
                            placeholder: 'Enter Total Cost',
                            value: rowData?.dummyTotalCost,
                        }}
                    />
                    <div className="edit-form-modal-actions">
                        <Button text="Update" type="default" onClick={handleSubmit} />
                        <Button text="Cancel" onClick={onClose} />
                    </div>
                </Form>
            </div>
        </Popup>
    );
};

export default EditFormModal;
