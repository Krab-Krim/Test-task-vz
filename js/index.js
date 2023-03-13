$(document).ready(function () {
  const $app = $('#film-list');
  const $ul = $('<ul class="main__list__ul"/>');
  const $li = $('<li class="main__list__item"><button class="main__list__item-button">' +
    '<img src="../assets/star.svg" alt="star">' +
    '<span class="main__list__item__span-ratingKinopoisk"></span></button>' +
    '<img class="main__list__item__poster" alt="poster"/> ' +
    '<span  class="main__list__item__span-nameOriginal"></span> </li>');

  let currentPage = 1;
  let totalPages = 0;

  $(".next-page").on("click", function () {
    if (currentPage < totalPages) {
      currentPage = currentPage + 1
      return getPage(currentPage);
    }
  });

  $(".previous-page").on("click", function () {
    if (currentPage > 1) {
      currentPage = currentPage - 1
      return getPage(currentPage);
    }
  });

  const getPage = (currentPage) => {
    $.ajax(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${currentPage}`, {
      method: 'GET', headers: {
        'X-API-KEY': '2b2e4938-41ad-4381-9f37-d68e73d60e61', 'Content-Type': 'application/json',
      },
    })
      .then(response => {
        $ul.empty();
        totalPages = response.totalPages;
        $(".previous-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        const items = response.items.map(function (film) {
          const item = $li.clone();
          item.find(".main__list__item__span-ratingKinopoisk").text(film.ratingKinopoisk);
          item.find(".main__list__item__poster").attr("src", film.posterUrl);
          item.find(".main__list__item__span-nameOriginal").text(film.nameRu);

          return item;
        });

        $ul.append(items);
        $app.append($ul);
      })
      .catch(err => console.log(err))
  }

  $(window).on("load", function () {
    getPage(currentPage);
  })
});
