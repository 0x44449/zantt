package zina.zantt.nabi.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import zina.zantt.nabi.Entities.ProjectEntity;

public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {
}
