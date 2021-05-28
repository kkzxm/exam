package com.ssm.exam.entity.choiceQuestion;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 多选题
 * (虚拟)
 *
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-12 17:41
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Accessors(chain = true)
@TableName(resultMap = "multipleChoiceQuestions")
public class MultipleChoiceQuestions extends ChoiceQuestions {

    /**
     * 2是多选题
     */
    @Override
    public Integer getChoiceQuestionsType() {
        return 2;
    }
}
