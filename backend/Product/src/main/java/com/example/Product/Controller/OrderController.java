package com.example.Product.Controller;

import com.example.Product.Service.OrderService;
import com.example.Product.entity.Order;
import com.example.Product.entity.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request) {
        return orderService.placeOrder(request);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(
            @PathVariable Integer userId
    ) {
        return orderService.getUserOrders(userId);
    }

}
