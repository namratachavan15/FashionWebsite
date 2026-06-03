package com.example.Product.Service;



import com.example.Product.Repo.ProductRepo;
import com.example.Product.Repo.WishlistRepo;
import com.example.Product.entity.Product;
import com.example.Product.entity.Wishlist;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepo wishlistRepo;

    @Autowired
    private ProductRepo productRepo;

    // ADD
    public Wishlist addToWishlist(Integer userId, Integer productId) {

        if (wishlistRepo
                .findByUserIdAndProduct_Id(userId, productId)
                .isPresent()) {

            return null;
        }

        Product product =
                productRepo.findById(productId).orElse(null);

        Wishlist wishlist =
                new Wishlist(userId, product);

        return wishlistRepo.save(wishlist);
    }

    // GET USER WISHLIST
    public List<Wishlist> getWishlist(Integer userId) {
        return wishlistRepo.findByUserId(userId);
    }

    @Transactional
    public void removeFromWishlist(
            Integer userId,
            Integer productId
    ) {
        wishlistRepo.deleteByUserIdAndProduct_Id(
                userId,
                productId
        );
    }
}