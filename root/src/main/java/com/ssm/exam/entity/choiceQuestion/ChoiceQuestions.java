package com.ssm.exam.entity.choiceQuestion;

import com.ssm.exam.entity.Options;
import com.ssm.exam.entity.Topic;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

/**
 * 选择题
 * (虚拟)
 *
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-12 17:49
 */
@Data
@Accessors(chain = true)
public abstract class ChoiceQuestions {
    private Topic topic;//单选题题题目
    private final List<Options> optionsList = new ArrayList<>();//单选题选项


    /**
     * 得到当前选择题的类型
     */
    public abstract Integer getChoiceQuestionsType();

    /**
     * 添加选项
     *
     * @param options 需要添加的选项
     * @return 是否添加成功
     */
    public boolean addOption(Options options) {
        return optionsList.add(options);
    }

    /**
     * 删除选项
     *
     * @param options 需要删除的选项
     * @return 是否删除成功
     */
    public boolean removeOption(Options options) {
        return optionsList.remove(options);
    }
}
