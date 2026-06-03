package com.example.Product.Controller;

import com.example.Product.Service.ColorService;
import com.example.Product.entity.color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/color")
public class ColorController {
    @Autowired
    private ColorService colorService;

    @GetMapping
    public ResponseEntity<List<color>> getAllSize()
    {
        return ResponseEntity.ok(colorService.getAllColor());
    }
}
