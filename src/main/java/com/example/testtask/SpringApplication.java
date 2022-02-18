package com.example.testtask;

import com.example.testtask.entity.auth.Role;
import com.example.testtask.entity.auth.User;
import com.example.testtask.service.auth.RoleService;
import com.example.testtask.service.auth.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@SpringBootApplication
public class SpringApplication {
    public static void main(String[] args) throws IOException {
        org.springframework.boot.SpringApplication.run(SpringApplication.class, args);
    }

    @Value("${user.userName}")
    private String userName;
    @Value("${user.password}")
    private String password;

    @Value("#{'${role.roles}'.split(',')}")
    private List<String> roles;

    @Bean
    @Order(1)
    public CommandLineRunner initRoles(RoleService roleService){
        return args -> {
            if(roleService.findAll().size()==0) {
                for (String role : roles) {
                    Role r = new Role(role);
                    roleService.saveRole(r);
                }
            }
        };
    }
    @Bean
    @Order(2)
    public CommandLineRunner initUser(UserDetailsServiceImpl userDetailsService,RoleService roleService) {
        return (args) -> {
            if(userDetailsService.findAll().size()==0) {
                User user = new User(userName, password);
                user.setRoles(List.of(roleService.findRoleByName("ADMIN")));
                userDetailsService.saveUser(user);
            }
        };
    }

}
