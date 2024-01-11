const common = require('./common.js');
const { colorConfigs } = require('./find_skm.js');

const clickSkm = {
    clickFbDoor: (option = { click: true, duration: 3000 }) => {
        return common.findMultiColorsOption(colorConfigs.find_fb_door, option)
    },

    clickClosePop: () => {
        common.clickDuration(982, 485, 1500)
    },

    clickCloseMaterialsDialogPop: () => {
        for (let i = 0; i < 10; i++) {
            if (common.findMultiColorsOption(colorConfigs.find_materials_dialog_pop, { click: true, duration: 1500 })) {
                return;
            }
            sleep(500);
        }
    },


    clickOk: (option = { click: true, duration: 1500 }) => {
        return common.findMultiColorsOption(colorConfigs.find_menu_ok, option)
    },

    clickYesByYesNoMenu: () => {

    },

    clickTopRightX: (option = { click: true, duration: 1500 }) => {
        return common.findMultiColorsOption(colorConfigs.find_menu_top_right_x, option)
    },
}

module.exports = clickSkm;