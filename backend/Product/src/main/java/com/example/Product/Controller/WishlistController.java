package com.example.Product.Controller;



import com.example.Product.Service.WishlistService;
import com.example.Product.entity.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin("*")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add")
    public Wishlist addWishlist(
            @RequestParam Integer userId,
            @RequestParam Integer productId
    ) {
        return wishlistService
                .addToWishlist(userId, productId);
    }

    @GetMapping("/{userId}")
    public List<Wishlist> getWishlist(
            @PathVariable Integer userId
    ) {
        return wishlistService.getWishlist(userId);
    }

    @DeleteMapping("/remove")
    public void removeWishlist(
            @RequestParam Integer userId,
            @RequestParam Integer productId
    ) {
        wishlistService.removeFromWishlist(
                userId,
                productId
        );
    }
}