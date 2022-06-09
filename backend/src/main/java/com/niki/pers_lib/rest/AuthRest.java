package com.niki.pers_lib.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AuthRest {
    @GetMapping("/authenticateTheUser")
    public Principal user(Principal user) {
        System.out.println(user);
       return user;
    }

}
