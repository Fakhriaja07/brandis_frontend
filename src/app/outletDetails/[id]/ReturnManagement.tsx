import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const ReturnManagement = () => {
  const [returnData, setReturnData] = useState([
    {
      returnId: "1",
      productName: "Product A",
      batchName: "Batch 1",
      quantity: 5,
      reason: "Damaged",
      returnDate: "2024-11-02",
    },
    {
      returnId: "2",
      productName: "Product B",
      batchName: "Batch 2",
      quantity: 2,
      reason: "Expired",
      returnDate: "2024-11-04",
    },
  ]);

  const [returnHistory, setReturnHistory] = useState([]); // To store return history
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReturn, setNewReturn] = useState({
    productName: "",
    batchName: "",
    quantity: "",
    reason: "",
    returnDate: "",
  });

  const handleAddReturn = () => {
    if (
      !newReturn.productName ||
      !newReturn.batchName ||
      !newReturn.quantity ||
      !newReturn.reason ||
      !newReturn.returnDate
    ) {
      return; // Don't proceed if any field is empty
    }
    const newEntry = { ...newReturn, returnId: Date.now().toString() };
    setReturnData([...returnData, newEntry]);
    setNewReturn({ productName: "", batchName: "", quantity: "", reason: "", returnDate: "" });
    setIsModalOpen(false);
  };

  const handleSaveReturns = () => {
    console.log("Saved returns:", returnData);
    setReturnHistory([...returnHistory, ...returnData]); // Append current data to history
    setReturnData([]); // Clear the current return data
  };

  return (
    <div className="space-y-6">
      {/* Return Management Section */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Return Management</h3>

        {/* Button to Open Modal */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Add New Return
          </button>
        </div>

        {/* Return History Table */}
        <Table aria-label="Return history for each product">
          <TableHeader>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Batch</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Reason</TableColumn>
            <TableColumn>Return Date</TableColumn>
          </TableHeader>
          <TableBody>
            {returnData.map((item) => (
              <TableRow key={item.returnId}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.batchName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell>{item.returnDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveReturns}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Save Returns
          </button>
        </div>
      </div>

      {/* Management History Table */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Management History</h3>
        <Table aria-label="Management history for saved returns">
          <TableHeader>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Batch</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Reason</TableColumn>
            <TableColumn>Return Date</TableColumn>
          </TableHeader>
          <TableBody>
            {returnHistory.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.batchName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell>{item.returnDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal for Adding New Return */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="border-b px-6 py-4">
              <h3 className="text-xl font-semibold">Add New Return</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  value={newReturn.productName}
                  onChange={(e) => setNewReturn({ ...newReturn, productName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Batch Name</label>
                <input
                  type="text"
                  value={newReturn.batchName}
                  onChange={(e) => setNewReturn({ ...newReturn, batchName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  value={newReturn.quantity}
                  onChange={(e) => setNewReturn({ ...newReturn, quantity: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Reason</label>
                <input
                  type="text"
                  value={newReturn.reason}
                  onChange={(e) => setNewReturn({ ...newReturn, reason: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Return Date</label>
                <input
                  type="date"
                  value={newReturn.returnDate}
                  onChange={(e) => setNewReturn({ ...newReturn, returnDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReturn}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Add Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnManagement;
