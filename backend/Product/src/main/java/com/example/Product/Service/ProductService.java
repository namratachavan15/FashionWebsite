package com.example.Product.Service;

import com.example.Product.Repo.ProductRepo;
import com.example.Product.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProducts(){
        return productRepo.findAll();
    }

    public Product getProductById(int id){
        return productRepo.findById(id).orElse(null);
    }

    public List<Product> addProducts(List<Product> products) {
        return productRepo.saveAll(products);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    // ✅ SEARCH
    public List<Product> searchProducts(String keyword) {
        return productRepo
                .findByNameContainingIgnoreCase(keyword);
    }

    // ✅ unique categories
    public List<Map<String, String>> getAllCategories() {

        List<Product> products = productRepo.findAll();

        return products.stream()
                .collect(Collectors.groupingBy(Product::getCategory))
                .entrySet()
                .stream()
                .map(entry -> {

                    Map<String, String> map =
                            new HashMap<>();

                    map.put("name", entry.getKey());

                    map.put(
                            "image",
                            entry.getValue().get(0).getImage()
                    );

                    return map;
                })
                .collect(Collectors.toList());
    }
}