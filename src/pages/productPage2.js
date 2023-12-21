// src/components/ProductPage2.js
import React, { useState } from "react";
import Papa from "papaparse"; // For CSV parsing
import axios from "axios";
import { useEffect } from "react";

const steps = ["Select File", "Specify Format", "Display Handling"];

const ProductPage2 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("json");
  const [encoding, setEncoding] = useState("utf-8");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [availableFields, setAvailableFields] = useState([]);
  const [displayedFields, setDisplayedFields] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleImportData = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    try {
      let parsedData;

      if (fileType === "json") {
        // Parse JSON file
        const reader = new FileReader();
        reader.onload = (e) => {
          const jsonData = JSON.parse(e.target.result);
          parsedData = jsonData;
          processData(parsedData);
        };
        reader.readAsText(selectedFile);
      } else if (fileType === "csv") {
        // Parse CSV file
        const response = await axios.get(selectedFile);
        const csvData = response.data;
        parsedData = Papa.parse(csvData, {
          header: hasHeader,
          delimiter: delimiter,
          skipEmptyLines: true,
        });
        processData(parsedData.data);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  };

  const processData = (data) => {
    if (!data || !data.products) {
      console.error(
        "Data is undefined or does not have the expected structure."
      );
      return;
    }

    // Extract field names if CSV has headers
    const productsArray = Object.values(data.products);
    if (hasHeader && productsArray.length > 0) {
      setAvailableFields(Object.keys(productsArray[0]));
    } else {
      // If no headers, use generic field names
      setAvailableFields(
        [...Array(productsArray[0].length).keys()].map((i) => `Field ${i + 1}`)
      );
    }

    // Set displayed fields to all available fields by default
    setDisplayedFields([...availableFields]);

    // Sort the data based on descending popularity
    const sortedData = productsArray.sort(
      (a, b) => b.popularity - a.popularity
    );
    setTableData(sortedData);
  };

  const handleFieldSelection = (selectedFields, direction) => {
    if (direction === "right") {
      // Move selected fields from Available Fields to Displayed Fields
      setDisplayedFields([...displayedFields, ...selectedFields]);
      setAvailableFields(
        availableFields.filter((field) => !selectedFields.includes(field))
      );
    } else if (direction === "left") {
      // Move selected fields from Displayed Fields to Available Fields
      setAvailableFields([...availableFields, ...selectedFields]);
      setDisplayedFields(
        displayedFields.filter((field) => !selectedFields.includes(field))
      );
    }
  };

  //   const handleNext = () => {
  //     if (currentStep < steps.length - 1) {
  //       setCurrentStep(currentStep + 1);

  //       // Additional logic for reading available fields from the file in step 3
  //       if (currentStep === 0 && selectedFile) {
  //         handleImportData();
  //       }
  //     }
  //   };
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // If on Step 1 and a file is selected, proceed with data import
      if (currentStep === 0 && selectedFile) {
        handleImportData();
      }
  
      // Move to the next step
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      // For the last step, additional logic or actions can be added here
      console.log('Last step reached. Additional logic can be added here.');
      // Optionally, trigger the data import after state update
      setCurrentStep(currentStep + 1); // Move to the next step (step 3)
    }
  };  

  // Add this useEffect block at the end of your functional component
  useEffect(() => {
    // Check if it's the "Display Handling" step
    if (currentStep === 2) {
      // If so, trigger the data import after state update
      handleImportData();
    }
  }, [currentStep, handleImportData]);

  const handleCancel = () => {
    // Reset the state or handle cancellation as needed
    setCurrentStep(0);
    setSelectedFile(null);
    setFileType("json");
    setEncoding("utf-8");
    setDelimiter(",");
    setHasHeader(true);
    setAvailableFields([]);
    setDisplayedFields([]);
    setTableData([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Page 2</h1>
      {currentStep > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
      {currentStep < steps.length && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {steps[currentStep]}
            </label>
            {currentStep === 0 && (
              <input type="file" onChange={handleFileChange} />
            )}
            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4">
                {/* Step 2 UI */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    File Type
                  </label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Character Encoding
                  </label>
                  <select
                    value={encoding}
                    onChange={(e) => setEncoding(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="utf-8">UTF-8</option>
                    {/* Add more encoding options as needed */}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Delimiter
                  </label>
                  <input
                    type="text"
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Has Header
                  </label>
                  <input
                    type="checkbox"
                    checked={hasHeader}
                    onChange={(e) => setHasHeader(e.target.checked)}
                    className="mr-2"
                  />
                  Yes
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="grid grid-cols-2 gap-4">
                {/* Step 3 UI */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Available Fields
                  </label>
                  <select
                    multiple
                    size="5"
                    value={availableFields}
                    onChange={(e) =>
                      setAvailableFields(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    className="w-full p-2 border rounded"
                  >
                    {availableFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() =>
                      handleFieldSelection(availableFields, "right")
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                  >
                    &gt;&gt;
                  </button>
                  <button
                    onClick={() =>
                      handleFieldSelection(displayedFields, "left")
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    &lt;&lt;
                  </button>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fields to be Displayed
                  </label>
                  <select
                    multiple
                    size="5"
                    value={displayedFields}
                    onChange={(e) =>
                      setDisplayedFields(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    className="w-full p-2 border rounded"
                  >
                    {displayedFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
      {currentStep === steps.length && (
  <div>
    <h2 className="text-xl font-bold mb-4">Display Data</h2>
    {/* <button onClick={handleImportData} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
      Display
    </button> */}
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          {displayedFields.map((field) => (
            <th key={field} className="border p-2">
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {displayedFields.map((field, colIndex) => (
              <td key={colIndex} className="border p-2">
                {row[field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
};

export default ProductPage2;
