"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [selectedText, setSelectedText] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      setSelectedText(selection.toString());
    }
  };

  const handleHighlight = () => {
    if (selectedText) {
      setIsHighlighted(true);
    }
  };

  return (
    <div className="p-4">
      <div
        onMouseUp={handleSelection}
        className={`inline-block ${isHighlighted ? "bg-yellow-500" : ""}`}
      >
        <div>sdf</div>
      </div>
      <button
        onClick={handleHighlight}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        하이라이트
      </button>
    </div>
  );
}
