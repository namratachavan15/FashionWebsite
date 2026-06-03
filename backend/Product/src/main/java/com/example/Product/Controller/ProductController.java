package com.example.Product.Controller;

import com.example.Product.Service.ProductService;
import com.example.Product.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAll() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable int id) {
        return productService.getProductById(id);
    }

    @PostMapping("/add")
    public List<Product> addProduct(@RequestBody List<Product>  product) {
        return productService.addProducts(product);
    }

    // ✅ products by category
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(
            @PathVariable String category
    ) {
        return productService.getProductsByCategory(category);
    }

    // ✅ all categories
    @GetMapping("/categories")
    public List<Map<String, String>> getCategories() {
        return productService.getAllCategories();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam String keyword
    ) {
        return productService.searchProducts(keyword);
    }


}
