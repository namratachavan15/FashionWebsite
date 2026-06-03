package com.example.Product.Controller;

import com.example.Product.Service.CartService;
import com.example.Product.entity.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{email}")
    public List<CartItem> getCart(@PathVariable String email) {
        return cartService.getCartItems(email);
    }

    @PostMapping("/{productId}/{email}")
    public CartItem addToCart(
            @PathVariable Integer productId,
            @PathVariable String email,
            @RequestBody CartItem item
    ) {
        return cartService.addToCart(productId, item, email);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        cartService.removeItem(id);


    }

    @PutMapping("/update/{id}")
    public CartItem updateQuantity(
            @PathVariable int id,
            @RequestBody CartItem item
    ) {
        return cartService.updateQuantity(
                id,
                item.getQuantity()
        );
    }
}