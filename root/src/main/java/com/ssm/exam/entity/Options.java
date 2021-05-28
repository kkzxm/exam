package com.ssm.exam.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * 选项
 *
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-10 16:19
 */

@Data
@Accessors(chain = true)
public class Options {
    @TableId(type = IdType.ASSIGN_UUID)
    private String optionId;
    private String optionSelf;
    private Integer isCorrect = 0;
    private Topic topic;
    private String optionComment;

    public Options setIsCorrect(Integer isCorrect) {
        this.isCorrect = isCorrect;
        return this;
    }

    public Options setIsCorrect(Boolean isCorrect) {
        if (isCorrect) setIsCorrect(1);
        else this.setIsCorrect(0);
        return this;
    }
}
