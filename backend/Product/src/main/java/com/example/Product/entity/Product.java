package com.example.Product.entity;

import jakarta.persistence.*;

import java.awt.*;
import java.util.List;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private double price;
    private String subtitle;
    private String image;
    private String description;
    @ElementCollection
    private List<String> details;
    private String category;
    private int stock;

    private String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @ElementCollection
    private List<String> careInstructions;

    public List<String> getCareInstructions() {
        return careInstructions;
    }

    public void setCareInstructions(List<String> careInstructions) {
        this.careInstructions = careInstructions;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Product() {
    }

    public Product(Integer id, String name, double price, String subtitle, String image, String description, List<String> details) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.subtitle = subtitle;
        this.image = image;
        this.description = description;
        this.details = details;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }
}