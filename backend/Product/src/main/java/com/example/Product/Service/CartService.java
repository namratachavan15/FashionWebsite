package com.example.Product.Service;


import com.example.Product.Repo.ProductRepo;
import com.example.Product.Repo.UserRepo;
import com.example.Product.Repo.cartRepo;
import com.example.Product.entity.CartItem;
import com.example.Product.entity.Product;
import com.example.Product.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private cartRepo cartRepo;

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private UserRepo userRepo;

    public List<CartItem> getCartItems(String email) {
        return cartRepo.findByUserEmail(email);
    }

    // ✅ FIXED ADD TO CART
    public CartItem addToCart(
            Integer productId,
            CartItem item,
            String email
    ) {

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"
                                ));

        User user =
                userRepo.findByEmail(email);

        // ✅ CHECK EXISTING ITEM
        CartItem existingItem =
                cartRepo
                        .findByUserEmailAndProductIdAndSizeAndColor(

                                email,

                                productId,

                                item.getSize(),

                                item.getColor()

                        )
                        .orElse(null);

        // ✅ IF EXISTS -> INCREASE QUANTITY
        if (existingItem != null) {

            existingItem.setQuantity(

                    existingItem.getQuantity()
                            + item.getQuantity()

            );

            return cartRepo.save(
                    existingItem
            );

        }

        // ✅ NEW ITEM
        item.setProduct(product);

        item.setUser(user);

        return cartRepo.save(item);

    }
    public void removeItem(int id) {
        cartRepo.deleteById(id);
    }

    public CartItem updateQuantity(
            int id,
            int quantity
    ) {

        CartItem item =
                cartRepo.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Item not found"));

        item.setQuantity(quantity);

        return cartRepo.save(item);

    }
}