package com.example.testtask;

import com.example.testtask.entity.auth.User;
import com.example.testtask.service.auth.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;


@SpringBootApplication
public class SpringApplication {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Value("${user.userName}")
    private String userName;
    @Value("${user.password}")
    private String password;

    public static void main(String[] args) throws IOException {
        org.springframework.boot.SpringApplication.run(SpringApplication.class, args);
    }
    @Bean
    public CommandLineRunner initUser() {
        User user=new User(userName,password);
        return (args) -> {
            userDetailsService.saveUser(user);
        };
    }

}
