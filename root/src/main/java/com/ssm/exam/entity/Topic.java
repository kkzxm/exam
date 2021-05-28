package com.ssm.exam.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * 题目
 *
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-10 16:19
 */

@Data
@Accessors(chain = true)
public class Topic {
    @TableId(type = IdType.AUTO)
    private Integer topicId;
    private String topicSelf;
    private Integer topicType;
    private String topicComment;
}
