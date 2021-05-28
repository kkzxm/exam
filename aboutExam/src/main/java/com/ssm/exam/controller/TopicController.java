package com.ssm.exam.controller;

import com.lingDream.service.BaseService;
import com.ssm.exam.entity.Topic;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-13 14:37
 */
@RestController
@RequestMapping("/topic")
public class TopicController {
    private final BaseService<Topic> service;

    public TopicController(BaseService<Topic> service) {
        this.service = service;
    }

    @RequestMapping("/queryById")
    public Topic queryById(Topic entity) {
        return service.selectById(entity.getTopicId());
    }

    @RequestMapping("/updateById")
    public Topic updateById(Topic entity) {
        return service.updateById(entity) ? entity : null;
    }

    @RequestMapping("/deleteById")
    public String deleteById(Topic entity) {
        return "删除" + (service.removeById(entity.getTopicId()) ? "成功" : "失败");
    }
}
