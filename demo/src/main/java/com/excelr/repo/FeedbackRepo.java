package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.entity.Feedback;
@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {

}
