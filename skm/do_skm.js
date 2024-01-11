const clickSkm = require('./click_skm.js');
const { clickDuration, findMultiColorsOption, findDetectsColor, moveLeft, moveRight, moveDown, moveUp } = require('./common.js');
const { colorConfigs } = require('./find_skm.js');

const doSkm = {

    doAutoFight: () => {
        if (findMultiColorsOption(colorConfigs.find_fight_button, { click: true, duration: 2000 })) {
            for (let i = 0; i < 20; i++) {
                if (findMultiColorsOption(colorConfigs.find_fight_button, { click: true, duration: 2000 })) {
                    continue
                }
                sleep(1000)
                if (findMultiColorsOption(colorConfigs.find_fight_end_view, { click: true, duration: 2000 })) {
                    skmConfig.countFightCurrentNum += 1;
                    skmConfig.countFightToal += 1;
                    return 1;
                }
                sleep(1000)
            }
        } else if (findMultiColorsOption(colorConfigs.find_fight_end_view, { click: true, duration: 2000 })) {
            skmConfig.countFightCurrentNum += 1;
            skmConfig.countFightToal += 1;
            sleep(1000)
            return 1;
        } else {
            moveLeft(2000);
            moveRight(2000);
            return 0;
        }
    },

    doCurrentAutoFight: (num) => {
        let count = 0;
        let loopCount = 0;
        let loopCountMax = num * 10;
        while (count < num && loopCount < loopCountMax) {
            count += (doSkm.doAutoFight() || 0);
            loopCount++;
        }
        skmConfig.countFightCurrentNum = 0;
        sleep(3000);
    },

    doGotoFbDoor: () => {
        let findResult = findMultiColorsOption(colorConfigs.find_map_button, { click: true, duration: 3000 });
        if (!findResult) {
            toastLog("can't find map menu");
            return;
        }
        clickDuration(441, 99, 1500);

        findResult = findMultiColorsOption(colorConfigs.find_map_ciyuan, { click: true, duration: 2000 });
        if (!findResult) {
            clickDuration(1192, 656, 1500);
            clickDuration(257, 440, 1500);
            findResult = findMultiColorsOption(colorConfigs.find_map_ciyuan, { click: true, duration: 2000 });
        }

        if (!findResult) {
            toastLog("can't find map ciyuan");
            return;
        }

        clickDuration(812, 260, 1500);

        findResult = findMultiColorsOption(colorConfigs.find_yes_no_option_menu, { click: true, duration: 1000 });

        if (!findResult) {
            return;
        }

        sleep(6000)
        moveLeft(900);
        return true;
    },

    checkHasWhiteTickets: () => {
        let findResult = findMultiColorsOption(colorConfigs.find_fb_door, { click: true, duration: 2000 });
        if (!findResult) {
            doSkm.doGotoFbDoor();
            findResult = findMultiColorsOption(colorConfigs.find_fb_door, { click: true, duration: 2000 });
        }

        if (!findResult) {
            return
        }
        sleep(1000)
        clickDuration(445, 121, 2000)

        findResult = findMultiColorsOption(colorConfigs.find_fb_huanlj)

        if (findResult) {
            skmConfig.checkHasWhiteTickets = true
            clickDuration(1245, 22, 2000)
            return true;
        }

        clickDuration(1190, 652, 2000)

        findResult = findMultiColorsOption(colorConfigs.find_fb_huanxj)

        if (findResult) {
            skmConfig.checkHasWhiteTickets = true
            clickDuration(1245, 22, 2000)
            return true;
        }
        clickDuration(1245, 22, 2000)
    },

    changeTeam: (teamNum) => {
        let pointColor;
        switch (teamNum) {
            case 9:
                pointColor = colorConfigs.find_point_team_09;
                break
            case 10:
                pointColor = colorConfigs.find_point_team_10;
                break
            default:
                break
        }
        if (!pointColor) {
            return;
        }


        findMultiColorsOption(colorConfigs.find_menu_option, { click: true, duration: 1000 });
        findMultiColorsOption(colorConfigs.find_menu_team, { click: true, duration: 2500 });
        for (var i = 0; i < 10; i++) {
            findResult = findDetectsColor(pointColor[0], pointColor[1], pointColor[2]);
            if (findResult) break
            clickDuration(1242, 394, 1500);
        }
        clickSkm.clickTopRightX();
    }
}

module.exports = doSkm