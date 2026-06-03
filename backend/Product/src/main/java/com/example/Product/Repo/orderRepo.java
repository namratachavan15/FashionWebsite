package com.example.Product.Repo;

import com.example.Product.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface orderRepo extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(Integer userId);
}
