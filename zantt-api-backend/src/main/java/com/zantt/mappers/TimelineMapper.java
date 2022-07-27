package com.zantt.mappers;

import com.zantt.entities.TimelineEntity;
import com.zantt.models.TimelineViewModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TimelineMapper {
    TimelineMapper Instance = Mappers.getMapper(TimelineMapper.class);

    TimelineViewModel toViewModel(TimelineEntity entity);
    List<TimelineViewModel> toViewModels(List<TimelineEntity> entities);
}
