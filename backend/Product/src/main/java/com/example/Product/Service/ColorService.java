package com.example.Product.Service;

import com.example.Product.Repo.ColorRepo;
import com.example.Product.entity.color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorService {
    @Autowired
    private ColorRepo colorRepo;

    public List<color> getAllColor() {
        return colorRepo.findAll();
    }
}
