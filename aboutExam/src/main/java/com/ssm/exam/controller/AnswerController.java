package com.ssm.exam.controller;

import com.lingDream.controller.ControllerImpl;
import com.lingDream.service.BaseService;
import com.ssm.exam.entity.Answer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-13 13:54
 */
@Controller
@RequestMapping("/answer")
public class AnswerController extends ControllerImpl<Answer> {
 public AnswerController(BaseService<Answer> service) {
  super(service, "填空题");
 }
}
