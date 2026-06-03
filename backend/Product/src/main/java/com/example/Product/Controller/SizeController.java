package com.example.Product.Controller;

import com.example.Product.Service.SizeService;
import com.example.Product.entity.size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/size")
public class SizeController {
    @Autowired
    private SizeService sizeService;

    @GetMapping
    public ResponseEntity <List<size>>  getAllSize()
    {
        return ResponseEntity.ok(sizeService.findAll());
    }


}
