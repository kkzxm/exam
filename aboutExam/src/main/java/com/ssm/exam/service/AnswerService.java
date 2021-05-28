package com.ssm.exam.service;

import com.lingDream.mapper.MyMapper;
import com.lingDream.service.MyService;
import com.ssm.exam.entity.Answer;
import org.springframework.stereotype.Service;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-13 13:56
 */
@Service
public class AnswerService extends MyService<Answer> {
    public AnswerService(MyMapper<Answer> baseMapper) {
        super(baseMapper);
    }
}
