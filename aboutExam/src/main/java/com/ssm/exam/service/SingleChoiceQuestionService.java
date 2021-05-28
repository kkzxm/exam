package com.ssm.exam.service;


import com.lingDream.mapper.MyMapper;
import com.lingDream.service.MyService;
import com.ssm.exam.entity.Options;
import com.ssm.exam.entity.Topic;
import com.ssm.exam.entity.choiceQuestion.SingleChoiceQuestion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: 酷酷宅小明
 * @CreateTime: 2021-05-12 18:19
 */
@Service
public class SingleChoiceQuestionService extends MyService<SingleChoiceQuestion> {
    final MyMapper<Topic> topicMapper;
    final MyMapper<Options> optionsMyMapper;

    public SingleChoiceQuestionService(MyMapper<SingleChoiceQuestion> baseMapper,
                                       MyMapper<Topic> topicMapper,
                                       MyMapper<Options> optionsMyMapper) {
        super(baseMapper);
        this.topicMapper = topicMapper;
        this.optionsMyMapper = optionsMyMapper;
    }

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public boolean insert(SingleChoiceQuestion entity) {
        //得到标题相关信息
        final Topic topic = entity.getTopic();
        final String topicSelf = topic.getTopicSelf();
        topic.setTopicType(entity.getChoiceQuestionsType());
        //得到所有选项
        final List<Options> optionsList = entity.getOptionsList();
        /*排除一些恶意情况,标题不能为空,*/
        if (topicSelf == null || "".equals(topicSelf)) return false;
        final boolean insertTopic = topicMapper.insert(topic) > 0;
        if (insertTopic) {
            //添加成功的题目
            final Topic newTopic = topicMapper.selectByOnly(topic);
            for (Options options : optionsList) options.setTopic(newTopic);
            return optionsMyMapper.insertList(optionsList) == optionsList.size();
        }
        return false;
    }
}
