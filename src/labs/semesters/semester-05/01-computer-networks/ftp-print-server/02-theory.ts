import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The File Transfer Protocol (FTP) moves files between a client and a server over TCP. It uses two connections. The control connection, to server port 21, carries commands such as USER, PASS, LIST, RETR (download) and STOR (upload), and the server's three-digit replies. A separate data connection carries each file or directory listing.",
    "In passive mode, which almost every client uses, the client sends PASV and the server replies with an address and a port, such as 227 (192,168,1,20,156,65): port 156 × 256 + 65 = 40001. The client opens the data connection to that port. In active mode the server connects back to the client from port 20, which firewalls usually block.",
    "Plain FTP sends the user name, the password and the files unencrypted. On an untrusted network use FTPS (FTP over TLS) or SFTP (file transfer over SSH, port 22) instead.",
    "On Linux, vsftpd is a common FTP server. Its settings are in /etc/vsftpd.conf: local_enable lets system users log in, write_enable allows uploads, chroot_local_user keeps each user inside their home folder, and pasv_min_port and pasv_max_port fix the range of passive data ports.",
    "A print server is a computer that owns a printer and accepts print jobs for it from the network. Its spooler queues the jobs and sends them to the printer one at a time. On Windows, sharing a printer turns the PC into a print server: other PCs connect to \\\\PRINTSRV\\LabPrinter over SMB, download the driver from it, and send jobs to its queue.",
    "A shared printer lets one printer serve a whole lab, and the queue on the print server shows every job in one place.",
  ],
};
