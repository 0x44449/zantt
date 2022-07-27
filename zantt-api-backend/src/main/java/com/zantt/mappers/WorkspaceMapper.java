package com.zantt.mappers;

import com.zantt.entities.WorkspaceEntity;
import com.zantt.models.WorkspaceViewModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface WorkspaceMapper {
    WorkspaceMapper Instance = Mappers.getMapper(WorkspaceMapper.class);

    WorkspaceViewModel toViewModel(WorkspaceEntity entity);
    List<WorkspaceViewModel> toViewModels(List<WorkspaceEntity> entities);
}
