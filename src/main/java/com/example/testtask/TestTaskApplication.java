package com.example.testtask;

import com.example.testtask.entity.auth.User;
import com.example.testtask.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;


@SpringBootApplication
public class TestTaskApplication {
    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) throws IOException {
        SpringApplication.run(TestTaskApplication.class, args);
    }

}
