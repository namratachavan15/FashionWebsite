package com.example.Product.Repo;

import com.example.Product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(String category);
    // ✅ SEARCH
    List<Product>
    findByNameContainingIgnoreCase(String keyword);
}
