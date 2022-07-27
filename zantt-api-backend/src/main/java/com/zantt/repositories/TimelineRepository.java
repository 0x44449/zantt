package com.zantt.repositories;

import com.zantt.entities.TimelineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimelineRepository extends JpaRepository<TimelineEntity, String> {
}
