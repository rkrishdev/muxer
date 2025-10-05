export type MuxerWorkerResponse =
  | { type: "READY"; payload: string }
  | { type: "PONG"; payload: string };
