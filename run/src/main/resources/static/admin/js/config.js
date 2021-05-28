const menu = [{
    "name": "首页",
    "icon": "&#xe68e;",
    "url": "/index",
    "hidden": false,
    "list": []
}, {
    "name": "试题管理",
    "icon": "&#xe653;",
    "url": "/topic/getPage",
    "hidden": false,
    "list": [{
        "name": "单选题列表",
        "url": "/singleChoiceQuestion/getPage",
    }, {
        "name": "新增单选题",
        "url": "/singleChoiceQuestion/toInsertPage",
    }, {
        "name": "多选题列表",
        "url": "/multipleChoiceQuestions/getPage"
    }, {
        "name": "新增多选题",        "url": "/multipleChoiceQuestions/toInsertPage"
    }, {
        "name": "填空题列表",
        "url": "/answer/getPage"
    },{
        "name": "新增填空题",
        "url": "/answer/toInsertPage"
    }]
}, {
    "name": "用户管理",
    "icon": "&#xe612;",
    "url": "",
    "hidden": false,
    "list": [{
        "name": "用户列表",
        "url": "user_index.html"
    }, {
        "name": "添加用户",
        "url": "user_add.html"
    }]
}, {
    "name": "退出登录",
    "icon": "&#xe65c;",
    "url": "out.html",
    "list": []
}];

const config = {
    name: "EXAM",
    menu: menu,
};
