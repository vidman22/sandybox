import { Dimensions, Platform } from 'react-native';

// iphone 5s width: 320, height: 568
// iphone 6 width: 375, height: 667
// iphone 7 plus width: 414, height: 736
// ipad 9.7 width: 768, height: 1024

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
let ratioX = x <= 375 ? (x <= 320 ? 0.75 : 0.875) : 1;
let ratioY = y <= 568 ? (y <= 560 ? 0.55 : 0.875) : 1;

// For Tablets
if (x >= 768) {
    ratioX = 1.25;
}
if (y >= 1024) {
    ratioY = 1.25;
}

// We set our base font size value
const baseUnit = 26;

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX;

// We add an em() shortcut function 
function em(value) {
  return unit * value;
}

// Then we set our styles with the help of the em() function
export default {
    // GENERAL
    DEVICE_WIDTH: x,
    DEVICE_HEIGHT: y,
    RATIO_X: ratioX,
    RATIO_Y: ratioY,
    UNIT: em(1),
    PADDING: y >= 568 ? em(1.25) : em(1),

    // CARD
    CARD_WIDTH: x - em(1.25) * 2,
    CARD_HEIGHT: (x - em(1.25) * 2) * (3 / 5),
    CARD_PADDING_X: em(1.875),
    CARD_PADDING_Y: em(1.25),

    // FONT
    // FONT_SIZE: em(1),
    // FONT_SIZE_SMALLER: em(0.75),
    // FONT_SIZE_SMALL: em(0.875),
    // FONT_SIZE_TITLE: em(1.25),

    FONT_SIZE_TITLE: 22 * ratioX,

    scaleFont: size => size * ratioX,
    scaleY: size => size * ratioY,
    scaleX: size => size * ratioX,

    fonts: {
        // 'brandon-bold': 'BrandonGrotesque-Bold',
        // 'brandon-bold-italic': 'BrandonGrotesque-BoldItalic',
        // 'brandon-black': 'BrandonGrotesque-Black',
        // 'brandon-black-italic': 'BrandonGrotesque-BlackItalic',
        // 'brandon-light': 'BrandonGrotesque-Light',
        // 'brandon-light-italic': 'BrandonGrotesque-LightItalic',
        // 'brandon-med': 'BrandonGrotesque-Medium',
        // 'brandon-med-italic': 'BrandonGrotesque-MediumItalic',
        // 'brandon': 'BrandonGrotesque-Regular',
        // 'brandon-italic': 'BrandonGrotesque-RegularItalic',
        // 'brandon-thin': 'BrandonGrotesque-Thin',
        // 'brandon-thin-italic': 'BrandonGrotesque-ThinItalic'
         ...Platform.select({
            ios: {
                'brandon-bold': 'BrandonGrotesque-Bold',
                'brandon-bold-italic': 'BrandonGrotesque-BoldItalic',
                'brandon-black': 'BrandonGrotesque-Black',
                'brandon-black-italic': 'BrandonGrotesque-BlackItalic',
                'brandon-light': 'BrandonGrotesque-Light',
                'brandon-light-italic': 'BrandonGrotesque-LightItalic',
                'brandon-med': 'BrandonGrotesque-Medium',
                'brandon-med-italic': 'BrandonGrotesque-MediumItalic',
                'brandon': 'BrandonGrotesque-Regular',
                'brandon-italic': 'BrandonGrotesque-RegularItalic',
                'brandon-thin': 'BrandonGrotesque-Thin',
                'brandon-thin-italic': 'BrandonGrotesque-ThinItalic'
            },
            android: {
                // 'brandon-bold': 'Brandon_bld',
                // 'brandon-bold-italic': 'Brandon_bld_it',
                // 'brandon-black': 'Brandon_blk',
                // 'brandon-black-italic': 'Brandon_blk_it',
                // 'brandon-light': 'Brandon_light',
                // 'brandon-light-italic': 'Brandon_light_it',
                // 'brandon-med': 'Brandon_med',
                // 'brandon-med-italic': 'Brandon_med_it',
                // 'brandon': 'Brandon_reg',
                // 'brandon-italic': 'Brandon_reg_it',
                // 'brandon-thin': 'Brandon_thin',
                // 'brandon-thin-italic': 'Brandon_thin_it',
                'brandon-bold': 'brandon-bold',
                'brandon-bold-italic': 'brandon-bold-italic',
                'brandon-black': 'brandon-black',
                'brandon-black-italic': 'brandon-black-italic',
                'brandon-light': 'brandon-light',
                'brandon-light-italic': 'brandon-light-italic',
                'brandon-med': 'brandon-med',
                'brandon-med-italic': 'brandon-med-italic',
                'brandon': 'brandon',
                'brandon-italic': 'brandon-italic',
                'brandon-thin': 'brandon-thin',
                'brandon-thin-italic': 'brandon-thin-italic'
            }
         })
    }
};
