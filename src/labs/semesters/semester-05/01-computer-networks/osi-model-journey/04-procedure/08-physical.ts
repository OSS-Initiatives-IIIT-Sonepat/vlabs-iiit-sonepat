import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Physical: send the bits",
  body: "The network card puts 7 bytes of preamble, alternating ones and zeros, and a 1-byte start frame delimiter in front of the frame. The receiver uses the preamble to lock its clock to the sender, and the delimiter to know where the frame begins. The data unit is now 148 bytes, which is 1184 bits.\n\nThe physical layer does not know about headers. It knows bits, and how to represent them: as voltages on the copper pairs of the cable, as light in a fibre, or as radio. At 1 Gbit/s these 1184 bits take about 1.2 microseconds to send. After them the link stays quiet for at least 12 byte-times before the next frame.\n\nEvery block is now part of one stream of bits. On the bench the blocks turn dark. Until the next box, nothing reads them as fields.",
  show: [],
  osi: {
    device: "laptop",
    layer: 1,
    blocks: ["pre", "eth", "ip", "tcp", "tls", "data", "tag", "fcs"],
    focus: ["pre"],
    encrypted: true,
    bits: true,
    note: {
      title: "+ Preamble and SFD · 8 B",
      text: "148 bytes leave as 1184 bits. The network card turns them into signals on the cable.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
