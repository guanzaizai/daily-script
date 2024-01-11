const { clickDuration, findMultiColorsOption, findDetectsColor, moveLeft, moveRight, moveDown, moveUp, clickFuzzy } = require('./common.js');
const doSkm = require('./do_skm.js');
const clickSkm = require('./click_skm.js');
const { colorConfigs } = require('./find_skm.js');

const doFb = {
    doFbGreen: () => {
        let green = skmConfig.configFbGreenName;
        let greenFbContinue = skmConfig.configFbGreenContinue;
        let configFbGreenNum = skmConfig.configFbGreenNum;
        let currentFbNum = 0;
        outer: do {
            switch (green) {
                case '奥加':
                    fbGreen.doFbGreenAojia(greenFbContinue);
                    break;
                default:
                    break outer;
            }
            greenFbContinue = 0;
            currentFbNum++;
            skmConfig.countFbGreenTotal += 1;
            sleep(3000);
        } while (!skmConfig.checkHasWhiteTickets && skmConfig.checkHasGreenTickets && currentFbNum < configFbGreenNum);
    },

    doFbRed: () => {
        let currentFbNum = 0;
        let red = skmConfig.configFbRedName;
        let redFbContinue = skmConfig.configFbRedContinue;
        let configFbRedNum = skmConfig.configFbRedNum;

        doSkm.doGotoFbDoor();

        outer: do {
            var checkHasWhiteTickets = doSkm.checkHasWhiteTickets();
            if (checkHasWhiteTickets) {
                return;
            }
            switch (red) {
                case '工业废墟':
                    fbRed.doFbGyfx(redFbContinue);
                    break;
                default:
                    break outer;
            }
            redFbContinue = 0;
            currentFbNum++;
            skmConfig.countFbRedTotal += 1;
        } while (currentFbNum < configFbRedNum);
    },

    doFbEvaluate: () => {
        for (let i = 0; i < 10; i++) {
            var img = images.captureScreen();

            // 回到门前，判断左下角的选单
            var result = images.findMultiColors(img, "#8a7f8a", [[-1, 11, "#817081"], [-1, 17, "#7d6b7e"], [17, 22, "#f0f0f0"], [4, 19, "#7b687c"], [23, 19, "#fdfdfc"]], { region: [0, 597, 120, 122], threshold: [26] })
            if (result) {
                break
            }

            // 結算，目前判断天值翅膀颜色
            result = images.findMultiColors(img, "#f6e141", [[3, -3, "#f7ea5b"], [9, 3, "#f4dc34"], [6, 6, "#fdef36"], [14, 1, "#feec48"], [17, -8, "#f9f496"], [21, -12, "#fefefa"], [-3, 7, "#eac636"], [9, 9, "#f6ce3a"], [6, 4, "#efd62d"]], { region: [419, 172, 124, 121], threshold: [26] })
            if (result) {
                click(132, 379)
                continue
            }

            // 白色鑰匙，待验证
            result = images.findMultiColors(img, "#faffff", [[-7, -2, "#585456"], [-11, 3, "#b9d1e1"], [-1, 9, "#e3fefd"], [-6, 8, "#cfecff"], [-1, 2, "#f4fefe"], [1, -1, "#feffff"], [-3, -10, "#5b4d4f"], [5, -1, "#f4ffff"], [5, -4, "#ffffff"]], { region: [382, 379, 116, 119], threshold: [26] })
            if (result) {
                skmConfig.whiteKey = true
                sleep(500)
                click(132, 379)
                toastLog("获得白色钥匙:" + skmConfig.whiteKey)
            }

            click(132, 379)

            sleep(2000)
        }
    },
}

const fbRed = {

    doFbGyfx: (fbContinue) => {
        let clickResult = clickSkm.clickFbDoor();
        if (!clickResult) {
            return;
        }



    },

    do_fb_red_dragon: (fbContinue) => {
        do_fb_red_dragon_1();
        sleep(2000)
        do_fb_red_dragon_2();
        sleep(2000)
        do_fb_red_dragon_3()
        sleep(2000)
        do_fb_red_dragon_4()
        sleep(2000)
        do_fb_evaluate()
    },
    do_fb_red_dragon_4: () => {
        moveRight(2000)
        sleep(500)
        moveLeft(1000)
        sleep(500)
        click(414, 230)
        sleep(500)
        click_range(320, 181, 535, 280, 10)
        sleep(500)
        moveLeft(3000)
        sleep(500)
        click(777, 393)
        sleep(1000)
        doSkm.doCurrentAutoFight(1)
    },
    do_fb_red_dragon_3: () => {
        doSkm.doCurrentAutoFight(5);
        sleep(500)

        moveLeft(5000)

        sleep(500)
        moveRight(1800)
        sleep(500)

        click(618, 372)
        sleep(500)
        click_range(530, 329, 703, 412, 10)

        moveRight(7000)
        sleep(500)
        click(543, 383)
        sleep(500)
        click_range(502, 355, 606, 411, 10)
        sleep(500)
        moveLeft(2600)
        sleep(500)
        moveDown(1000)
        sleep(500)
        moveLeft(2000)
        sleep(500)
        moveRight(2400)
        sleep(500)
        click(618, 372)
        sleep(500)
        click_range(536, 330, 693, 400, 10)
        sleep(500)
        moveRight(8000)
        sleep(500)

        click(573, 366)
        sleep(500)
        click_range(484, 333, 678, 403, 10)
        sleep(500)

        moveLeft(2400)
        sleep(500)
        click(681, 234)
        sleep(500)
        click_range(617, 201, 749, 276, 10)
        sleep(500)
        moveRight(3000)
        sleep(500)
        moveLeft(900)
        sleep(500)
        moveUp(1000)
        sleep(500)
        moveLeft(3000)
        sleep(500)
        doSkm.doCurrentAutoFight(1)
        sleep(500)
        moveRight(5000)
        sleep(500)
        moveLeft(2600)
        sleep(500)
        moveUp(1000)
        sleep(500)
        moveLeft(800)
        sleep(500)
        click(543, 377)
        sleep(500)
        click_range(474, 330, 651, 405, 10)
        sleep(500)
        moveLeft(6000)
        sleep(500)
        moveRight(2500)
        sleep(500)
        click(535, 234)
        sleep(500)
        click_range(472, 296, 610, 266, 10)
        sleep(500)
        moveRight(5000)
        sleep(500)
        moveUp(1000)
    },
    do_fb_red_dragon_2: () => {
        doSkm.doCurrentAutoFight(5);

        sleep(500);
        moveLeft(3000);
        sleep(500);
        moveRight(800);
        sleep(500);
        moveDown(1000);

        sleep(500);
        moveRight(3000);
        sleep(500);
        moveLeft(850);

        sleep(500);
        moveDown(1000);
        sleep(500);
        moveRight(2000);
        sleep(500);
        moveLeft(2000);

        sleep(500);
        click(788, 228);
        sleep(500);
        click_range(710, 200, 910, 293, 10);
        sleep(500);


        moveLeft(800)
        sleep(500)

        click(552, 380)
        sleep(500)
        click_range(464, 351, 619, 414, 10)
        sleep(500)


        moveLeft(5000)
        sleep(500)
        moveRight(1000)

        sleep(500)
        moveUp(1000)
        sleep(500)
        moveLeft(1000)
        sleep(500)
        click(681, 378)
        sleep(500)
        click_range(591, 327, 779, 398, 10)

        sleep(500)
        moveLeft(8000)
        sleep(500)

        click(715, 386)
        sleep(500)
        click_range(656, 342, 774, 414, 10)
        sleep(500)


        moveRight(900)
        sleep(500)
        moveUp(1000)
        sleep(500)
        doSkm.doCurrentAutoFight(1)

        sleep(500)
        moveLeft(5000)
        sleep(500)
        moveRight(900)
        sleep(500)
        moveDown(1000)
        sleep(500)
        moveLeft(3000)
        sleep(500)
        moveRight(2600)
        sleep(500)
        moveDown(1000)
        sleep(500)
        moveRight(2000)

        click(563, 232)
        sleep(500)
        click_range(509, 196, 673, 273, 10)
        sleep(500)
        moveRight(5000)
        sleep(500)
        moveLeft(4300)
        sleep(500)
        moveDown(1000)

    },
    do_fb_red_dragon_1: () => {
        doSkm.doCurrentAutoFight(5);
        moveLeft(5000);
        moveRight(3000);

        // 拾取第一个
        click(556, 354);
        sleep(500);
        click_range(513, 329, 835, 431, 20);


        moveRight(3000);
        sleep(500);
        moveLeft(1000);
        sleep(500);
        moveUp(1000);
        sleep(500);

        moveLeft(5000);
        sleep(500);
        click(719, 239);
        sleep(500);
        click_range(666, 204, 771, 284, 10);

        sleep(500);
        moveRight(2600);
        sleep(500);
        moveUp(1000);
        sleep(500);
        moveLeft(2000);
        sleep(500);

        click(704, 354)
        sleep(500)
        click_range(648, 325, 763, 386, 10)
        sleep(500)


        moveRight(2500);
        click(542, 233);
        sleep(500);
        click_range(489, 198, 670, 294, 10);
        sleep(500);

        moveRight(5000);
        sleep(500);
        moveLeft(900);
        sleep(500);

        moveDown(1000);
        sleep(500);

        // **
        moveRight(500);
        sleep(500);

        click(823, 375);
        sleep(500);
        click_range(722, 333, 919, 425, 10);

        moveRight(7000);
        sleep(500);

        moveLeft(1400);
        sleep(500);

        moveDown(1000);
        sleep(500);
        doSkm.doCurrentAutoFight(1);
        sleep(500);

        moveRight(5000);
        sleep(500);
        moveLeft(900);
        sleep(500);

        moveUp(1000);
        sleep(500);
        moveRight(2000);
        sleep(500);
        moveUp(1000);
    },

    doFbRedDxw: (fbContinue) => {
        if (this.getFbContinue(fbContinue, 1)) {
            clickDuration(639, 143, 3000);
            clickDuration(81, 109, 1000);
            clickDuration(333, 655, 1000);
            clickDuration(863, 253, 1000);
            clickDuration(779, 642, 1000);
            sleep(7000);
            moveRight(2200);
            sleep(500);
            clickDuration(573, 245, 3000);
            clickDuration(577, 212, 4000);
            this.clickYesNoMenu();
            sleep(6000);
        }
        if (this.getFbContinue(fbContinue, 2)) {
            this.doFbRedDxw01();
            sleep(3000);
        }
        if (this.getFbContinue(fbContinue, 3)) {
            this.doFbRedDxw02();
            sleep(3000);
        }
        if (this.getFbContinue(fbContinue, 4)) {
            this.doFbRedDxw03();
            sleep(3000);
        }
        if (this.getFbContinue(fbContinue, 5)) {
            this.doFbRedDxw04();
            sleep(2000);
            this.doFbEvaluate();
        }
    },

    do_fb_red_dxw_01: () => {
        doSkm.doCurrentAutoFight(5)
        moveLeft(4000)
        moveRight(700)
        moveUp()
        moveLeft(800)
        clickFuzzy([505, 406], [349, 382, 646, 450])
        moveLeft(1600)
        moveUp()
        moveLeft(2000)
        clickFuzzy([888, 269], [813, 241, 1002, 301])
        moveLeft(3000)
        clickFuzzy([661, 382], [519, 389, 792, 407])
        moveRight(700)
        moveDown()
        moveRight(1800)
        moveDown()
        moveRight(1000)
        clickFuzzy([621, 403], [514, 388, 766, 426])
        moveLeft(2000)
        clickFuzzy([534, 261], [421, 237, 648, 298])
        moveLeft(3000)
        moveRight(700)
        moveUp()
        moveLeft(3000)
        moveDown()
    },
    do_fb_red_dxw_02: () => {
        doSkm.doCurrentAutoFight(5)
        sleep(500)
        moveLeft(3000)
        sleep(500)
        moveRight(2600)
        sleep(500)
        moveUp(1000)
        sleep(500)
        doSkm.doCurrentAutoFight(1)
        sleep(500)
        moveRight(5000)
        sleep(500)
        moveLeft(700)
        sleep(500)
        moveDown(1000)
        sleep(500)
        moveRight(800)
        sleep(500)
        click(757, 373)
        sleep(500)
        click_range(690, 349, 909, 427, 10)
        sleep(500)
        moveRight(1500)
        sleep(500)
        moveDown(1000)
        sleep(500)
        moveLeft(2000)
        sleep(500)
        click(875, 264)
        sleep(500)
        click_range(777, 225, 993, 298, 10)
        sleep(500)
        moveRight(5000)
        sleep(500)
        click(505, 262)
        sleep(500)
        click_range(409, 223, 621, 300, 10)
        sleep(500)
        moveRight(3000)
        sleep(500)
        moveLeft(700)
        sleep(500)
        moveUp(1000)
        sleep(500)
        moveLeft(2500)
        sleep(500)
        moveUp(1000)
        sleep(500)
        moveRight(3000)
        sleep(500)
        moveDown(1000)
    },
    do_fb_red_dxw_03: () => {
        doSkm.doCurrentAutoFight(5)
        sleep(500)
        moveRight(8000)
        sleep(500)
        moveLeft(3000)
        sleep(500)
        click(478, 400)
        sleep(500)
        click_range(358, 377, 605, 449, 10)
        sleep(500)
        moveLeft(5000)
        sleep(500)
        moveRight(700)
        sleep(500)
        moveDown(1000)
        sleep(500)
        doSkm.doCurrentAutoFight(1)
        sleep(500)
        moveLeft(3000)
        sleep(500)
        moveRight(700)
        moveDown()
        moveRight(1500)
        clickFuzzy([607, 409], [487, 396, 758, 426])
        moveRight(8000)
        clickFuzzy([527, 265], [443, 224, 616, 298])
        moveLeft(2000)
        sleep(500)
        moveUp(1000)
        sleep(500)
        moveLeft(2000)
        sleep(500)
        moveRight(1500)
        sleep(500)
        click(670, 386)
        sleep(500)
        click_range(614, 356, 814, 418, 10)
        sleep(500)
        moveLeft(2000)
        sleep(500)
        moveRight(700)
        sleep(500)
        moveDown(1000)
        sleep(500)
        moveLeft(10000)
        sleep(500)
        moveRight(800)
        sleep(500)
        moveUp(1000)
    },
    do_fb_red_dxw_04: () => {
        moveLeft(1500)
        sleep(500)
        click(715, 259)
        sleep(500)
        click_range(647, 244, 817, 294, 10)
        sleep(500)
        moveLeft(2000)
        sleep(500)
        click(777, 393)
        sleep(1000)
        doSkm.doCurrentAutoFight(1)
    },
}

const fbGreen = {
    doFbGreenAojia: (fbContinue) => {
        toastLog("doFbGreenAojia:fbContinue:" + fbContinue)

        switch (fbContinue) {
            case 0:
                if (doSkm.checkHasWhiteTickets()) {
                    return
                }
                doSkm.changeTeam(9);
                fbGreen.doFbGreenAojia00();
                sleep(8000);
            case 1:
                fbGreen.doFbGreenAojia01();
                sleep(8000);
            case 2:
                fbGreen.doFbGreenAojia02();
                sleep(4000);
            case 3:
                fbGreen.doFbGreenAojia03();
            default:
                doFb.doFbEvaluate();
                break;
        }
    },
    doFbGreenAojia00: () => {
        let clickResult = clickSkm.clickFbDoor();
        if (!clickResult) {
            return;
        }
        clickDuration(573, 124, 1500)
        clickDuration(635, 362, 1500)
        clickDuration(863, 253, 1500)
        var noTickets = findMultiColorsOption(colorConfigs.find_fb_no_tickets);
        if (noTickets) {
            skmConfig.checkHasGreenTickets = false;
            return;
        }
        clickDuration(779, 642, 1000)
    },
    doFbGreenAojia01: () => {
        moveLeft(2000)
        moveRight(1500)
        moveDown(1000)
        moveLeft(15000)
        clickFuzzy([609, 363], [510, 346, 722, 380])
        moveRight(3500)
        clickFuzzy([487, 288], [386, 257, 641, 320])
        moveLeft(4000)
        moveRight(2500)
        moveUp(1000)
        doSkm.doCurrentAutoFight(1)
        moveRight(5000)
        clickFuzzy([709, 346], [596, 316, 828, 385])
        moveLeft(3500)
        moveUp(1000)
        moveLeft(2000)
        clickFuzzy([632, 349], [518, 312, 735, 380])
        sleep(1000)
        // 铃铛
        if (findMultiColorsOption(colorConfigs.find_fb_aojia_lingdang)) {
            moveRight(2200)
            moveUp()
            clickFuzzy([505, 194], [395, 166, 657, 191])
            sleep(3000)
            clickSkm.clickCloseMaterialsDialogPop();
            moveDown()
            moveLeft(4000)
        }


        moveRight(1200)
        moveDown()
        moveLeft(4000)
        clickFuzzy([635, 354], [512, 305, 749, 386])
        moveRight(1100)
        moveDown()
        doSkm.doCurrentAutoFight(1)
        moveRight(4000)
        moveLeft(3000)
        moveDown()
        moveRight(3000)
        doSkm.doCurrentAutoFight(1)
        clickSkm.clickCloseMaterialsDialogPop();
        moveLeft(7000)
        clickFuzzy([418, 333], [344, 320, 500, 346])
        moveRight(3500)
        moveDown()
        doSkm.doCurrentAutoFight(1)
        moveLeft(5000)
        clickFuzzy([495, 328], [433, 322, 621, 343])
        sleep(500)
        moveRight(7000)
        sleep(500)
        clickFuzzy([353, 323], [267, 274, 519, 367])
        sleep(500)
        moveRight(3000)
        moveLeft(1000)
        click(771, 184)
        sleep(4000)
        // // 第三副本
        click(411, 514)
        sleep(6000)
        moveRight(1000)
        sleep(500)
        click(421, 225)
        sleep(2000)
        click(780, 393)
    },
    doFbGreenAojia02: () => {
        moveLeft(1000)

        clickFuzzy([923, 215], [784, 177, 1072, 211])

        var hasMenu = findMultiColorsOption(colorConfigs.find_yes_no_option_menu);
        if (hasMenu) {
            clickFuzzy([775, 389], [704, 377, 869, 412])
            moveLeft(3000)
            moveRight(1100)
            moveUp()
            moveLeft(3000)
            doSkm.doCurrentAutoFight(1)
            clickSkm.clickCloseMaterialsDialogPop();
            sleep(500)
            moveLeft(4000)
            moveRight(800)
            moveUp()
            doSkm.doCurrentAutoFight(1)
            clickSkm.clickCloseMaterialsDialogPop();
            sleep(500)
            moveRight(8000)
            moveLeft(800)
            moveDown()
            moveRight(2000)
            doSkm.doCurrentAutoFight(1)
            clickSkm.clickCloseMaterialsDialogPop();
            sleep(500)
            moveRight(10000)
            moveLeft(2200)
            moveUp()
            moveRight(1000)
            doSkm.doCurrentAutoFight(1)
            clickSkm.clickCloseMaterialsDialogPop();
            moveRight(4000)
            moveLeft(1000)
            moveUp()
            moveRight(2000)
            doSkm.doCurrentAutoFight(1)
            clickSkm.clickCloseMaterialsDialogPop();
            moveLeft(8000)
            doSkm.doCurrentAutoFight(1)
            clickSkm.clickCloseMaterialsDialogPop();
            sleep(2000)
            click(627, 397)
            sleep(3000)
        }
        moveLeft(4000)
        clickFuzzy([320, 246], [230, 236, 430, 258])
        moveRight(7000)
        clickFuzzy([443, 206], [290, 197, 642, 223])
        moveRight(5000)
        moveLeft(1000)
        moveUp()
        doSkm.doCurrentAutoFight(1)
        moveLeft(7000)
        doSkm.doCurrentAutoFight(1)
        moveLeft(5000)
        moveRight(1000)
        moveUp()
        doSkm.doCurrentAutoFight(1)
        clickSkm.clickCloseMaterialsDialogPop();
        moveRight(8000)
        moveLeft(2000)
        moveUp()
        moveLeft(1000)
        doSkm.doCurrentAutoFight(1)
        moveRight(8000)
        doSkm.doCurrentAutoFight(1)
        moveRight(8000)
        moveLeft(5000)
        moveUp()
        moveRight(3000)
        clickFuzzy([947, 235], [820, 225, 1064, 254])
        moveLeft(4000)
        doSkm.doCurrentAutoFight(1)
        moveLeft(8000)
        moveRight(2800)
        moveUp()
    },
    doFbGreenAojia03: () => {
        clickFuzzy([761, 315], [706, 309, 820, 328])
        moveLeft(4000)

        findMultiColorsOption(colorConfigs.find_button_yes_by_yes_or_no, { click: true, duration: 2000 })

        doSkm.doCurrentAutoFight(1)
    },
}

module.exports = doFb