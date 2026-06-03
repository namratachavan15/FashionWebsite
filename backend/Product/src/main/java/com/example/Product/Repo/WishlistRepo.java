package com.example.Product.Repo;



import com.example.Product.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface WishlistRepo extends JpaRepository<Wishlist, Integer> {

    List<Wishlist> findByUserId(Integer userId);

    Optional<Wishlist> findByUserIdAndProduct_Id(
            Integer userId,
            Integer productId
    );
    @Modifying
    void deleteByUserIdAndProduct_Id(
            Integer userId,
            Integer productId
    );
}
