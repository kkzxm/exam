package com.ssm.exam.controller;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.lingDream.controller.ControllerImpl;
import com.lingDream.service.BaseService;
import com.lingDream.tool.MyPage;
import com.ssm.exam.entity.choiceQuestion.MultipleChoiceQuestions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-12 18:22
 */
@Controller
@RequestMapping("/multipleChoiceQuestions")
public class MultipleChoiceQuestionsController extends ControllerImpl<MultipleChoiceQuestions> {
    public MultipleChoiceQuestionsController(BaseService<MultipleChoiceQuestions> service) {
        super(service, "多选题");
    }

    @Override
    protected MyPage<MultipleChoiceQuestions> getPage(Integer thisPage, Integer pageSize, Wrapper<MultipleChoiceQuestions> wrapper) {
        return service.selectMyPage(new MyPage<>(thisPage,pageSize));
    }
}
