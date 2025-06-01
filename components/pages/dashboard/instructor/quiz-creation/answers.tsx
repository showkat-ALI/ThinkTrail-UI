import React, { useState } from "react";
import Delete from "../../../../../Icon/Delete";
import Plus from "../../../../../Icon/Plus";
export default function Answers() {
  const [inputs, setInputs] = useState<{ value: string; checked: boolean }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");

  const handleAddInput = () => {
    setInputs([...inputs, { value: inputValue, checked: false }]);
    setInputValue("");
  };

  const handleDeleteInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleCheckboxChange = (index: number) => {
    const newInputs = [...inputs];
    newInputs.forEach((input, i) => {
      if (i === index) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
    setInputs(newInputs);
  };
  console.log(inputs);
  return (
    <>
      <div>
        <h1 className="font-bold text-xl text-black">Answers</h1>
      </div>
      <div className="px-24 py-11 bg-white rounded-lg">
        <div>
          <div>
            {inputs.map((input, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3"
              >
                <button onClick={() => handleDeleteInput(index)}>
                  <Delete />
                </button>
                <input
                  type="text"
                  onChange={(e) => (input.value = e.target.value)}
                  style={{
                    background: " #FFFFFF",
                    boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
                    borderRadius: "8px",
                    width: "500px",
                    border: "none",
                    padding: " 11px 17px",
                  }}
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    required={true}
                    checked={input.checked}
                    onChange={() => handleCheckboxChange(index)}
                    className="text-blue-600 p-2 border-black"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className=" mt-10">
          <button onClick={handleAddInput} className=" flex items-center">
            <Plus />
            <p className="text-blue-600 ml-2 text-xl">Add</p>
          </button>
        </div>
        <div className="flex justify-center items-center w-full lg:mt-0 md:mt-0 mt-5">
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:px-5 px-2  py-2.5 mr-2 mb-2"
            >
              Save question
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
