package com.excelr.service;

import com.excelr.entity.Feedback;
import com.excelr.repo.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;

    // Get all feedbacks
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    // Get feedback by its ID
    public Optional<Feedback> getFeedbackById(Integer id) {
        return feedbackRepo.findById(id);
    }

    // Create or update feedback
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    // Delete feedback
    public void deleteFeedback(Integer id) {
        feedbackRepo.deleteById(id);
    }
}
