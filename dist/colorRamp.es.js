/**
  colorscaleramp: https://github.com/Enjinoir/colorRamp.git
  @version v1.0.7
  @link https://github.com/Enjinoir/colorRamp#readme
  @author Ken Hogan
  @license MIT
**/
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

//final array of colors get pushed into colorRamp
var colorRamp = []; //these two sets are common operations, posted everywhere

function normalize(cs) {
  var Cred = cs.Cred,
      Cgreen = cs.Cgreen,
      Cblue = cs.Cblue;
  Cred = Math.round(Cred * 255);
  Cgreen = Math.round(Cgreen * 255);
  Cblue = Math.round(Cblue * 255);
  return {
    Cred: Cred,
    Cgreen: Cgreen,
    Cblue: Cblue
  };
} //convert hex to rgb


function convertHex(hex) {
  hex = hex.toString().replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16),
      g = parseInt(hex.substring(2, 4), 16),
      b = parseInt(hex.substring(4, 6), 16);
  var rgbObj = {
    Cred: r / 255,
    Cgreen: g / 255,
    Cblue: b / 255
  };
  return rgbObj;
} //convert rgb values to hex


function rgbToHex(rgb) {
  var hex = Number(rgb).toString(16);

  if (hex.length < 2) {
    hex = "0" + hex;
  }

  return hex;
}

function fullColorHex(cs) {
  var Cred = cs.Cred,
      Cgreen = cs.Cgreen,
      Cblue = cs.Cblue;
  var red = rgbToHex(Cred);
  var green = rgbToHex(Cgreen);
  var blue = rgbToHex(Cblue);
  return red + green + blue;
}
//needs non-normalized values

function desaturateColor(cs, sat) {
  var Cred = cs.Cred,
      Cgreen = cs.Cgreen,
      Cblue = cs.Cblue;
  var deSat = 0.3 * Cred + 0.59 * Cgreen + 0.11 * Cblue;
  Cred = Cred * sat + deSat * (1 - sat);
  Cgreen = Cgreen * sat + deSat * (1 - sat);
  Cblue = Cblue * sat + deSat * (1 - sat);
  return {
    Cred: Cred,
    Cgreen: Cgreen,
    Cblue: Cblue
  };
} //luminosity from passed rgb color


function cLum(cb) {
  var Cred = cb.Cred,
      Cgreen = cb.Cgreen,
      Cblue = cb.Cblue;
  var lum = 0.3 * Cred + 0.59 * Cgreen + 0.11 * Cblue;
  return lum;
} //clips the color back into a normal range


function clipColor(cs) {
  var Cred = cs.Cred,
      Cgreen = cs.Cgreen,
      Cblue = cs.Cblue;
  var L = cLum(cs);
  var n = Math.min(Cred, Cgreen, Cblue);
  var x = Math.max(Cred, Cgreen, Cblue);

  if (n < 0) {
    Cred = L + (Cred - L) * L / (L - n);
    Cgreen = L + (Cgreen - L) * L / (L - n);
    Cblue = L + (Cblue - L) * L / (L - n);
  }

  if (x > 1) {
    Cred = L + (Cred - L) * (1 - L) / (x - L);
    Cgreen = L + (Cgreen - L) * (1 - L) / (x - L);
    Cblue = L + (Cblue - L) * (1 - L) / (x - L);
  }

  return {
    Cred: Cred,
    Cgreen: Cgreen,
    Cblue: Cblue
  };
} //sets luminosity by calculating the delta between background and foreground color
//the difference in luminosity is added to the target color via the delta


function setLum(cs, lum) {
  var Cred = cs.Cred,
      Cgreen = cs.Cgreen,
      Cblue = cs.Cblue;
  var d = lum - cLum(cs);
  Cred = Cred + d;
  Cgreen = Cgreen + d;
  Cblue = Cblue + d;
  return clipColor({
    Cred: Cred,
    Cgreen: Cgreen,
    Cblue: Cblue
  });
} //function to call and give single hex


function genRamp(hex) {
  var grayscaleRamp = {
    50: ['#F2F2F2', .10],
    100: ['#E6E6E6', .20],
    200: ['#CCCCCC', .30],
    300: ['#B3B3B3', .65],
    400: ['#999999', 1],
    500: ['#808080', 1],
    600: ['#666666', 1],
    700: ['#4D4D4D', 1],
    800: ['#333333', 1],
    900: ['#1A1A1A', 1]
  }; // loop over the two colors

  Object.entries({
    'guidance': hex
  }).forEach(function (color) {
    // loop over the grayscale ramp for each color
    Object.entries(grayscaleRamp).forEach(function (entry, index) {
      var swatch;
      var colorSource = convertHex(hex);
      var blendSource = convertHex(entry[1][0]);
      var sat = entry[1][1];
      swatch = setLum(colorSource, cLum(blendSource));
      swatch = desaturateColor(swatch, sat);
      swatch = normalize(swatch);
      swatch = fullColorHex(swatch);
      colorRamp.push(swatch); //final color for each iteration in the loop

      return colorRamp;
    });
  });
}
module.exports = _defineProperty({
  colorRamp: colorRamp,
  genRamp: genRamp,
  setLum: setLum,
  normalize: normalize,
  clipColor: clipColor,
  cLum: cLum,
  desaturateColor: desaturateColor,
  fullColorHex: fullColorHex,
  rgbToHex: rgbToHex,
  convertHex: convertHex
}, "normalize", normalize);
