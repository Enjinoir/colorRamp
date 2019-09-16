// final array of colors get pushed into colorRamp
const colorRamp = [];

// these two sets are common operations, posted everywhere
function normalize(cs) {
    let {
        Cred,
        Cgreen,
        Cblue,
    } = cs;

    Cred = Math.round(Cred * 255);
    Cgreen = Math.round(Cgreen * 255);
    Cblue = Math.round(Cblue * 255);

    return {
        Cred,
        Cgreen,
        Cblue,
    };
}

// convert hex to rgb
function convertHex(hex) {
    hex = hex.toString().replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgbObj = {
        Cred: r / 255,
        Cgreen: g / 255,
        Cblue: b / 255,
    };
    return rgbObj;
}

// convert rgb values to hex
function rgbToHex(rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = `0${hex}`;
    }
    return hex;
}

function fullColorHex(cs) {
    const {
        Cred,
        Cgreen,
        Cblue,
    } = cs;

    const red = rgbToHex(Cred);
    const green = rgbToHex(Cgreen);
    const blue = rgbToHex(Cblue);
    return red + green + blue;
}

// desaturates the colors based on predetermined amounts.
// needs non-normalized values
function desaturateColor(cs, sat) {
    let {
        Cred,
        Cgreen,
        Cblue,
    } = cs;

    const deSat = 0.3 * Cred + 0.59 * Cgreen + 0.11 * Cblue;

    Cred = Cred * sat + deSat * (1 - sat);
    Cgreen = Cgreen * sat + deSat * (1 - sat);
    Cblue = Cblue * sat + deSat * (1 - sat);

    return {
        Cred,
        Cgreen,
        Cblue,
    };
}

// luminosity from passed rgb color
function cLum(cb) {
    const {
        Cred,
        Cgreen,
        Cblue,
    } = cb;
    const lum = 0.3 * Cred + 0.59 * Cgreen + 0.11 * Cblue;
    return lum;
}

// clips the color back into a normal range
function clipColor(cs) {
    let {
        Cred,
        Cgreen,
        Cblue,
    } = cs;
    const L = cLum(cs);
    const n = Math.min(Cred, Cgreen, Cblue);
    const x = Math.max(Cred, Cgreen, Cblue);

    if (n < 0) {
        Cred = L + (((Cred - L) * L) / (L - n));
        Cgreen = L + (((Cgreen - L) * L) / (L - n));
        Cblue = L + (((Cblue - L) * L) / (L - n));
    }
    if (x > 1) {
        Cred = L + (((Cred - L) * (1 - L)) / (x - L));
        Cgreen = L + (((Cgreen - L) * (1 - L)) / (x - L));
        Cblue = L + (((Cblue - L) * (1 - L)) / (x - L));
    }
    return {
        Cred,
        Cgreen,
        Cblue,
    };
}

// sets luminosity by calculating the delta between background and foreground color
// the difference in luminosity is added to the target color via the delta
function setLum(cs, lum) {
    let {
        Cred,
        Cgreen,
        Cblue,
    } = cs;

    const d = lum - cLum(cs);
    Cred += d;
    Cgreen += d;
    Cblue += d;
    return clipColor({
        Cred,
        Cgreen,
        Cblue,
    });
}

// function to call and give single hex
function genRamp(hex) {
    const grayscaleRamp = {
        50: ['#F2F2F2', 0.10],
        100: ['#E6E6E6', 0.20],
        200: ['#CCCCCC', 0.30],
        300: ['#B3B3B3', 0.65],
        400: ['#999999', 1],
        500: ['#808080', 1],
        600: ['#666666', 1],
        700: ['#4D4D4D', 1],
        800: ['#333333', 1],
        900: ['#1A1A1A', 1],
    };

    // loop over the grayscale ramp for each color
    Object.entries(grayscaleRamp).forEach((entry) => {
        // array we store in temporarily

        let swatch;

        // conversions to start the loop
        const colorSource = convertHex(hex);
        const blendSource = convertHex(entry[1][0]);
        const sat = entry[1][1];

        // work to generate the color
        swatch = setLum(colorSource, cLum(blendSource));
        swatch = desaturateColor(swatch, sat);
        swatch = normalize(swatch);
        swatch = fullColorHex(swatch);

        // array store for the color
        colorRamp.push(swatch);
    });
    return colorRamp;
}

module.exports = {
    colorRamp,
    genRamp,
    setLum,
    normalize,
    clipColor,
    cLum,
    desaturateColor,
    fullColorHex,
    rgbToHex,
    convertHex,
};