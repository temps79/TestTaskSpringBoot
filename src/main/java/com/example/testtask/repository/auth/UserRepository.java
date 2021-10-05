package com.example.testtask.repository.auth;

import com.example.testtask.entity.auth.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUserName(String username);
}