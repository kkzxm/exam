package com.ssm.exam.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * 填空题答案
 *
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-10 16:19
 */

@Data
@Accessors(chain = true)
@TableName(value = "answer_info",resultMap = "answer")
public class Answer {
    private Integer answerId;
    private String answerSelf;
    private String answerComment;
    private Topic topic;
}
