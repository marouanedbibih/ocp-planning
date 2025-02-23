package org.fahdpln.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.javafaker.Faker;

@Configuration
public class AppConfig {

    @Bean
    public Faker faker() {
        return new Faker();
    }

}
