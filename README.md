[![](https://img.shields.io/badge/spring%20boot-7CFC00)](https://spring.io)
[![](https://img.shields.io/badge/hibernate-A020F0)](https://hibernate.org)
[![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/DVasyl13/cinema-app)](https://github.com/DVasyl13/cinema-app/commits/)
[![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/m/DVasyl13/cinema-app)](https://github.com/DVasyl13/cinema-app/commits/)
[![GitHub repo size](https://img.shields.io/github/repo-size/DVasyl13/cinema-app)](https://github.com/DVasyl13/cinema-app/)

<div align="center">
  <a href="https://github.com/DVasyl13/cinema-app">
 <img width="450" alt="QUADCinema" src="https://github.com/DVasyl13/cinema-app/blob/master/cinema/src/main/resources/static/img/logo.png">
  </a>
</div>


## Topics

- [About](#about-)
- [Technologies](#technologies-)
- [Features](#features-)


## About 🔎

<br>
Web-based customer service system that will allow you to order tickets online, view the current screening schedule, receive a full information package about movies and cinema services, ensuring a comfortable experience.<br>
<br>
Description of the site sections:
<br>
<br>

* / - is the main page;
* /movie - a page with a list of available movies to watch in the cinema;
* /movie/{id} - page of a particular movie;
* /movie/{id}/booking/{id} - a page with a ticket ordering/booking system;
* /info - page with contacts and information about the site;
* /account - user account
* /account/booking - is a section of the /account page that displays a list of the user's booked tickets;

## Technologies 🧰
* <b>Spring</b> (Core, Data JPA, Boot, MVC)
* <b>Hibernate</b>
* <b>Thymeleaf</b>
* <b>PostgreSQL</b>
* <b>HTML/CSS</b>
* <b>JavaScript</b>
* <b>Maven</b>

## Features 🔧
<div align="center">
  <a href="https://github.com/DVasyl13/cinema-app">
 <img width="1144" alt="QUADCinema" src="https://github.com/DVasyl13/cinema-app/blob/master/cinema/src/main/resources/static/img/view.png">
  </a>
</div>
<br>

* On the main page of the site, you are greeted with a slider of current movies. 
* Below are movie cards that link to the page of a particular movie. Going to the movie page, the user can see detailed information about the movie: description, cast, director, release date, theater run, and a link to the booking page for a particular screening. 
* The booking page shows additional information: theater number, screening time and date, and movie title.
* The main element of the page is the seating system - a screen image and interactive elements * representing a specific seat, which, when clicked, will be added to the order list on the right side of the screen. An unauthorized user will not be able to order a movie ticket. 
* The main navigation of the site is placed on the header element: a link to the main page in the form of a logo, a list of movies, a contact section, and a button for registration/login. After authentication, the user can view the entire account - his personal information and a list of purchased tickets. Personal information can be edited.
