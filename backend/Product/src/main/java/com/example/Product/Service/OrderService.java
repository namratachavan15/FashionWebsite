package com.example.Product.Service;

import com.example.Product.Repo.*;
import com.example.Product.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private orderRepo orderRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private cartRepo cartRepo;

    @Transactional
    public Order placeOrder(OrderRequest request) {

        User user = userRepo.findByEmail(request.getEmail());

        if (user == null) {
            throw new RuntimeException(
                    "User not found for email: " + request.getEmail()
            );
        }

        Order order = new Order();

        // USER
        order.setUser(user);

        // PAYMENT INFO
        order.setPaymentId(request.getPaymentId());
        order.setRazorpayOrderId(request.getRazorpayOrderId());
        order.setPaymentStatus(request.getPaymentStatus());

        // CHECKOUT INFO
        order.setCheckoutDetails(request.getCheckoutDetails());

        // ✅ SAVE TOTALS
        order.setSubtotal(request.getSubtotal());
        order.setShippingCharge(request.getShippingCharge());
        order.setTax(request.getTax());
        order.setTotalAmount(request.getTotalAmount());

        // ORDER ITEMS LOOP
        for (OrderItemDTO item : request.getItems()) {

            Product product = productRepo.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // STOCK CHECK
            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException(
                        "Not enough stock for product: " + product.getName()
                );
            }

            // REDUCE STOCK
            product.setStock(product.getStock() - item.getQuantity());
            productRepo.save(product);

            // CREATE ORDER ITEM
            OrderItem newItem = new OrderItem();
            newItem.setProduct(product);
            newItem.setQuantity(item.getQuantity());
            newItem.setSize(item.getSize());
            newItem.setColor(item.getColor());
            newItem.setOrder(order);

            order.getItems().add(newItem);
        }

        // SAVE ORDER
        Order savedOrder = orderRepo.save(order);

        // CLEAR CART
        cartRepo.deleteByUserEmail(request.getEmail());

        return savedOrder;
    }
    public List<Order> getUserOrders(Integer userId) {
        return orderRepo.findByUserId(userId);
    }
}