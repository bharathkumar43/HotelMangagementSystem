package com.excelr.service;

import com.excelr.entity.Category;
import com.excelr.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // Get a category by its ID
    public Optional<Category> getCategoryById(Integer id) {
        return categoryRepo.findById(id);
    }

    // Create or update a category
    public Category saveCategory(Category category) {
        return categoryRepo.save(category);
    }

    // Delete a category
    public void deleteCategory(Integer id) {
        categoryRepo.deleteById(id);
    }
}
