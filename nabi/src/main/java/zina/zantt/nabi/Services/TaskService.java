package zina.zantt.nabi.Services;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import zina.zantt.nabi.Entities.TaskEntity;
import zina.zantt.nabi.Mappers.NabiMapper;
import zina.zantt.nabi.Models.Task;
import zina.zantt.nabi.Repositories.TaskRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getTasks(String projectId) {
        var tasks = taskRepository.findAllByProjectId(
                projectId,
                Sort.by(Sort.Direction.DESC, "order").descending().and(
                        Sort.by(Sort.Direction.DESC, "createdDateTime").descending()
                )
        );
        return NabiMapper.INSTANCE.toTaskDto(tasks);
    }

    public Task getTaskById(String projectId, String taskId) {
        var task = taskRepository.findByProjectIdAndTaskId(projectId, taskId).orElse(null);
        return NabiMapper.INSTANCE.toTaskDto(task);
    }

    public Task addTask(String projectId, String name, String description) {
        var task = new TaskEntity();
        task.setProjectId(projectId);
        task.setName(name);
        task.setDescription(description);
        task.setCreatedDateTime(LocalDateTime.now());

        var addedTask = taskRepository.save(task);
        return NabiMapper.INSTANCE.toTaskDto(addedTask);
    }

    public void removeTaskById(String projectId, String taskId) {
        taskRepository.findByProjectIdAndTaskId(projectId, taskId).ifPresent(taskRepository::delete);
    }
}
