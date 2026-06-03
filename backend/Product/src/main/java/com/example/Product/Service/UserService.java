package com.example.Product.Service;

import com.example.Product.Config.JwtUtil;
import com.example.Product.Repo.UserRepo;
import com.example.Product.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String register(User user) {

        if (userRepo.findByEmail(user.getEmail()) != null) {
            return "User already exists";
        }

        // ENCRYPT PASSWORD
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepo.save(user);
        return "Registered Successfully";
    }

    public User login(User user) {

        User dbUser =
                userRepo.findByEmail(user.getEmail());

        if (dbUser == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        return dbUser;
    }

    public User getUser(Integer id) {
        return userRepo.findById(id).orElse(null);
    }

    // UPDATE USER
    public User updateUser(Integer id, User user) {

        User dbUser =
                userRepo.findById(id).orElse(null);

        if (dbUser == null) {
            return null;
        }

        dbUser.setFirstName(user.getFirstName());
        dbUser.setLastName(user.getLastName());
        dbUser.setEmail(user.getEmail());
        dbUser.setPassword(user.getPassword());

        return userRepo.save(dbUser);
    }

}