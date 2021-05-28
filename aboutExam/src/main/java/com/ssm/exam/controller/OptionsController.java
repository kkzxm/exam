package com.ssm.exam.controller;

import com.lingDream.service.MyService;
import com.ssm.exam.entity.Options;
import com.ssm.exam.entity.Topic;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-18 15:37
 */

@RestController
@RequestMapping("/option")
public class OptionsController {
    private final MyService<Options> optionsMyService;

    public OptionsController(MyService<Options> optionsMyService) {
        this.optionsMyService = optionsMyService;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Options add(Options entity, Topic topic) {
        entity.setTopic(topic);
        if (optionsMyService.insert(entity)) return entity;
        return null;
    }

    @RequestMapping(value = "/deleteById", method = RequestMethod.POST)
    public String deleteById(Options entity) {
        return "删除" + (optionsMyService.removeById(entity.getOptionId()) ? "成功" : "失败");
    }

    @RequestMapping("/queryById")
    public Options queryById(Options options) {
        return optionsMyService.selectById(options.getOptionId());
    }

    @RequestMapping("/updateById")
    public Options updateById(Options options) {
        if (optionsMyService.updateById(options)) return options;
        return null;
    }

}
