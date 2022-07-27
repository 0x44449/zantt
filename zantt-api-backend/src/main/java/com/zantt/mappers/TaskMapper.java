package com.zantt.mappers;

import com.zantt.entities.TaskEntity;
import com.zantt.models.TaskViewModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TaskMapper {
    TaskMapper Instance = Mappers.getMapper(TaskMapper.class);

    TaskViewModel toViewModel(TaskEntity entity);
    List<TaskViewModel> toViewModels(List<TaskEntity> entities);
}
