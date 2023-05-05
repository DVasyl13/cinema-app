package com.lab.app.dto;

import java.sql.Timestamp;
import java.util.Set;

public record MovieDTO(Long id, String description, Integer duration,
                       String posterURL, Float rating, Timestamp releaseDate, String title,
                       String trailerUrl, Integer ageLimit, String widePosterUrl,
                       Timestamp startShowDate, Timestamp endShowDate, Set<GenreDTO> genres) {

}
