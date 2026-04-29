package com.example.it_helpdesk_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ItHelpdeskBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItHelpdeskBackendApplication.class, args);
	}

}
