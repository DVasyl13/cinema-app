package com.lab.app.dto;

import com.lab.app.entity.Actor;
import com.lab.app.entity.Director;
import com.lab.app.entity.Genre;

import java.util.Date;
import java.util.List;
import java.util.Set;

public record MovieDto(Long id, String description, Integer duration,
                       String posterURL, Float rating, Date releaseDate, String title,
                       String trailerUrl, Integer ageLimit, String widePosterUrl,
                       Date startShowDate, Date endShowDate, Set<Genre> genres,
                       Set<Actor> actors, Set<Director> directors, List<ShowtimeDto> showtimes) {

}