package com.ssm.exam.service;

import com.lingDream.mapper.MyMapper;
import com.lingDream.service.MyService;
import com.ssm.exam.entity.Options;
import org.springframework.stereotype.Service;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-18 15:38
 */
@Service
public class OptionsService extends MyService<Options> {
    public OptionsService(MyMapper<Options> baseMapper) {
        super(baseMapper);
    }

    @Override
    public boolean insert(Options entity) {
        return super.insert(entity);
//        return false;
    }
}
