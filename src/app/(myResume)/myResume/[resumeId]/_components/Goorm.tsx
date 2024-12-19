"use client";

import { useEffect } from "react";
import "./style.css";

export default function Goorm() {
  const randomText = () => {
    const text = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
    const letter = text[Math.floor(Math.random() * text.length)];
    return letter;
  };

  const rain = () => {
    const cloud = document.querySelector(".cloud");
    const e = document.createElement("div");
    const left = Math.floor(Math.random() * 180);
    const size = Math.random() * 1.5;
    const duration = Math.random() * 1;

    e.classList.add("text");
    cloud?.appendChild(e);
    e.innerText = randomText();
    e.style.left = left + "px";
    e.style.fontSize = 0.5 + size + "em";
    e.style.animationDirection = 1 + duration + "s";

    setTimeout(() => {
      cloud?.removeChild(e);
    }, 2000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      rain();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="containerd">
      <div className="cloud"></div>
    </div>
  );
}
