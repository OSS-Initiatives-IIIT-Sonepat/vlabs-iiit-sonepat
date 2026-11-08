import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A remote procedure call lets a program call a function that runs on another computer, with the same syntax as a local call. The program does not open sockets or format messages; generated code does it.",
    "The function is first described in an interface definition. In ONC RPC, used by NFS and most Unix systems, this is a .x file that names a program number, a version, and each procedure with its argument and result types. rpcgen reads it and writes the client stub, the server stub, the XDR routines and a header.",
    "When the client calls add_1(&args, clnt), the client stub marshals the arguments: it encodes them in XDR (External Data Representation), a fixed big-endian format every machine agrees on, and sends a CALL message holding the program, version and procedure numbers and the encoded arguments. The server stub unmarshals them, calls the real procedure, and sends back a REPLY with the encoded result. The client stub decodes it and returns it, as if the function had run locally.",
    "RPC servers do not use fixed ports. At start-up the server registers its program number with rpcbind (the portmapper) on port 111, and gets a free port. A client first asks rpcbind which port the program is on, then sends its calls there. rpcinfo -p lists every registered program.",
    "A remote call can fail in ways a local call cannot: the server may be down, or the network may lose the message. The client sets a timeout, and clnt_perror reports errors such as RPC: Timed out or RPC: Program not registered.",
    "Java RMI, gRPC and SOAP web services use the same idea of stubs and an interface definition, with different encodings.",
  ],
};
