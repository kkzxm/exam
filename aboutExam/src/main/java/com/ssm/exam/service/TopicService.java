package com.ssm.exam.service;

import com.lingDream.mapper.MyMapper;
import com.lingDream.service.MyService;
import com.ssm.exam.entity.Topic;
import org.springframework.stereotype.Service;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-13 14:36
 */
@Service
public class TopicService extends MyService<Topic> {
    public TopicService(MyMapper<Topic> baseMapper) {
        super(baseMapper);
    }

}
