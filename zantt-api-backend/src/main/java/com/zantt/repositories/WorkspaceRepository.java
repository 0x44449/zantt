package com.zantt.repositories;

import com.zantt.entities.WorkspaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkspaceRepository extends JpaRepository<WorkspaceEntity, String> {
    Optional<WorkspaceEntity> findOptionalByTaskId(String taskId);
}
