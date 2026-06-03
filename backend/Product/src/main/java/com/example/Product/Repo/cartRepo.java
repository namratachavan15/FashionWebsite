package com.example.Product.Repo;

import com.example.Product.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface cartRepo extends JpaRepository<CartItem,Integer> {
    List<CartItem> findByUserEmail(String email);
    void deleteByUserEmail(String email);

    Optional<CartItem>
    findByUserEmailAndProductIdAndSizeAndColor(

            String email,

            Integer productId,

            String size,

            String color
    );

}
