package com.zantt.mappers;

import com.zantt.entities.ProjectEntity;
import com.zantt.models.ProjectViewModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ProjectMapper {
    ProjectMapper Instance = Mappers.getMapper(ProjectMapper.class);

    ProjectViewModel toViewModel(ProjectEntity entity);
    List<ProjectViewModel> toViewModels(List<ProjectEntity> entities);
}
