package com.ssm.exam.controller;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.lingDream.controller.ControllerImpl;
import com.lingDream.service.BaseService;
import com.lingDream.tool.MyPage;
import com.ssm.exam.entity.Options;
import com.ssm.exam.entity.Topic;
import com.ssm.exam.entity.choiceQuestion.SingleChoiceQuestion;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-12 18:22
 */
@Controller
@RequestMapping("/singleChoiceQuestion")
public class SingleChoiceQuestionController extends ControllerImpl<SingleChoiceQuestion> {
    public SingleChoiceQuestionController(BaseService<SingleChoiceQuestion> service) {
        super(service, "单选题");
    }

    @Override
    protected MyPage<SingleChoiceQuestion> getPage(Integer thisPage, Integer pageSize, Wrapper<SingleChoiceQuestion> wrapper) {
        return service.selectMyPage(new MyPage<>(thisPage, pageSize));
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String add(HttpServletRequest request, SingleChoiceQuestion entity, Model model,
                      Topic topic,@RequestParam(defaultValue = "0") Integer isCorrect,
                      String[] optionSelf, String[] optionComment) {

        entity.setTopic(topic);

        for (int i = 0; i < optionSelf.length; i++) {
            Options options = new Options();
            options.setOptionSelf(optionSelf[i]);
            options.setOptionComment(optionComment[i]);
            if (i == isCorrect - 1) options.setIsCorrect(1);
            entity.addOption(options);
        }
        System.out.println(entity.getOptionsList());
        return super.add(request, entity, model);
    }
}
