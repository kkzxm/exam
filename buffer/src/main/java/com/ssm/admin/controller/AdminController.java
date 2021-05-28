package com.ssm.admin.controller;

import com.lingDream.config.LingDreamProperties;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-12 17:27
 */
@Controller
public class AdminController {
    protected final LingDreamProperties lingDreamProperties;

    public AdminController(LingDreamProperties lingDreamProperties) {
        this.lingDreamProperties = lingDreamProperties;
    }

    @RequestMapping({"/index"})
    public String toIndexPage(Model model) {
        model.addAttribute("partAddress","main");
        model.addAttribute("title","首页");
        return lingDreamProperties.getController().getListPage();
    }
}
