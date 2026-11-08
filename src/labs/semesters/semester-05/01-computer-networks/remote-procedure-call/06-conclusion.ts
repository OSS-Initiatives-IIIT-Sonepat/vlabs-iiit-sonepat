import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "RPC hides the network behind a function call. The interface file, rpcgen, the stubs and XDR do the work of finding the server, packing the arguments, and unpacking the result.",
    "The hiding is not complete: a remote call is slower than a local one and can fail when the network or the server fails, so every RPC client must handle timeouts and errors.",
  ],
};
