import { useState } from 'react'
import './App.css'
import "tailwindcss"

const App = () => {
  const [items, setItems] = useState([
    { id: 1, description: "", wnty: "", unit: "", price: "", total: "" },
  ]);

  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1,
      description: "",
      wnty: "",
      unit: "",
      price: "",
      total: "",
    };
    setItems([...items, newItem]);
  };

  const handleRemoveRow = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleChange = (id, field, value) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const calculateTotal = (item) => {
    const total = parseFloat(item.unit || 0) * parseFloat(item.price || 0);
    return isNaN(total) ? "" : total.toFixed(2);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 text-sm" id="invoice">
      <div className="border p-4">
        <h1 className="text-xl font-bold text-center mb-4">HSB CORPORATION</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className='border-1 p-3 text-left'>
            <strong>Service No:</strong> INV-PLCHO-<br />
            <strong>Product/Model Name:</strong> SO-PLCHO<br />
            <strong>Name:</strong> HSB CORPORATION<br />
            <strong>Phone No:</strong> 01823-691254
          </div>
          <div className="text-right border-1 p-3">
            <strong className=''>Date:</strong> 04/08/2025<br />
            <strong className=''>Time:</strong> 1:32:12 PM<br />
            <strong className=''>Recieve By:</strong> <input className=' w-2/12' type="text" />
          </div>ml-4
        </div>

        <table className="w-full border border-collapse">
          <thead>
            <tr>
              <th className="border px-2">SL</th>
              <th className="border px-2">Description</th>
              <th className="border px-2">Warranty</th>
              <th className="border px-2">Unit</th>
              <th className="border px-2">Price</th>
              <th className="border px-2">Total</th>
              <th className="border px-2 print:hidden">+ / -</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-2 text-center">{index + 1}</td>
                <td className="border px-2">
                  <input
                    type="text"
                    className="w-full"
                    value={item.description}
                    onChange={(e) => handleChange(item.id, "description", e.target.value)}
                  />
                </td>
                <td className="border px-2">
                  <input
                    type="text"
                    className="w-full"
                    value={item.wnty}
                    onChange={(e) => handleChange(item.id, "wnty", e.target.value)}
                  />
                </td>
                <td className="border px-2">
                  <input
                    type="number"
                    className="w-full"
                    value={item.unit}
                    onChange={(e) => handleChange(item.id, "unit", e.target.value)}
                  />
                </td>
                <td className="border px-2">
                  <input
                    type="number"
                    className="w-full"
                    value={item.price}
                    onChange={(e) => handleChange(item.id, "price", e.target.value)}
                  />
                </td>
                <td className="border px-2 text-right">
                  {calculateTotal(item)}
                </td>
                <td className="border px-2 text-center print:hidden">
                  <button onClick={handleAddRow} className="px-1">+</button>
                  {items.length > 1 && (
                    <button onClick={() => handleRemoveRow(item.id)} className="px-1">-</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4 font-bold">
          Total Amount: {items.reduce((acc, item) => acc + parseFloat(calculateTotal(item) || 0), 0).toFixed(2)}
        </div>

        <div className="mt-4 text-center print:hidden">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

