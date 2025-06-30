import React, { useState, useEffect, useCallback } from "react";
import "./Visualizer.css";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Visualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const getBarCount = () => {
    if (typeof window === "undefined") return 50; 
    if (window.innerWidth < 480) return 25;
    if (window.innerWidth < 768) return 35;
    return 50;
  };
  

  const generateArray = useCallback(() => {
    const count = getBarCount();
    const arr = Array.from({ length: count }, () =>
      Math.floor(Math.random() * 300)
    );
    setArray(arr);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      generateArray();
    }
  }, [generateArray]);
  

  // ✅ Bubble Sort
  const bubbleSort = async () => {
    setIsSorting(true);
    const bars = document.getElementsByClassName("bar");
    const arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          bars[j].style.height = `${arr[j]}px`;
          bars[j + 1].style.height = `${arr[j + 1]}px`;
        }

        bars[j].style.backgroundColor = "skyblue";
        bars[j + 1].style.backgroundColor = "skyblue";
      }

      bars[arr.length - 1 - i].style.backgroundColor = "green";
    }

    bars[0].style.backgroundColor = "green";
    setArray(arr);
    setIsSorting(false);
  };

  // ✅ Insertion Sort
  const insertionSort = async () => {
    setIsSorting(true);
    const bars = document.getElementsByClassName("bar");
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      bars[i].style.backgroundColor = "orange";
      await sleep(speed);

      while (j >= 0 && arr[j] > key) {
        bars[j + 1].style.height = `${arr[j]}px`;
        arr[j + 1] = arr[j];
        bars[j].style.backgroundColor = "red";
        await sleep(speed);
        bars[j].style.backgroundColor = "skyblue";
        j--;
      }

      arr[j + 1] = key;
      bars[j + 1].style.height = `${key}px`;
      await sleep(speed);
      bars[i].style.backgroundColor = "skyblue";
    }

    for (let i = 0; i < arr.length; i++) {
      bars[i].style.backgroundColor = "green";
    }

    setArray(arr);
    setIsSorting(false);
  };

  // ✅ Selection Sort
  const selectionSort = async () => {
    setIsSorting(true);
    const bars = document.getElementsByClassName("bar");
    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      bars[minIdx].style.backgroundColor = "orange";

      for (let j = i + 1; j < arr.length; j++) {
        bars[j].style.backgroundColor = "red";
        await sleep(speed);

        if (arr[j] < arr[minIdx]) {
          if (minIdx !== i) bars[minIdx].style.backgroundColor = "skyblue";
          minIdx = j;
          bars[minIdx].style.backgroundColor = "orange";
        } else {
          bars[j].style.backgroundColor = "skyblue";
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        bars[i].style.height = `${arr[i]}px`;
        bars[minIdx].style.height = `${arr[minIdx]}px`;
      }

      bars[minIdx].style.backgroundColor = "skyblue";
      bars[i].style.backgroundColor = "green";
      await sleep(speed);
    }

    setArray(arr);
    setIsSorting(false);
  };

  return (
    <div className={`visualizer ${darkMode ? "dark" : "light"}`}>
      {/* Speed Selector */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "10px" }}>Speed:</label>
        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
          <option value={1000}>Slow</option>
          <option value={200}>Medium</option>
          <option value={1}>Fast</option>
        </select>
      </div>

      {/* Theme Toggle */}
      <button onClick={() => setDarkMode(!darkMode)}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>

      {/* Sorting Buttons */}
      <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
      <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
      <button onClick={insertionSort} disabled={isSorting}>Insertion Sort</button>
      <button onClick={selectionSort} disabled={isSorting}>Selection Sort</button>

      {/* Bars */}
      <div className="bars-container">
        {array.map((value, idx) => (
          <div
            className="bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
