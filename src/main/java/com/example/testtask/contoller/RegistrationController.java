package com.example.testtask.contoller;

import com.example.testtask.entity.auth.User;
import com.example.testtask.service.auth.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1")
public class RegistrationController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/registration")
    public ResponseEntity<User> registration(@RequestBody User user){
        return ResponseEntity.ok(userDetailsService.saveUser(user));
    }

}
