import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AlertPage = () => {
  const { alertId } = useParams();
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/alert/${alertId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAlertData(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, [alertId]);

  if (!alertData) return <div>Loading...</div>;

  return (
<div className="p-10 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
  <h1 className="text-3xl font-semibold mb-6 text-gray-800">Alert {alertId}</h1>
  
  <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
    <tbody>
      <tr className="bg-gray-100">
        <td className="border px-6 py-4 font-semibold text-gray-700">ID</td>
        <td className="border px-6 py-4">{alertData.id}</td>
      </tr>
      <tr>
        <td className="border px-6 py-4 font-semibold text-gray-700">Name</td>
        <td className="border px-6 py-4">{alertData.name}</td>
      </tr>
      <tr className="bg-gray-100">
        <td className="border px-6 py-4 font-semibold text-gray-700">Description</td>
        <td className="border px-6 py-4">{alertData.description}</td>
      </tr>
      <tr>
        <td className="border px-6 py-4 font-semibold text-gray-700">Machine</td>
        <td className="border px-6 py-4">{alertData.machine}</td>
      </tr>
      <tr className="bg-gray-100">
        <td className="border px-6 py-4 font-semibold text-gray-700">Occurred On</td>
        <td className="border px-6 py-4">{alertData.occurred_on}</td>
      </tr>
      <tr>
        <td className="border px-6 py-4 font-semibold text-gray-700">Severity</td>
        <td className="border px-6 py-4">{alertData.severity}</td>
      </tr>
      <tr className="bg-gray-100">
        <td className="border px-6 py-4 font-semibold text-gray-700">Program</td>
        <td className="border px-6 py-4">{alertData.program}</td>
      </tr>
    </tbody>
  </table>

  <div className="flex justify-center mt-6">
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      onClick={() => navigate(`/network/${alertId}`)}
    >
      View Graph
    </button>
  </div>
</div>

  );
};

export default AlertPage;
