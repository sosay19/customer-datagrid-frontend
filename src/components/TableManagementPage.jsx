import React, { useCallback,useEffect, useRef, useState } from 'react';
import DataGrid, {
    Column, FilterRow, HeaderFilter, SearchPanel, Button,
} from 'devextreme-react/data-grid';
import CheckBox from 'devextreme-react/check-box';
import SelectBox from 'devextreme-react/select-box';
import InsertFormModal from './InsertFormModal';
import EditFormModal from './EditFormModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './tableManagementPage.css';
import axios from 'axios';

const applyFilterTypes = [{
    key: 'auto',
    name: 'Immediately',
}, {
    key: 'onClick',
    name: 'On Button Click',
}];

const saleAmountHeaderFilter = [{
    text: 'Less than $3000',
    value: ['dummyTotalCost', '<', 3000],
}, {
    text: '$3000 - $5000',
    value: [
        ['dummyTotalCost', '>=', 3000],
        ['dummyTotalCost', '<', 5000],
    ],
}, {
    text: '$5000 - $10000',
    value: [
        ['dummyTotalCost', '>=', 5000],
        ['dummyTotalCost', '<', 10000],
    ],
}, {
    text: '$10000 - $20000',
    value: [
        ['dummyTotalCost', '>=', 10000],
        ['dummyTotalCost', '<', 20000],
    ],
}, {
    text: 'Greater than $20000',
    value: ['dummyTotalCost', '>=', 20000],
}];

const TableManagementPage = () => {
    const [isInsertModalOpen, setInsertModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showFilterRow, setShowFilterRow] = useState(true);
    const [showHeaderFilter, setShowHeaderFilter] = useState(true);
    const [currentFilter, setCurrentFilter] = useState(applyFilterTypes[0].key);
    const dataGridRef = useRef(null);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        fetchRecords();
    }, []);
    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:5005/api/records');
            setRecords(response.data.data.result);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const openInsertModal = () => setInsertModalOpen(true);
    const closeInsertModal = () => setInsertModalOpen(false);

    const openEditModal = (row) => {
        setSelectedRow(row);
        setEditModalOpen(true);
    };
    const closeEditModal = () => setEditModalOpen(false);

    const openDeleteModal = (row) => {
        setSelectedRow(row);
        setDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setDeleteModalOpen(false);

    // Handle delete operation
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5001/api/records/${selectedRow.id}`);
            fetchRecords(); // Fetch updated records after deletion
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const clearFilter = useCallback(() => {
        dataGridRef.current.instance().clearFilter();
    }, []);

    const onShowFilterRowChanged = useCallback((e) => {
        setShowFilterRow(e.value);
        clearFilter();
    }, [clearFilter]);

    const onShowHeaderFilterChanged = useCallback((e) => {
        setShowHeaderFilter(e.value);
        clearFilter();
    }, [clearFilter]);

    const onCurrentFilterChanged = useCallback((e) => {
        setCurrentFilter(e.value);
    }, []);
    return (
        <div className="table-management-page">
            <header className="header">
                <h1>Table Management</h1>
                <button className="add-button" onClick={openInsertModal}>Add New Record</button>
            </header>

            <div className="options">
                <div className="option">
                    <span>Apply Filter </span>
                    <SelectBox
                        items={applyFilterTypes}
                        value={currentFilter}
                        onValueChanged={onCurrentFilterChanged}
                        valueExpr="key"
                        displayExpr="name"
                        inputAttr={{ 'aria-label': 'Filter Type' }}
                        disabled={!showFilterRow}
                    />
                </div>
                <div className="option">
                    <CheckBox
                        text="Filter Row"
                        value={showFilterRow}
                        onValueChanged={onShowFilterRowChanged}
                    />
                </div>
                <div className="option">
                    <CheckBox
                        text="Header Filter"
                        value={showHeaderFilter}
                        onValueChanged={onShowHeaderFilterChanged}
                    />
                </div>
            </div>

            <DataGrid
                id="gridContainer"
                ref={dataGridRef}
                dataSource={records}
                keyExpr="id"
                showBorders={true}
                onRowClick={(e) => openEditModal(e.data)}
            >
                <FilterRow visible={showFilterRow} applyFilter={currentFilter} />
                <HeaderFilter visible={showHeaderFilter} />
                <SearchPanel visible={true} width={240} placeholder="Search..." />
                <Column dataField="dummyCorpName" width={200} caption="Sample Corporation">
                    <HeaderFilter />
                </Column>
                <Column dataField="dummyDistrictName" width={200} caption="Sample District">
                    <HeaderFilter />
                </Column>
                <Column dataField="dummyWorkdone" caption="Sample Work (meters)">
                    <HeaderFilter />
                </Column>
                <Column dataField="dummyManDays" caption="Sample Man Days">
                    <HeaderFilter />
                </Column>
                <Column dataField="dummyManpowerCost" caption="Sample Man-power Cost">
                    <HeaderFilter />
                </Column>
                <Column dataField="dummyEquipmentCost" caption="Sample Equipment Cost">
                    <HeaderFilter />
                </Column>
                <Column dataField="dummyTotalCost" caption="Sample Total Cost">
                    <HeaderFilter dataSource={saleAmountHeaderFilter} />
                </Column>
                <Column
                    type="buttons"
                    width={120}
                    buttons={[
                        {
                            hint: 'Edit',
                            icon: 'edit',
                            onClick: (e) => openEditModal(e.row.data),
                        },
                        {
                            hint: 'Delete',
                            icon: 'trash',
                            onClick: (e) => openDeleteModal(e.row.data),
                        },
                    ]}
                />
            </DataGrid>

            <InsertFormModal isOpen={isInsertModalOpen} onClose={closeInsertModal} />
            <EditFormModal isOpen={isEditModalOpen} onClose={closeEditModal} rowData={selectedRow} />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDelete}
                rowData={selectedRow}
            />
        </div>
    );
};

export default TableManagementPage;
