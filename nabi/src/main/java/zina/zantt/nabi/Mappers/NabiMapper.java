package zina.zantt.nabi.Mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import zina.zantt.nabi.Entities.CommentEntity;
import zina.zantt.nabi.Entities.ProjectEntity;
import zina.zantt.nabi.Entities.TaskEntity;
import zina.zantt.nabi.Models.Comment;
import zina.zantt.nabi.Models.Project;
import zina.zantt.nabi.Models.Task;

import java.util.List;

@Mapper
public interface NabiMapper {
    NabiMapper INSTANCE = Mappers.getMapper(NabiMapper.class);

    Project toProjectDto(ProjectEntity projectEntity);
    List<Project> toProjectDto(List<ProjectEntity> projectEntities);

    Task toTaskDto(TaskEntity taskEntity);
    List<Task> toTaskDto(List<TaskEntity> taskEntities);

    Comment toCommentDto(CommentEntity commentEntity);
    List<Comment> toCommentDto(List<CommentEntity> commentEntities);
}
