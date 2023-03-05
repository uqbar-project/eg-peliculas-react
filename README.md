
## Películas - frontend en React

[![Build React App](https://github.com/uqbar-project/eg-peliculas-react/actions/workflows/build.yml/badge.svg)](https://github.com/uqbar-project/eg-peliculas-react/actions/workflows/build.yml) ![coverage](./badges/coverage-lines.svg)

![demo](./video/demo.gif)

Esta aplicación sirve para mostrar la integración de un frontend contra una API que puede estar hecha en cualquier tecnología.

## Objetivo

Poder llevar un registro de películas y conocer los personajes que interpretaron los distintos actores en cada una de ellas. Tenemos un gran caso de uso: actualizar películas.

## Interacción con el backend

- Películas
  - `POST /peliculas`: crea una nueva película
  - `PUT /peliculas/:id`: modifica una película existente
  - `DELETE /peliculas/:id`: elimina una película
  - `GET /peliculas/:filtro`: busca películas que contengan un título (sin distinguir mayúsculas o minúsculas). La búsqueda solamente debe traer los datos de una película
  - `GET /pelicula/:id`: trae todos los datos asociados a una película, incluyendo personajes y actores
- Actores
  - `GET /actores/:filtro`: trae una lista de actores en base a un filtro de búsqueda por nombre que contenga, sin distinguir mayúsculas o minúsculas.

  ## Dominio

  Una película contiene

  - título
  - año de estreno
  - frase de cabecera
  - un identificador
  - personajes, una lista con
    - un actor, que a su vez tiene
      - identificador
      - nombre
      - año de nacimiento
    - los roles que cumple, una lista de strings