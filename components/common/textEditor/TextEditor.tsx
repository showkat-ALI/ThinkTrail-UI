import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ICommon } from "../../../interfaces/ICommon";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="p-3 text-gray-500">Loading editor...</div>,
});

const TextEditor = () => {
  const [body, setBody] = useState("");

  return (
    <>
      <ReactQuill placeholder="Write a description...." />
    </>
  );
};

export default TextEditor;
