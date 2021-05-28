package com.ssm.exam.service;

import com.lingDream.mapper.MyMapper;
import com.lingDream.service.MyService;
import com.ssm.exam.entity.choiceQuestion.MultipleChoiceQuestions;
import org.springframework.stereotype.Service;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-12 18:19
 */
@Service
public class MultipleChoiceQuestionsService extends MyService<MultipleChoiceQuestions> {
    public MultipleChoiceQuestionsService(MyMapper<MultipleChoiceQuestions> baseMapper) {
        super(baseMapper);
    }
}
