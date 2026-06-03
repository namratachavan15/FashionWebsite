package com.example.Product.Repo;

import com.example.Product.entity.color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepo extends JpaRepository<color,Integer> {
}
