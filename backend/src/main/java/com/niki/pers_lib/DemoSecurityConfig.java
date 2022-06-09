package com.niki.pers_lib;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@Configuration
public class DemoSecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
//            .authorizeRequests()
//                .antMatchers("/book-place/update").permitAll()
//            .anyRequest()
//            .authenticated()
//            .and()
//            .httpBasic()
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        auth.inMemoryAuthentication()
                .withUser("spring")
                .password(encoder.encode("123"))
                .roles("USER");
//        auth.inMemoryAuthentication()
//            .withUser(users
//                .username("superadmin")
//                .password("superadmin")
//                .roles("SOPERADMIN")
//            )
//            .withUser(users
//                    .username("panomar")
//                    .password("pan")
//                    .roles("PANOMAR")
//            )
//            .withUser(users
//                    .username("диакон")
//                    .password("diakon")
//                    .roles("DIAKON")
//            )
//            .withUser(users
//                    .username("Благочинный")
//                    .password("diakon")
//                    .roles("BLAGOCHINNYI")
//            )
//            .withUser(users
//                    .username("Ризничий")
//                    .password("diakon")
//                    .roles("RYZNYCHYI")
//            )
//        ;
    }
}
