package com.lab.app.service;

import com.lab.app.dto.CinemaDTO;
import com.lab.app.repository.CinemaRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;

    @Cacheable("cinemas")
    @Transactional(readOnly = true)
    public List<CinemaDTO> getAllCinemas() {
        return cinemaRepository.getAllCinemas();
    }

//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Cacheable("cinemas")
//    public List<CinemaDTO> getAllCinemas() {
//        String sql = "SELECT id, address, email, phone_number FROM cinema.cinema";
//        Query query = entityManager.createNativeQuery(sql);
//        List<Object[]> results = query.getResultList();
//
//        return results.stream()
//                .map(result -> {
//                    Long id = ((Number) result[0]).longValue();
//                    String address = (String) result[1];
//                    String email = (String) result[2];
//                    String phoneNumber = (String) result[3];
//                    return new CinemaDTO(id, address, email, phoneNumber);
//                })
//                .collect(Collectors.toList());
//    }
}