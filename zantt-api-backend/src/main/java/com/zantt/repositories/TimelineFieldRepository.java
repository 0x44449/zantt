package com.zantt.repositories;

import com.zantt.entities.TimelineFieldEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimelineFieldRepository extends JpaRepository<TimelineFieldEntity, String> {
}
