package com.zantt.mappers;

import com.zantt.entities.TimelineFieldEntity;
import com.zantt.models.TimelineFieldViewModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TimelineFieldMapper {
    TimelineFieldMapper Instance = Mappers.getMapper(TimelineFieldMapper.class);

    TimelineFieldViewModel toViewModel(TimelineFieldEntity entity);
    List<TimelineFieldViewModel> toViewModel(List<TimelineFieldEntity> entities);
}
