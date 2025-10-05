self.onmessage = async (e: MessageEvent) => {
  const { type, id } = e.data;

  console.log("Worker type: ", type);

  if (type === "INIT") {
    self.postMessage({ id, type: "READY", payload: "Worker is ready!" });
  }

  if (type === "PING" && id) {
    self.postMessage({
      id,
      type: "PONG",
      payload: `Hello from Muxer! your request id is "${id}"`,
    });
  }
};
