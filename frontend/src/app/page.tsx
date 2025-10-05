"use client";

import { sendToMuxer } from "@/lib/llm/engine";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("Initializing Worker...");

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = async () => {
    const res = (await sendToMuxer("INIT"))?.payload;
    setMessage(typeof res === "string" ? res : "");
  };

  const handleClick = async () => {
    const res = (await sendToMuxer("PING"))?.payload;
    setMessage(typeof res === "string" ? res : "");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="my-8 font-bold text-2xl">Muxer AI</h1>
      <button
        className="bg-blue-500 text-white rounded-md px-2 py-1 mb-5"
        onClick={handleClick}
      >
        Ping Muxer
      </button>
      <p>
        Response: <b>{message}</b>
      </p>
    </div>
  );
}
