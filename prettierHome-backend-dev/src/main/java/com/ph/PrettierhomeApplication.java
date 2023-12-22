package com.ph;

import com.ph.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableCaching
public class PrettierhomeApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrettierhomeApplication.class, args);
    }

}
