package com.lab.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Slf4j
@EnableScheduling
@EnableCaching
@SpringBootApplication
public class CinemaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaApplication.class, args);
    }

    @Scheduled(fixedDelay = 24 * 60 * 60 * 1000) // each 24 hours will be refreshed
    @CacheEvict({"movies", "cinemas"})
    public void refreshCache() {
        log.info("[Refreshing cache]");
    }
    
}
