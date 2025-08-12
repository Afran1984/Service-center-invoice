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
      <div><h1>Header </h1></div>

      <div className="p-4">
        <h1 className="text-xl font-bold text-center mb-4">CTG CORPORATION</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className='border-1 p-1 text-left'>
            <strong>Service No:</strong> <input className='p-1' type="text" name="" id="" /><br />
            <strong>Model Name:</strong> <input className='p-1' type="text" name="" id="" /><br />
            <strong>Name:</strong> <input className='p-1' type="text" /><br />
            <strong>Phone No:</strong> <input className='p-1' type="text" name="" id="" />
          </div>
          <div className="text-right border-1 p-1">
            <strong className='w-/12'>Date:</strong> <input className='p-1' type="text" /><br />
            <strong className='w-/12'>Time:</strong> <input className='p-1' type="text" /> <br />
            <strong className='w-/12'>Recieve By:</strong> <input className='p-1' type="text" />
          </div>
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
        <div className='grid grid-cols-2 mt-30 font-bold'>
            <h4 className=''>CTG FOR SIGNATURE</h4>
            <h4 className=''>SIGNATURE</h4>
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

