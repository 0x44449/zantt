package com.zantt.repositories;

import com.zantt.entities.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, String> {
    List<TaskEntity> findByProjectId(String projectId);
}
