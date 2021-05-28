layui.use(['element', 'laypage', 'layer', 'form', 'layedit', 'laydate', 'util'], function () {

    //region 组件
    let $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        selfConfig = {},
        publicDOM = {
            body: $('body'),
            include_DIV: $("#include_DIV"),
            //点击添加选项时的弹出框
            $addOption: $('#addOption_html').show(),
            //当弹出框显示信息较少时,用这个
            $doOptionDiv: $("<div><p style='font-size: 30px;padding: 50px;align-content: center'<!-- align='center'-->>操作信息或结果</p></div>"),

            //一个选项都没有时,用这个元素占用
            $nothingnessOption: $("#nothingnessOption").show(),
            //拼接选项用的
            $optionInfo: $("#optionInfo"),
            $updateTopicInfo: $("#updateTopicInfo").show(),
        }
    //endregion

    /*region 左边菜单栏*/
    let thisUrlAddress = window.location.pathname;

    let allLeftAddressName = $(".left ul li").each(function () {
        let parentLi = $(this);
        let thisAddressHref = $(this).children("a").attr("href")

        if (thisUrlAddress === thisAddressHref) {
            $(this).addClass("layui-this");
            $(this).addClass("layui-nav-itemed");
        }
        $(this).children(".layui-nav-child").each(function () {

            let childrenAddressHref = $(this).find("dd a").attr("href");
            if (thisUrlAddress === childrenAddressHref) {
                $(this).children("dd").addClass("layui-this");
                parentLi.addClass("layui-nav-itemed");
            }
        })
    });

    $(".layui-icon-down").click(function () {
        let parentLi = $(this).parents(".layui-nav-item");
        if (parentLi.hasClass("layui-nav-itemed")) {
            parentLi.removeClass("layui-nav-itemed");
        } else {
            parentLi.addClass("layui-nav-itemed");
        }
        return false;
    })
    /*endregion*/

    //region 列表选项卡
    //触发事件
    let active = {
        tabAdd: function () {
            //新增一个Tab项
            element.tabAdd('demo', {
                title: '新选项' + (Math.random() * 1000 | 0) //用于演示
                , content: '内容' + (Math.random() * 1000 | 0)
                , id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
            })
        }
        , tabDelete: function (othis) {
            //删除指定Tab项
            element.tabDelete('demo', '44'); //删除：“商品管理”


            othis.addClass('layui-btn-disabled');
        }
        , tabChange: function () {
            //切换到指定Tab项
            element.tabChange('demo', '22'); //切换到：用户管理
        }
    };

    $('.site-demo-active').on('click', function () {
        let othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    //Hash地址的定位
    let layid = location.hash.replace(/^#test=/, '');
    element.tabChange('test', layid);

    element.on('tab(test)', function (elem) {
        location.hash = 'test=' + $(this).attr('lay-id');
    });
    //endregion

    //region 面包屑导航
    element.on('nav(demo)', function (elem) {
        layer.msg(elem.text());
    });
    //endregion

    //region 关于选项操作的弹出框与ajax
    //region 元素被点击时
    {
        //添加选项
        publicDOM.body.on("click", ".addOptionButton", function () {
            selfConfig.topicId = $(this).parents("[topicid]").attr("topicid");
            runLayuiOpen("addOption");
        })

        //删除选项 (x)
        publicDOM.body.on("click", ".layui-tab-title .layui-unselect", function () {
            let parentsLi = selfConfig.optionId = $(this).parents("li");
            selfConfig.optionId = parentsLi.attr("lay-id");
            selfConfig.optionSelf = parentsLi.children("span").text();
            selfConfig.topicId = $(this).parents("[topicid]").attr("topicid");
            runLayuiOpen_small("delOption", {
                contentHtml: "确定要删除<span style='padding: 10px;color: teal'>" + selfConfig.optionSelf + "</span>选项吗?",
                title: "删除选项",
            });
        })

        //修改选项
        publicDOM.body.on("click", ".updateOptionButton", function () {
            selfConfig.topicId = $(this).parents("[topicid]").attr("topicid");
            selfConfig.optionId = $(this).parents(".layui-colla-content").find(".layui-this").attr("lay-id");
            runAjax("queryOptionById", {
                optionId: selfConfig.optionId,
            })
        })

        //修改题目信息
        publicDOM.body.on("click", ".updateTopicInfoButton", function () {
            selfConfig.topicId = $(this).parents("[topicid]").attr("topicid");
            runAjax("queryTopicById", {
                topicId: selfConfig.topicId
            })
        })

        publicDOM.body.on("click", ".deleteTopicButton", function () {
            selfConfig.topicId = $(this).parents("[topicid]").attr("topicid");
            selfConfig.topicSelf = $(this).parents("[topicid]").find(".layui-colla-title").text();

            runLayuiOpen_small("delTopic", {
                title: "删除题目",
                contentHtml: "确定要删除<span style='padding: 10px;color: teal'>" + selfConfig.topicSelf.substring(0, selfConfig.topicSelf.length - 1) + "</span>吗?",
            });
        })
        //删除题目
    }
    //endregion

    //region 配置部分
    let publicConfig = {
        layui_layer: {
            type: 1,
            skin: "layui-layer-molv",
            end: function () {
                init();
            },
        },
        ajax: {}
    }
    let allConfig = {
        //增加选项
        addOption: {
            layui_layer: {
                content: publicDOM.$addOption,
                btn: ["确认添加", "关闭"],
                title: "添加新的选项",
                yes: function () {
                    runAjax("addOption",
                        {
                            topicId: selfConfig.topicId,
                            optionSelf: $("#optionSelf").val(),
                            optionComment: $("#optionComment").val(),
                            isCorrect: $("input[name='isCorrect']").is(":checked") ? '1' : '0',
                        })
                },
            },
            ajax: {
                type: "post",
                dataType: "json",
                url: "/option/add",
                success: function (data) {
                    runLayuiOpen_small("doOptionResult", {
                        contentHtml: "添加成功",
                        title: "添加结果 -- 添加成功",
                    });
                    addOptionAjaxAfter(data);
                },
                error: function () {
                    runLayuiOpen_small("doOptionResult", {
                        contentHtml: "添加失败",
                        title: "添加结果 -- 添加失败",
                    });
                }
            }
        },

        //删除选项
        delOption: {
            layui_layer: {
                btn: ["确认删除", "取消"],
                yes: function () {
                    runAjax("delOption", {
                        optionId: selfConfig.optionId
                    });
                },
            },
            ajax: {
                type: "post",
                dataType: "text",
                url: "/option/deleteById",
                success: function (data) {
                    if (data === "删除成功") {
                        element.tabDelete("optionInfo" + selfConfig.topicId, selfConfig.optionId);
                        chickOptionLength($("[topicid='" + selfConfig.topicId + "']"));
                    }
                    runLayuiOpen_small("doOptionResult", {
                        contentHtml: data,
                        title: "删除结果 -- " + data,
                    });
                }
            }
        },

        delTopic: {
            layui_layer: {
                btn: ["确认删除", "取消"],
                yes: function () {
                    runAjax("delTopic", {
                        topicId: selfConfig.topicId
                    });
                },
            },
            ajax: {
                type: "post",
                dataType: "text",
                url: "/topic/deleteById",
                success: function (data) {
                    if (data === "删除成功") {
                        $("[topicid='" + selfConfig.topicId + "']").remove();
                    }
                    runLayuiOpen_small("doOptionResult", {
                        contentHtml: data,
                        title: "删除结果 -- " + data,
                    })
                },
                error: function () {
                    runLayuiOpen_small("doOptionResult", {
                        contentHtml: "删除失败",
                        title: "删除结果 -- 删除失败",
                    })
                }
            }
        },

        //修改选项
        updateOption: {
            layui_layer: {
                title: "添加新的选项",
                content: publicDOM.$addOption,
                btn: ["确认修改", "关闭"],
                yes: function () {
                    runAjax("updateOption",
                        {
                            optionId: selfConfig.optionId,
                            topicId: selfConfig.topicId,
                            optionSelf: $("#optionSelf").val(),
                            optionComment: $("#optionComment").val(),
                            isCorrect: $("input[name='isCorrect']").is(":checked") ? '1' : '0',
                        })
                },
            },
            ajax: {
                type: "post",
                url: "/option/updateById",
                dataType: "json",
                success: function (data) {
                    runLayuiOpen_small("doOptionResult", {
                        contentHtml: "修改成功",
                        title: "修改结果 -- 修改成功"
                    });
                    data.topic = {topicId: selfConfig.topicId}
                    element.tabDelete("optionInfo" + selfConfig.topicId, selfConfig.optionId);

                    addOptionAjaxAfter(data);
                },
                error: function () {
                    runLayuiOpen_small("doOptionResult", {
                        contentHtml: "修改失败",
                        title: "修改结果 -- 修改失败"
                    })
                }
            }
        },

        queryOptionById: {
            ajax: {
                type: "get",
                url: "/option/queryById",
                success: function (data) {
                    //向弹出框内容中写数据
                    let updateDom = publicDOM.$addOption;
                    updateDom.find("[name='optionSelf']").val(data.optionSelf);
                    updateDom.find("[name='optionComment']").val(data.optionComment);

                    let button = updateDom.find("[name='isCorrect']");

                    if (data.isCorrect === 1) {
                        button.prop("checked", true);
                        updateDom.find(".layui-form-checkbox").addClass("layui-form-checked");
                    } else {
                        button.prop("checked", false);
                        updateDom.find(".layui-form-checkbox").removeClass("layui-form-checked");
                    }

                    //启动弹出框
                    runLayuiOpen("updateOption");
                },
                error: function () {

                }
            }
        },

        queryTopicById: {
            ajax: {
                type: "get",
                url: "/topic/queryById",
                success: function (data) {
                    let updateDom = publicDOM.$updateTopicInfo;
                    updateDom.find("[name='topicSelf']").val(data.topicSelf);
                    updateDom.find("[name='topicComment']").val(data.topicComment);
                    runLayuiOpen("updateTopicInfo")
                },
                error: function () {

                }
            }
        },

        updateTopicInfo: {
            layui_layer: {
                title: "修改题目信息",
                content: publicDOM.$updateTopicInfo,
                btn: ["确认修改", "关闭"],
                yes: function () {
                    runAjax("updateTopicInfo", {
                        topicId: selfConfig.topicId,
                        topicSelf: publicDOM.$updateTopicInfo.find("[name='topicSelf']").val(),
                        topicComment: publicDOM.$updateTopicInfo.find("[name='topicComment']").val(),
                    })
                }
            },
            ajax: {
                type: "post",
                url: "/topic/updateById",
                dataType: "json",
                success: function (data) {
                    let topicDOM = $("[topicid=" + selfConfig.topicId + "]");
                    topicDOM.find(".layui-colla-title").html("题目: " + data.topicSelf);
                    topicDOM.find("blockquote").html(data.topicComment);

                    runLayuiOpen_small("doOptionResult", {
                        title: "修改结果 -- 成功",
                        contentHtml: "修改成功",
                    });
                },
                error: function () {
                    runLayuiOpen_small("doOptionResult", {
                        contentHtml: "修改结果 -- 失败",
                        title: "结果失败",
                    })
                }
            }
        },

        //操作结果弹窗
        doOptionResult: {
            layui_layer: {
                closeBtn: false,
                btnAlign: 'c',
                btn: ["关闭"],
                area: "300px"
            },
        },
    }
    //endregion

    //region 运行部分

    //执行ajax
    function runAjax(ajaxAddress, data) {
        $.ajax({
            type: allConfig[ajaxAddress].ajax.type,
            url: allConfig[ajaxAddress].ajax.url,
            data: data,
            success: allConfig[ajaxAddress].ajax.success,
            error: allConfig[ajaxAddress].ajax.error,
        });
    }

    //region 执行弹出框
    //针对简短的弹出框
    function runLayuiOpen_small(openConfigAddress, contentAndTitleConfig) {
        publicDOM.$doOptionDiv.find("p").html(contentAndTitleConfig.contentHtml);

        layer.open({
            type: publicConfig.layui_layer.type,
            title: contentAndTitleConfig.title,
            skin: publicConfig.layui_layer.skin,
            content: publicDOM.$doOptionDiv.html(),
            end: publicConfig.layui_layer.end,
            btn: allConfig[openConfigAddress].layui_layer.btn,
            yes: allConfig[openConfigAddress].layui_layer.yes,
            btnAlign: allConfig[openConfigAddress].layui_layer.btnAlign,
        });
    }

    function runLayuiOpen(openConfigAddress) {
        layer.open({
            type: publicConfig.layui_layer.type,
            skin: publicConfig.layui_layer.skin,
            end: publicConfig.layui_layer.end,

            content: allConfig[openConfigAddress].layui_layer.content,
            title: allConfig[openConfigAddress].layui_layer.title,

            btn: allConfig[openConfigAddress].layui_layer.btn,
            yes: allConfig[openConfigAddress].layui_layer.yes,
        });
    }

    //endregion

    //执行完一系列操作之后的初始化
    function init() {
        selfConfig = {};

        let addOption = publicDOM.$addOption;
        addOption.hide();
        addOption.find("[name]").val("").prop("checked", false);
        addOption.find(".layui-form-checkbox").removeClass("layui-form-checked");

        let updateTopic = publicDOM.$updateTopicInfo;
        updateTopic.hide();
        updateTopic.find("[name]").val("").prop("checked", false);

        layer.closeAll();
    }

    //endregion

    //region 页面初始化时
    {
        //region 初始化时,如果发现某个题目中没有任何选项,则嵌入没有选项的提示
        $(".layui-colla-item").each(function () {
            chickOptionLength($(this));
        })
        //region 初始化时隐藏不必要的元素
        {
            publicDOM.$addOption.hide();
            publicDOM.$nothingnessOption.hide();
            publicDOM.$optionInfo.hide();
            publicDOM.$updateTopicInfo.hide();
        }
    }
    //endregion

    //region 其它杂项函数
    //region ajax执行之后(如果方法体过长,需要写在这里)
    //添加选项成功之后
    function addOptionAjaxAfter(newOption) {
        //删除空占位
        element.tabDelete("optionInfo" + newOption.topic.topicId, "is-empty");

        //准备好需要向谁append()
        let thisTopic = $("[topicid='" + newOption.topic.topicId + "']");
        let thisTopicUl = thisTopic.find("ul");
        let thisTopicContent = thisTopic.find(".layui-tab-content");

        //相当于复制
        let optionInfoLi = $(publicDOM.$optionInfo.find("ul").html());
        let optionInfoItem = $(publicDOM.$optionInfo.find(".layui-tab-content").html());

        //选项是否正确按钮需要的信息
        let button = {
            html: 1 === newOption.isCorrect ? "正确" : "错误",
            color_class: 1 === newOption.isCorrect ? "blue" : "red"
        }
        optionInfoLi.attr("lay-id", newOption.optionId)
        optionInfoLi.find("span").html(newOption.optionSelf);
        optionInfoItem.find("button").html("选项" + button.html).addClass("layui-border-" + button.color_class);
        optionInfoItem.find(".layui-card-body").html(newOption.optionComment);

        thisTopicUl.append(optionInfoLi);
        thisTopicContent.append(optionInfoItem);
        thisTopic.find(".updateOptionButton").show();
        optionInfoLi.click();
    }

    //endregion

    //检查选项长度(如果一个选项都没有时,嵌入提示,并且删除<<修改当前选项>>按钮)
    function chickOptionLength(topicDom) {
        if (topicDom.find("ul li").length === 0) {
            topicDom.find(".layui-tab").html(publicDOM.$nothingnessOption.html());
            topicDom.find(".updateOptionButton").hide();
        }
    }

    //endregion
    //endregion
});
