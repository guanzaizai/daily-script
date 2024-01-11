"ui";

// const { cli } = require("webpack");
var common = require('./common.js');
var doSkm = require('./do_skm.js');
var doFb = require('./do_fb.js');
const { colorConfigs } = require('./find_skm.js');

var skmConfig = {
    // 配置参数
    configFbGreenName: '',
    configFbGreenContinue: 0,
    configFbGreenNum: 1,
    configFbRedName: '',
    configFbRedContinue: 0,
    configFbRedNum: 1,
    configAutoFight: false,
    // 判断参数
    checkHasWhiteTickets: false,
    checkHasGreenTickets: true,

    // 统计参数
    countFbGreenTotal: 0,
    countFbRedTotal: 0,
    countFightCurrentNum: 0,
    countFightToal: 0,
};

global.skmConfig = skmConfig;


// 正确示范：
// 通过一个开关表示无障碍权限是否开启
// 如果用户没有开启直接运行则提示

ui.layout(
    <vertical>
        <appbar>
            <toolbar title="自动化测试" />
        </appbar>
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />

        <horizontal marginLeft="20sp">
            <text textSize="14sp">绿票</text>
            <spinner id="sp1" entries="跳过|奥加" />
            <text textSize="14sp">关卡</text>
            <spinner id="sp11" entries="0|1|2|3|4|5" />
            <text textSize="14sp">次数</text>
            <spinner id="sp12" entries="1|2|3|4|5|99" />
        </horizontal>
        <View bg="#DCDCDC" h="1sp" marginLeft="30sp" marginRight="30sp" />
        <horizontal marginLeft="20sp">
            <text textSize="14sp">红票</text>
            <spinner id="sp2" entries="跳过|漩涡" />
            <text textSize="14sp">关卡</text>
            <spinner id="sp21" entries="0|1|2|3|4|5" />
            <text textSize="14sp">次数</text>
            <spinner id="sp22" entries="1|2|3|4|5|99" />
        </horizontal>
        <View bg="#DCDCDC" h="1sp" marginLeft="30sp" marginRight="30sp" />
        <horizontal marginLeft="30sp">
            <text textSize="16sp">自动战斗</text>
            <checkbox id="cb1" marginLeft="16" />
        </horizontal>

        <button id="test">测试配置</button>
        <button id="start" text="开始运行" />
    </vertical>
);

ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }

    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.test.on("click", () => {
    init_config();
    toast_config();
});

ui.cb1.on("check", (checked) => {
    if (checked) {
        skmConfig.configAutoFight = true;
    } else {
        skmConfig.configAutoFight = false;
    }
});

ui.start.on("click", function () {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toastLog("请先开启无障碍服务！");
        return;
    }
    main();
});

// events.on("exit", function () {
//     toast("结束了")
//     ui.run(() => {
//         let greenNum = skmConfig.doGreenNumCount;
//         let redNum = skmConfig.doRedNumCount;
//         let fightCount = skmConfig.totalFightCount;

//         // 创建一个 AlertDialog
//         dialogs.build({
//             title: "线程已结束",
//             content: `绿本次数: ${greenNum}\n红本次数: ${redNum}\n战斗次数：${fightCount}`,
//             positive: "OK",
//             cancelable: false
//         }).show();
//     });
//     sleep(5000)
// });

// 设置sp1的默认值为第一个选项
// ui.sp2.setSelection(1);
// ui.start.performClick();

function main() {
    // 不能在UI线程执行阻塞，不然会崩溃
    main_threads = threads.start(function () {
        // 判断截图权限，会死机
        launchApp("ANOTHER EDEN");
        sleep(3000)
        //请求截图
        //每次使用该函数都会弹出截图权限请求，建议选择“总是允许”。
        if (!requestScreenCapture()) {
            toast("请求截图失败");
            exit();
        }
        sleep(2000)
        // 先截图，获取后续操作权限
        var img = images.captureScreen();
        // 这里写脚本的主逻辑

        init_config();

        doFb.doFbGreen();
        // doFb.doFbRed();
        // doSkm.doAutoFight();
        // do_auto_fight();

    });
}

function init_config() {
    skmConfig.configFbGreenName = ui.sp1.getSelectedItem();
    skmConfig.configFbGreenContinue = Number(ui.sp11.getSelectedItem());
    skmConfig.configFbGreenNum = Number(ui.sp12.getSelectedItem());

    skmConfig.configFbRedName = ui.sp2.getSelectedItem();
    skmConfig.configFbRedContinue = Number(ui.sp21.getSelectedItem());
    skmConfig.configFbRedNum = Number(ui.sp22.getSelectedItem());
}

function toast_config() {
    toastLog(skmConfig.configFbGreenName + "|" + skmConfig.configFbGreenContinue + "|" + skmConfig.configFbGreenNum)
}

function checkPreFbGreen() {
    let checkPass = false;
    // 位置
    let findResult = findFbDoor();
    toastLog("find door " + findResult);
    if (!findResult) {
        checkPass = this.doGotoFbDoor();
    }
    if (!checkPass) {
        return false;
    }
    return true;
    // 白票
    // 队伍
}