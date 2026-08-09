'use strict';

// ---------------------------------------------------------------------------
// THEME_COMMON — values shared across light / dark themes
// ---------------------------------------------------------------------------
const THEME_COMMON = {
  spacingMultiplicator: 4,

  spacing: function spacing(...args) {
    return args.map((n) => `${n * 4}px`).join(' ');
  },

  font: {
    size: {
      xxs: '0.5rem',
      xs:  '0.625rem',
      sm:  '0.75rem',
      md:  '0.875rem',
      lg:  '1rem',
      xl:  '1.25rem',
      xxl: '1.5rem',
    },
    weight: {
      regular: '400',
      medium:  '500',
      semiBold:'600',
      bold:    '700',
    },
  },

  icon: {
    size: { sm: 14, md: 16, lg: 20, xl: 24 },
    stroke: { sm: 1.6, md: 2, lg: 2.5 },
  },

  animation: {
    duration: {
      instant: '50ms',
      fast:    '100ms',
      normal:  '200ms',
      slow:    '400ms',
    },
  },

  border: {
    radius: {
      xs:      '2px',
      sm:      '4px',
      smRound: '4px',
      md:      '8px',
      mdRound: '8px',
      lg:      '16px',
      xl:      '20px',
      xxl:     '40px',
      pill:    '999px',
      rounded: '100%',
    },
  },

  betweenSiblingsGap: '2px',
  table: {
    horizontalCellMargin: '8px',
    checkboxColumnWidth:  '32px',
    horizontalCellPadding:'8px',
  },
  sidePanelWidth: '500px',
  clickableElementBackgroundTransition: 'background 0.1s ease',
  lastLayerZIndex: 2147483647,
};

// Helper: generate all 12 shades for a color family using display-p3
// Each shade is approximately Radix UI P3 scale values
function makeShades(r1, g1, b1, r12, g12, b12) {
  const shades = {};
  for (let i = 1; i <= 12; i++) {
    const t = (i - 1) / 11;
    const r = r1 + (r12 - r1) * t;
    const g = g1 + (g12 - g1) * t;
    const b = b1 + (b12 - b1) * t;
    shades[`${i}`] = `color(display-p3 ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
  }
  return shades;
}

// Blue shades (indigo-based, Radix indigoP3)
const BLUE_SHADES = {
  1:  'color(display-p3 0.983 0.984 1.000)',
  2:  'color(display-p3 0.961 0.965 1.000)',
  3:  'color(display-p3 0.920 0.930 0.995)',
  4:  'color(display-p3 0.869 0.895 0.985)',
  5:  'color(display-p3 0.808 0.847 0.970)',
  6:  'color(display-p3 0.734 0.787 0.950)',
  7:  'color(display-p3 0.635 0.713 0.925)',
  8:  'color(display-p3 0.490 0.600 0.890)',
  9:  'color(display-p3 0.276 0.439 0.846)',
  10: 'color(display-p3 0.244 0.404 0.790)',
  11: 'color(display-p3 0.200 0.340 0.740)',
  12: 'color(display-p3 0.110 0.210 0.520)',
};

// Gray shades
const GRAY_SHADES = {
  1:  'color(display-p3 1.000 1.000 1.000)',
  2:  'color(display-p3 0.988 0.988 0.988)',
  3:  'color(display-p3 0.976 0.976 0.976)',
  4:  'color(display-p3 0.945 0.945 0.945)',
  5:  'color(display-p3 0.922 0.922 0.922)',
  6:  'color(display-p3 0.839 0.839 0.839)',
  7:  'color(display-p3 0.800 0.800 0.800)',
  8:  'color(display-p3 0.702 0.702 0.702)',
  9:  'color(display-p3 0.600 0.600 0.600)',
  10: 'color(display-p3 0.514 0.514 0.514)',
  11: 'color(display-p3 0.400 0.400 0.400)',
  12: 'color(display-p3 0.200 0.200 0.200)',
};

// Red shades
const RED_SHADES = {
  1:  'color(display-p3 0.999 0.989 0.989)',
  2:  'color(display-p3 0.997 0.971 0.971)',
  3:  'color(display-p3 0.990 0.930 0.930)',
  4:  'color(display-p3 0.988 0.878 0.878)',
  5:  'color(display-p3 0.975 0.820 0.820)',
  6:  'color(display-p3 0.950 0.740 0.740)',
  7:  'color(display-p3 0.920 0.640 0.640)',
  8:  'color(display-p3 0.880 0.510 0.510)',
  9:  'color(display-p3 0.820 0.180 0.180)',
  10: 'color(display-p3 0.760 0.160 0.160)',
  11: 'color(display-p3 0.680 0.140 0.140)',
  12: 'color(display-p3 0.380 0.060 0.060)',
};

// Orange shades
const ORANGE_SHADES = {
  1:  'color(display-p3 0.999 0.990 0.980)',
  2:  'color(display-p3 0.998 0.975 0.950)',
  3:  'color(display-p3 0.997 0.950 0.900)',
  4:  'color(display-p3 0.990 0.920 0.840)',
  5:  'color(display-p3 0.985 0.890 0.780)',
  6:  'color(display-p3 0.975 0.830 0.680)',
  7:  'color(display-p3 0.960 0.760 0.540)',
  8:  'color(display-p3 0.930 0.640 0.320)',
  9:  'color(display-p3 0.890 0.494 0.082)',
  10: 'color(display-p3 0.850 0.450 0.050)',
  11: 'color(display-p3 0.760 0.380 0.050)',
  12: 'color(display-p3 0.430 0.200 0.010)',
};

// Purple shades
const PURPLE_SHADES = {
  1:  'color(display-p3 0.998 0.992 1.000)',
  2:  'color(display-p3 0.991 0.976 1.000)',
  3:  'color(display-p3 0.972 0.946 0.998)',
  4:  'color(display-p3 0.940 0.900 0.992)',
  5:  'color(display-p3 0.900 0.850 0.980)',
  6:  'color(display-p3 0.840 0.780 0.960)',
  7:  'color(display-p3 0.770 0.690 0.940)',
  8:  'color(display-p3 0.690 0.540 0.900)',
  9:  'color(display-p3 0.560 0.320 0.800)',
  10: 'color(display-p3 0.520 0.280 0.760)',
  11: 'color(display-p3 0.440 0.220 0.680)',
  12: 'color(display-p3 0.200 0.080 0.340)',
};

// Pink shades
const PINK_SHADES = {
  1:  'color(display-p3 1.000 0.992 0.996)',
  2:  'color(display-p3 0.997 0.975 0.984)',
  3:  'color(display-p3 0.992 0.940 0.964)',
  4:  'color(display-p3 0.988 0.890 0.940)',
  5:  'color(display-p3 0.978 0.840 0.910)',
  6:  'color(display-p3 0.960 0.760 0.860)',
  7:  'color(display-p3 0.940 0.660 0.800)',
  8:  'color(display-p3 0.910 0.540 0.730)',
  9:  'color(display-p3 0.820 0.280 0.560)',
  10: 'color(display-p3 0.770 0.240 0.510)',
  11: 'color(display-p3 0.700 0.190 0.450)',
  12: 'color(display-p3 0.380 0.060 0.210)',
};

// Green shades
const GREEN_SHADES = {
  1:  'color(display-p3 0.985 0.996 0.990)',
  2:  'color(display-p3 0.963 0.990 0.971)',
  3:  'color(display-p3 0.912 0.980 0.935)',
  4:  'color(display-p3 0.860 0.960 0.890)',
  5:  'color(display-p3 0.800 0.940 0.840)',
  6:  'color(display-p3 0.710 0.890 0.770)',
  7:  'color(display-p3 0.590 0.840 0.680)',
  8:  'color(display-p3 0.400 0.820 0.560)',
  9:  'color(display-p3 0.180 0.620 0.400)',
  10: 'color(display-p3 0.150 0.580 0.360)',
  11: 'color(display-p3 0.110 0.490 0.300)',
  12: 'color(display-p3 0.060 0.250 0.150)',
};

// Turquoise (teal) shades
const TURQUOISE_SHADES = {
  1:  'color(display-p3 0.984 0.997 0.996)',
  2:  'color(display-p3 0.961 0.992 0.989)',
  3:  'color(display-p3 0.910 0.980 0.970)',
  4:  'color(display-p3 0.850 0.970 0.960)',
  5:  'color(display-p3 0.780 0.950 0.940)',
  6:  'color(display-p3 0.680 0.890 0.880)',
  7:  'color(display-p3 0.530 0.820 0.810)',
  8:  'color(display-p3 0.300 0.780 0.740)',
  9:  'color(display-p3 0.100 0.620 0.580)',
  10: 'color(display-p3 0.080 0.570 0.530)',
  11: 'color(display-p3 0.060 0.480 0.450)',
  12: 'color(display-p3 0.030 0.250 0.230)',
};

// Amber shades
const AMBER_SHADES = {
  1:  'color(display-p3 1.000 0.996 0.980)',
  2:  'color(display-p3 0.999 0.988 0.952)',
  3:  'color(display-p3 0.998 0.975 0.890)',
  4:  'color(display-p3 0.998 0.960 0.820)',
  5:  'color(display-p3 0.995 0.930 0.740)',
  6:  'color(display-p3 0.985 0.890 0.620)',
  7:  'color(display-p3 0.960 0.830 0.420)',
  8:  'color(display-p3 0.900 0.730 0.140)',
  9:  'color(display-p3 0.800 0.540 0.000)',
  10: 'color(display-p3 0.750 0.480 0.000)',
  11: 'color(display-p3 0.680 0.440 0.000)',
  12: 'color(display-p3 0.340 0.200 0.000)',
};

// Yellow shades
const YELLOW_SHADES = {
  1:  'color(display-p3 0.999 0.998 0.973)',
  2:  'color(display-p3 0.997 0.993 0.930)',
  3:  'color(display-p3 0.996 0.986 0.860)',
  4:  'color(display-p3 0.995 0.975 0.780)',
  5:  'color(display-p3 0.992 0.958 0.680)',
  6:  'color(display-p3 0.980 0.920 0.500)',
  7:  'color(display-p3 0.960 0.870 0.280)',
  8:  'color(display-p3 0.900 0.780 0.080)',
  9:  'color(display-p3 0.840 0.700 0.000)',
  10: 'color(display-p3 0.760 0.620 0.000)',
  11: 'color(display-p3 0.600 0.480 0.000)',
  12: 'color(display-p3 0.290 0.220 0.000)',
};

// Violet shades
const VIOLET_SHADES = {
  1:  'color(display-p3 0.993 0.992 1.000)',
  2:  'color(display-p3 0.980 0.977 1.000)',
  3:  'color(display-p3 0.955 0.948 0.998)',
  4:  'color(display-p3 0.922 0.911 0.990)',
  5:  'color(display-p3 0.878 0.860 0.978)',
  6:  'color(display-p3 0.818 0.790 0.960)',
  7:  'color(display-p3 0.736 0.700 0.936)',
  8:  'color(display-p3 0.620 0.560 0.900)',
  9:  'color(display-p3 0.440 0.340 0.840)',
  10: 'color(display-p3 0.400 0.300 0.790)',
  11: 'color(display-p3 0.350 0.250 0.700)',
  12: 'color(display-p3 0.160 0.090 0.380)',
};

// ---------------------------------------------------------------------------
// THEME_LIGHT — complete color tokens
// ---------------------------------------------------------------------------
const THEME_LIGHT = {
  ...THEME_COMMON,

  border: {
    ...THEME_COMMON.border,
    color: {
      strong:            GRAY_SHADES[8],
      medium:            GRAY_SHADES[6],
      light:             GRAY_SHADES[5],
      secondaryInverted: GRAY_SHADES[11],
      inverted:          GRAY_SHADES[12],
      danger:            RED_SHADES[6],
      blue:              BLUE_SHADES[7],
      transparentStrong: 'color(display-p3 0 0 0 / 0.16)',
    },
    radius: THEME_COMMON.border.radius,
  },

  grayScale: {
    gray1:  GRAY_SHADES[1],
    gray2:  GRAY_SHADES[2],
    gray3:  GRAY_SHADES[3],
    gray4:  GRAY_SHADES[4],
    gray5:  GRAY_SHADES[5],
    gray6:  GRAY_SHADES[6],
    gray7:  GRAY_SHADES[7],
    gray8:  GRAY_SHADES[8],
    gray9:  GRAY_SHADES[9],
    gray10: GRAY_SHADES[10],
    gray11: GRAY_SHADES[11],
    gray12: GRAY_SHADES[12],
  },

  // All named color tokens with full 1-12 shades
  color: {
    // Blue (indigo)
    blue:   BLUE_SHADES[9],
    blue1:  BLUE_SHADES[1],  blue2:  BLUE_SHADES[2],  blue3:  BLUE_SHADES[3],
    blue4:  BLUE_SHADES[4],  blue5:  BLUE_SHADES[5],  blue6:  BLUE_SHADES[6],
    blue7:  BLUE_SHADES[7],  blue8:  BLUE_SHADES[8],  blue9:  BLUE_SHADES[9],
    blue10: BLUE_SHADES[10], blue11: BLUE_SHADES[11], blue12: BLUE_SHADES[12],
    // Gray
    gray1:  GRAY_SHADES[1],  gray2:  GRAY_SHADES[2],  gray3:  GRAY_SHADES[3],
    gray4:  GRAY_SHADES[4],  gray5:  GRAY_SHADES[5],  gray6:  GRAY_SHADES[6],
    gray7:  GRAY_SHADES[7],  gray8:  GRAY_SHADES[8],  gray9:  GRAY_SHADES[9],
    gray10: GRAY_SHADES[10], gray11: GRAY_SHADES[11], gray12: GRAY_SHADES[12],
    // Red
    red:    RED_SHADES[9],
    red1:  RED_SHADES[1],  red2:  RED_SHADES[2],  red3:  RED_SHADES[3],
    red4:  RED_SHADES[4],  red5:  RED_SHADES[5],  red6:  RED_SHADES[6],
    red7:  RED_SHADES[7],  red8:  RED_SHADES[8],  red9:  RED_SHADES[9],
    red10: RED_SHADES[10], red11: RED_SHADES[11], red12: RED_SHADES[12],
    // Orange
    orange:  ORANGE_SHADES[9],
    orange1: ORANGE_SHADES[1],  orange2: ORANGE_SHADES[2],  orange3: ORANGE_SHADES[3],
    orange4: ORANGE_SHADES[4],  orange5: ORANGE_SHADES[5],  orange6: ORANGE_SHADES[6],
    orange7: ORANGE_SHADES[7],  orange8: ORANGE_SHADES[8],  orange9: ORANGE_SHADES[9],
    orange10:ORANGE_SHADES[10], orange11:ORANGE_SHADES[11], orange12:ORANGE_SHADES[12],
    // Purple
    purple1: PURPLE_SHADES[1],  purple2: PURPLE_SHADES[2],  purple3: PURPLE_SHADES[3],
    purple4: PURPLE_SHADES[4],  purple5: PURPLE_SHADES[5],  purple6: PURPLE_SHADES[6],
    purple7: PURPLE_SHADES[7],  purple8: PURPLE_SHADES[8],  purple9: PURPLE_SHADES[9],
    purple10:PURPLE_SHADES[10], purple11:PURPLE_SHADES[11], purple12:PURPLE_SHADES[12],
    // Pink
    pink1: PINK_SHADES[1],  pink2: PINK_SHADES[2],  pink3: PINK_SHADES[3],
    pink4: PINK_SHADES[4],  pink5: PINK_SHADES[5],  pink6: PINK_SHADES[6],
    pink7: PINK_SHADES[7],  pink8: PINK_SHADES[8],  pink9: PINK_SHADES[9],
    pink10:PINK_SHADES[10], pink11:PINK_SHADES[11], pink12:PINK_SHADES[12],
    // Green
    green1: GREEN_SHADES[1],  green2: GREEN_SHADES[2],  green3: GREEN_SHADES[3],
    green4: GREEN_SHADES[4],  green5: GREEN_SHADES[5],  green6: GREEN_SHADES[6],
    green7: GREEN_SHADES[7],  green8: GREEN_SHADES[8],  green9: GREEN_SHADES[9],
    green10:GREEN_SHADES[10], green11:GREEN_SHADES[11], green12:GREEN_SHADES[12],
    // Turquoise (teal)
    turquoise:   TURQUOISE_SHADES[9],
    turquoise1: TURQUOISE_SHADES[1],  turquoise2: TURQUOISE_SHADES[2],
    turquoise3: TURQUOISE_SHADES[3],  turquoise4: TURQUOISE_SHADES[4],
    turquoise5: TURQUOISE_SHADES[5],  turquoise6: TURQUOISE_SHADES[6],
    turquoise7: TURQUOISE_SHADES[7],  turquoise8: TURQUOISE_SHADES[8],
    turquoise9: TURQUOISE_SHADES[9],  turquoise10:TURQUOISE_SHADES[10],
    turquoise11:TURQUOISE_SHADES[11], turquoise12:TURQUOISE_SHADES[12],
    // Amber
    amber:   AMBER_SHADES[9],
    amber1: AMBER_SHADES[1],  amber2: AMBER_SHADES[2],  amber3: AMBER_SHADES[3],
    amber4: AMBER_SHADES[4],  amber5: AMBER_SHADES[5],  amber6: AMBER_SHADES[6],
    amber7: AMBER_SHADES[7],  amber8: AMBER_SHADES[8],  amber9: AMBER_SHADES[9],
    amber10:AMBER_SHADES[10], amber11:AMBER_SHADES[11], amber12:AMBER_SHADES[12],
    // Yellow
    yellow1: YELLOW_SHADES[1],  yellow2: YELLOW_SHADES[2],  yellow3: YELLOW_SHADES[3],
    yellow4: YELLOW_SHADES[4],  yellow5: YELLOW_SHADES[5],  yellow6: YELLOW_SHADES[6],
    yellow7: YELLOW_SHADES[7],  yellow8: YELLOW_SHADES[8],  yellow9: YELLOW_SHADES[9],
    yellow10:YELLOW_SHADES[10], yellow11:YELLOW_SHADES[11], yellow12:YELLOW_SHADES[12],
    // Violet
    violet1: VIOLET_SHADES[1],  violet2: VIOLET_SHADES[2],  violet3: VIOLET_SHADES[3],
    violet4: VIOLET_SHADES[4],  violet5: VIOLET_SHADES[5],  violet6: VIOLET_SHADES[6],
    violet7: VIOLET_SHADES[7],  violet8: VIOLET_SHADES[8],  violet9: VIOLET_SHADES[9],
    violet10:VIOLET_SHADES[10], violet11:VIOLET_SHADES[11], violet12:VIOLET_SHADES[12],
    // Sky (using similar to cyan)
    sky8: 'color(display-p3 0.350 0.730 0.930)',
  },

  accent: {
    primary:    BLUE_SHADES[9],
    secondary:  BLUE_SHADES[5],
    tertiary:   BLUE_SHADES[3],
    quaternary: BLUE_SHADES[2],
    accent3570: 'color(display-p3 0.276 0.439 0.846 / 0.70)',
    accent4060: 'color(display-p3 0.276 0.439 0.846 / 0.60)',
    accent1:  BLUE_SHADES[1],  accent2:  BLUE_SHADES[2],
    accent3:  BLUE_SHADES[3],  accent4:  BLUE_SHADES[4],
    accent5:  BLUE_SHADES[5],  accent6:  BLUE_SHADES[6],
    accent7:  BLUE_SHADES[7],  accent8:  BLUE_SHADES[8],
    accent9:  BLUE_SHADES[9],  accent10: BLUE_SHADES[10],
    accent11: BLUE_SHADES[11], accent12: BLUE_SHADES[12],
  },

  background: {
    primary:           GRAY_SHADES[1],
    secondary:         GRAY_SHADES[2],
    tertiary:          GRAY_SHADES[4],
    quaternary:        GRAY_SHADES[5],
    invertedPrimary:   GRAY_SHADES[12],
    invertedSecondary: GRAY_SHADES[11],
    danger:            RED_SHADES[3],
    transparent: {
      primary:   'color(display-p3 1 1 1 / 0.70)',
      secondary: 'color(display-p3 1 1 1 / 0.60)',
      strong:    'color(display-p3 0 0 0 / 0.16)',
      medium:    'color(display-p3 0 0 0 / 0.08)',
      light:     'color(display-p3 0 0 0 / 0.04)',
      lighter:   'color(display-p3 0 0 0 / 0.02)',
      danger:    'color(display-p3 0.820 0.180 0.180 / 0.08)',
      blue:      'color(display-p3 0.276 0.439 0.846 / 0.08)',
      orange:    'color(display-p3 0.890 0.494 0.082 / 0.08)',
      success:   'color(display-p3 0.180 0.620 0.400 / 0.08)',
    },
    overlayPrimary:   'color(display-p3 0 0 0 / 0.55)',
    overlaySecondary: 'color(display-p3 0 0 0 / 0.40)',
    overlayTertiary:  'color(display-p3 0 0 0 / 0.12)',
    radialGradient: `radial-gradient(50% 62.62% at 50% 0%, ${GRAY_SHADES[9]} 0%, ${GRAY_SHADES[10]} 100%)`,
    radialGradientHover: `radial-gradient(76.32% 95.59% at 50% 0%, ${GRAY_SHADES[10]} 0%, ${GRAY_SHADES[11]} 100%)`,
  },

  font: {
    ...THEME_COMMON.font,
    color: {
      primary:    GRAY_SHADES[12],
      secondary:  GRAY_SHADES[11],
      tertiary:   GRAY_SHADES[9],
      light:      GRAY_SHADES[8],
      extraLight: GRAY_SHADES[7],
      inverted:   GRAY_SHADES[1],
      danger:     RED_SHADES[9],
    },
  },

  boxShadow: {
    color:      'color(display-p3 0 0 0 / 0.12)',
    light:      '0px 2px 4px 0px color(display-p3 0 0 0 / 0.12), 0px 0px 4px 0px color(display-p3 0 0 0 / 0.08)',
    strong:     '2px 4px 16px 0px color(display-p3 0 0 0 / 0.20), 0px 2px 4px 0px color(display-p3 0 0 0 / 0.12)',
    underline:  '0px 1px 0px 0px color(display-p3 0 0 0 / 0.20)',
    superHeavy: '0px 0px 8px 0px color(display-p3 0 0 0 / 0.20), 0px 8px 64px -16px color(display-p3 0 0 0 / 0.30)',
  },

  tag: {
    text: {
      gray:       GRAY_SHADES[11],
      blue:       BLUE_SHADES[11],
      purple:     PURPLE_SHADES[11],
      pink:       PINK_SHADES[11],
      red:        RED_SHADES[11],
      orange:     ORANGE_SHADES[11],
      amber:      AMBER_SHADES[11],
      yellow:     YELLOW_SHADES[11],
      green:      GREEN_SHADES[11],
      turquoise:  TURQUOISE_SHADES[11],
      sky:        BLUE_SHADES[11],
      violet:     VIOLET_SHADES[11],
      mauve:      GRAY_SHADES[11],
      slate:      GRAY_SHADES[11],
      sage:       GREEN_SHADES[11],
      olive:      GREEN_SHADES[11],
      sand:       AMBER_SHADES[11],
      tomato:     RED_SHADES[11],
      ruby:       RED_SHADES[11],
      crimson:    PINK_SHADES[11],
      plum:       PURPLE_SHADES[11],
      iris:       BLUE_SHADES[11],
      cyan:       TURQUOISE_SHADES[11],
      jade:       GREEN_SHADES[11],
      grass:      GREEN_SHADES[11],
      mint:       TURQUOISE_SHADES[11],
      lime:       GREEN_SHADES[11],
      bronze:     AMBER_SHADES[11],
      gold:       AMBER_SHADES[11],
      brown:      ORANGE_SHADES[11],
    },
    background: {
      gray:       GRAY_SHADES[3],
      blue:       BLUE_SHADES[3],
      purple:     PURPLE_SHADES[3],
      pink:       PINK_SHADES[3],
      red:        RED_SHADES[3],
      orange:     ORANGE_SHADES[3],
      amber:      AMBER_SHADES[3],
      yellow:     YELLOW_SHADES[3],
      green:      GREEN_SHADES[3],
      turquoise:  TURQUOISE_SHADES[3],
      sky:        BLUE_SHADES[3],
      violet:     VIOLET_SHADES[3],
      mauve:      GRAY_SHADES[3],
      slate:      GRAY_SHADES[3],
      sage:       GREEN_SHADES[3],
      olive:      GREEN_SHADES[3],
      sand:       AMBER_SHADES[3],
      tomato:     RED_SHADES[3],
      ruby:       RED_SHADES[3],
      crimson:    PINK_SHADES[3],
      plum:       PURPLE_SHADES[3],
      iris:       BLUE_SHADES[3],
      cyan:       TURQUOISE_SHADES[3],
      jade:       GREEN_SHADES[3],
      grass:      GREEN_SHADES[3],
      mint:       TURQUOISE_SHADES[3],
      lime:       GREEN_SHADES[3],
      bronze:     AMBER_SHADES[3],
      gold:       AMBER_SHADES[3],
      brown:      ORANGE_SHADES[3],
    },
  },

  buttons: {
    secondaryTextColor: BLUE_SHADES[11],
  },
};

module.exports = { THEME_LIGHT, THEME_COMMON };
