package com.ssm.exam.entity.choiceQuestion;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;


/**
 * 单选题
 * (虚拟)
 *
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-12 17:47
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName(resultMap = "singleChoiceQuestion")
public class SingleChoiceQuestion extends ChoiceQuestions {

    /**
     * 1是单选题
     */
    @Override
    public Integer getChoiceQuestionsType() {
        return 1;
    }
}
