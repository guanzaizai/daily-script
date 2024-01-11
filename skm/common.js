const common = {
    moveLeft: (duration = 1500) => {
        swipe(1000, 400, 100, 400, duration);
        sleep(500);
    },

    moveRight: (duration = 1500) => {
        swipe(100, 400, 1000, 400, duration);
        sleep(500);
    },

    moveUp: (duration = 1500) => {
        swipe(560, 520, 560, 300, duration);
        sleep(1000);
    },

    moveDown: (duration = 1500) => {
        swipe(560, 300, 560, 520, duration);
        sleep(1000);
    },

    clickDuration: (x, y, duration = 1000) => {
        click(x, y);
        sleep(duration);
    },

    clickFuzzy(xy, xyArr, num = 10) {
        common.clickDuration(xy[0], xy[1], 500);
        for (var i = 0; i < num; i++) {
            common.clickDuration(random(xyArr[0], xyArr[2]), random(xyArr[1], xyArr[3]), 500);
        }
        sleep(500);
    },

    findMultiColors: (img, firstColor, colors, options) => {
        if (typeof img === 'string') {
            img = images.captureScreen();
        }
        return images.findMultiColors(img, firstColor, colors, options);
    },

    findMultiColorsOption: (colorConfigs, option) => {
        if (!colorConfigs) {
            return;
        }
        let xy = common.findMultiColors(images.captureScreen(), colorConfigs[1], colorConfigs[2], colorConfigs[3]);
        if (!xy) {
            let loopCountMax = 3;
            if (option && option.wait) {
                loopCountMax = option.wait;
            }
            for (var i = 0; i < loopCountMax; i++) {
                xy = common.findMultiColors(images.captureScreen(), colorConfigs[1], colorConfigs[2], colorConfigs[3]);
                if (xy) {
                    break;
                }
                sleep(1000);
            }
        }

        if (option && xy) {
            if (option.click) {
                common.clickDuration(xy.x, xy.y, option.duration);
            }
        }
        if (option && option.toast) {
            toastLog(option.toast + "|result:" + xy);
        }
        if (option && option.callback) {
            option.callback(xy);
        }
        return xy;
    },

    findDetectsColor: (x, y, color) => {
        return images.detectsColor(images.captureScreen(), color, x, y);
    },

};

module.exports = common;