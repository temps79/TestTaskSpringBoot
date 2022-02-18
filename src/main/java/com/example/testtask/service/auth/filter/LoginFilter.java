package com.example.testtask.service.auth.filter;

import com.example.testtask.entity.auth.User;
import com.example.testtask.entity.auth.UserCredentials;
import com.example.testtask.service.auth.AuthenticationService;
import com.example.testtask.service.auth.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class LoginFilter extends AbstractAuthenticationProcessingFilter {

    private final UserDetailsServiceImpl userDetailsService;

    public LoginFilter(String url, AuthenticationManager authManager,UserDetailsServiceImpl userDetailsService) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
        this.userDetailsService=userDetailsService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException, IOException {
        UserCredentials userCredentials = new ObjectMapper()
                .readValue(req.getInputStream(), UserCredentials.class);
        Authentication authentication=getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        userCredentials.getUserName(),
                        userCredentials.getPassword(),
                        Collections.emptyList()
                )
        );
        if(authentication.isAuthenticated()) {
            String userName=userCredentials.getUserName();
            User user = userDetailsService.findAll()
                    .stream().filter(user1 -> user1.getUserName().equals(userName))
                    .collect(Collectors.toList()).get(0);

            JSONObject role=new JSONObject();
            role.put("Role",  user.getRole().getName());

            PrintWriter out = res.getWriter();
            res.setContentType("application/json");
            res.setCharacterEncoding("UTF-8");
            out.print(role);

        }
        return authentication;
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest req,
            HttpServletResponse res, FilterChain chain,
            Authentication auth) {
        AuthenticationService.addJWTToken(res, auth.getName());
    }
}