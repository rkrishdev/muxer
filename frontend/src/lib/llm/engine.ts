import { v4 as uuidv4 } from "uuid";

let worker: Worker;
const pending = new Map<string, (value: any) => void>();

export const getWorker = (): Worker => {
  worker ??= new Worker(new URL("./worker.ts", import.meta.url), {
    type: "module",
  });

  worker.onmessage = (e: MessageEvent) => {
    const { id, type, payload } = e.data;
    console.log("Message type: ", type);
    console.log("Message payload: ", payload);

    if (id && pending.has(id)) {
      pending.get(id)?.({ type, payload });
      pending.delete(id);
    } else {
      console.warn(`Engine unmatched id: ${id} and type: ${type}`);
    }
  };

  return worker;
};

export const sendToMuxer = async (
  type: string,
  payload?: any
): Promise<MuxerWorkerResponse> => {
  const id = uuidv4();
  console.log("sendToMuxer");
  return new Promise((resolve) => {
    console.log("sendToMuxer promise worker", worker);

    pending.set(id, resolve);
    console.log("sendToMuxer promise id", id);
    getWorker().postMessage({
      type,
      id,
      payload,
    });
  });
};
