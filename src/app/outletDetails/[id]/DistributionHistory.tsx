import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type ProductEntry = {
  productName: string;
  batchName: string;
  quantity: string;
  saleDate: string;
  invoiceCode: string;
};

const DistributionHistory = () => {
  const [productEntries, setProductEntries] = useState<ProductEntry[]>([
    {
      productName: "Dummy Product A",
      batchName: "Batch X",
      quantity: "50",
      saleDate: "2024-10-01",
      invoiceCode: "INV-001",
    },
    {
      productName: "Dummy Product B",
      batchName: "Batch Y",
      quantity: "100",
      saleDate: "2024-11-01",
      invoiceCode: "INV-002",
    },
  ]);

  const [savedDistributions, setSavedDistributions] = useState<ProductEntry[]>(
    []
  ); // State for saved distributions

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductEntry>({
    productName: "",
    batchName: "",
    quantity: "",
    saleDate: "",
    invoiceCode: "",
  });

  const handleAddProduct = () => {
    if (
      !newProduct.productName ||
      !newProduct.batchName ||
      !newProduct.quantity ||
      !newProduct.saleDate ||
      !newProduct.invoiceCode
    ) {
      return; // Don't add if any field is empty
    }
    setProductEntries([...productEntries, newProduct]);
    setNewProduct({
      productName: "",
      batchName: "",
      quantity: "",
      saleDate: "",
      invoiceCode: "",
    });
    setIsModalOpen(false);
  };

  const handleSaveDistribution = () => {
    setSavedDistributions([...savedDistributions, ...productEntries]); // Move entries to saved distributions
    setProductEntries([]); // Clear new distribution entries
  };

  const handleDetailClick = (invoiceCode: string) => {
    console.log(`Viewing details for invoice: ${invoiceCode}`);
    // Add logic to show details for the invoice
  };

  const handlePrintInvoice = (invoiceCode: string) => {
    console.log(`Printing invoice: ${invoiceCode}`);
    // Add logic to generate or print the invoice
  };

  return (
    <div className="space-y-6">
      {/* Add New Distribution Entry Section */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">New Distribution Entry</h3>

        {/* Add Product Button - aligned to the right */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Product
          </button>
        </div>

        {/* Modal Backdrop */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              {/* Modal Header */}
              <div className="border-b px-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add New Product
                </h3>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-4 space-y-4">
                {/* Product Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.productName}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, productName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Batch Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Batch Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter batch name"
                    value={newProduct.batchName}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, batchName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Quantity Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, quantity: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Date Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Sale Date
                  </label>
                  <input
                    type="date"
                    value={newProduct.saleDate}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, saleDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Invoice Code Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Invoice Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter invoice code"
                    value={newProduct.invoiceCode}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, invoiceCode: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t px-6 py-4 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table to display added products */}
        {productEntries.length > 0 && (
          <>
            <Table aria-label="Products in this distribution entry">
              <TableHeader>
                <TableColumn>Product Name</TableColumn>
                <TableColumn>Batch</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Date</TableColumn>
              </TableHeader>
              <TableBody>
                {productEntries.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.batchName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.saleDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Save Distribution Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveDistribution}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Distribution
              </button>
            </div>
          </>
        )}
      </div>

      {/* Display Distribution History Table */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Distribution History</h2>
        <p className="mb-4">Past Distribution Records:</p>
        <Table aria-label="Distribution history for each product">
          <TableHeader>
            <TableColumn>Invoice Code</TableColumn>
            <TableColumn>Distribution Date</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {savedDistributions.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.invoiceCode}</TableCell>
                <TableCell>{item.saleDate}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDetailClick(item.invoiceCode)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handlePrintInvoice(item.invoiceCode)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Cetak Faktur
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DistributionHistory;
