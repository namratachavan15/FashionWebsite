package com.example.Product.Repo;

import com.example.Product.entity.size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeRepo  extends JpaRepository<size,Integer> {
}
