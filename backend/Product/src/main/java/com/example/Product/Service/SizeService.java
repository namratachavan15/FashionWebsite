package com.example.Product.Service;

import com.example.Product.Repo.SizeRepo;
import com.example.Product.entity.size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService {
    @Autowired
    private SizeRepo sizeRepo;

    public List<size> findAll() {
        return sizeRepo.findAll();
    }
}
