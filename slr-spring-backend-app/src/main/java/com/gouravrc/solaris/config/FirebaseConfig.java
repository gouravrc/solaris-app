package com.gouravrc.solaris.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class FirebaseConfig{
    @Value("${user}")
    private String user;
}
