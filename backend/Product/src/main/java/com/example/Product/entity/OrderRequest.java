package com.example.Product.entity;

import java.util.List;

public class OrderRequest {

    private List<OrderItemDTO> items;
    private String email;
    private String paymentId;
    private String razorpayOrderId;
    private String paymentStatus;
    private Double subtotal;
    private Double shippingCharge;
    private Double tax;
    private Double totalAmount;

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getShippingCharge() {
        return shippingCharge;
    }

    public void setShippingCharge(Double shippingCharge) {
        this.shippingCharge = shippingCharge;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }

    public void setRazorpayOrderId(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    private CheckoutDetails checkoutDetails;

    public CheckoutDetails getCheckoutDetails() {
        return checkoutDetails;
    }

    public void setCheckoutDetails(
            CheckoutDetails checkoutDetails
    ) {
        this.checkoutDetails = checkoutDetails;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }



    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}
