package com.example.Product.Controller;

import com.example.Product.Service.UserService;
import com.example.Product.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user);
    }

    // GET USER
    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.getUser(id);
    }

    // UPDATE USER
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Integer id,
            @RequestBody User user
    ) {
        return userService.updateUser(id, user);
    }
}