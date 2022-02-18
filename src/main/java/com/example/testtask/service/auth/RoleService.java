package com.example.testtask.service.auth;

import com.example.testtask.entity.auth.Role;
import com.example.testtask.repository.auth.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role saveRole(Role role){
        return roleRepository.save(role);
    }
    public Role findRoleByName(String name){
        List<Role> roles=((List<Role>)roleRepository.findAll()).stream().filter(role -> role.getName().equals(name)).collect(Collectors.toList());
        return roles.size()>0?roles.get(0):null;
    }
    public List<Role> findAll(){
        return (List<Role>) roleRepository.findAll();
    }
}
