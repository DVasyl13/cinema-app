package com.lab.app.dto;

import java.sql.Timestamp;
import java.util.Set;

public record MovieFullDTO(Long id, String description, Integer duration,
                       String posterURL, Float rating, Timestamp releaseDate, String title,
                       String trailerUrl, Short ageLimit, String widePosterUrl,
                       Timestamp startShowDate, Timestamp endShowDate, Set<GenreDTO> genres,
                           Set<ActorDTO> actors, Set<DirectorDTO> directors, Set<ShowtimeDTO> showtimes) {

}