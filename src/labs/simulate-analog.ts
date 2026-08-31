// Analog simulation for the zener diode experiment.
// Given a supply voltage Vs and circuit parameters, compute:
//   - Vz (voltage across zener)
//   - Iz (current through circuit)
//   - LED brightness (0-1)
//
// Physics:
//   Forward bias: I = Is * (exp(V/(n*Vt)) - 1), where Vt = 0.026V, n=1.5, Is=1e-12
//   Reverse bias: below Vz: I ≈ 0. At Vz: I = (Vs - Vz) / Rs
//   Zener breakdown: Vz = 5.1V, sharp knee

export type AnalogResult = {
  vz: number;      // voltage across zener
  iz: number;      // current in mA
  brightness: number; // 0.0 to 1.0
  dmmVoltage: string; // formatted for DMM display e.g. "0.65"
  dmmCurrent: string; // formatted for DMM display e.g. "8.30"
  psuVoltage: string; // formatted for PSU display e.g. "5.00"
};

export function simulateZenerForward(vs: number, rs: number = 470): AnalogResult {
  // Silicon diode forward bias model
  const Vt = 0.026;
  const n = 1.5;
  const Is = 1e-12;

  // Newton-Raphson to find Vd where I_diode = (Vs - Vd) / Rs
  let vd = 0.5; // initial guess
  for (let i = 0; i < 20; i++) {
    const id = Is * (Math.exp(vd / (n * Vt)) - 1);
    const ir = (vs - vd) / rs;
    const f = id - ir;
    const df = (Is / (n * Vt)) * Math.exp(vd / (n * Vt)) + 1 / rs;
    vd -= f / df;
    vd = Math.max(0, Math.min(vs, vd));
  }

  const iz = Math.max(0, (vs - vd) / rs) * 1000; // mA
  const brightness = Math.min(1.0, iz / 10); // full brightness at 10mA

  return {
    vz: vd,
    iz,
    brightness,
    dmmVoltage: vd.toFixed(2),
    dmmCurrent: iz.toFixed(2),
    psuVoltage: vs.toFixed(2),
  };
}

export function simulateZenerReverse(vs: number, vz: number = 5.1, rs: number = 470): AnalogResult {
  // Reverse bias: below Vz, essentially no current
  // At and above Vz: zener conducts, Vz stays ~constant
  if (vs < vz * 0.95) {
    // Pre-breakdown: tiny leakage
    const iz = 0.001; // negligible
    return {
      vz: -vs,
      iz,
      brightness: 0,
      dmmVoltage: (-vs).toFixed(2),
      dmmCurrent: iz.toFixed(3),
      psuVoltage: vs.toFixed(2),
    };
  }

  // Breakdown region: Vz clamped, excess voltage across Rs
  // I = (Vs - Vz) / Rs, with small Zener impedance Zz ≈ 7 ohm
  const Zz = 7; // zener impedance
  // Iz = (Vs - Vz_nominal) / (Rs + Zz)
  const iz = Math.max(0, (vs - vz) / (rs + Zz)) * 1000; // mA
  const actualVz = vz + iz * Zz / 1000; // slight increase with current
  const brightness = Math.min(1.0, iz / 15);

  return {
    vz: -actualVz,
    iz,
    brightness,
    dmmVoltage: (-actualVz).toFixed(2),
    dmmCurrent: iz.toFixed(2),
    psuVoltage: vs.toFixed(2),
  };
}
