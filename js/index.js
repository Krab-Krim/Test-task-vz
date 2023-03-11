$(document).ready(function () {
  const $app = $('#film-list');
  const $ul = $('<ul class="main__list__ul paginationTable"/>');
  const $li = $('<li class="main__list__item tableItem" hidden><button class="main__list__item-button">' +
    '<img src="../assets/star.svg" alt="star">' +
    '<span class="main__list__item__span-ratingKinopoisk"></span></button>' +
    '<img class="main__list__item__poster" alt="poster"/> ' +
    '<span  class="main__list__item__span-nameOriginal"></span> </li>');

  $.ajax('https://kinopoiskapiunofficial.tech/api/v2.2/films', {
    method: 'GET', headers: {
      'X-API-KEY': '2b2e4938-41ad-4381-9f37-d68e73d60e61', 'Content-Type': 'application/json',
    },
  })
    .then(response => {
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

  $(window).on("load", function () {
    $(function () {
      const numberOfItems = $(".main__list__ul .main__list__item").length;
      let limitPerPage = 8;
      const totalPages = Math.ceil(numberOfItems / limitPerPage);
      let currentPage;

      function setheight() {
        let clientHeight = $(window).width();
        if (clientHeight > 1200) {
          limitPerPage = 8;
        } else {
          limitPerPage = 6;
        }
      }

      setheight();

      setTimeout(() => {
        $(window).resize(function () {
          if ($(window).width() > 1200) {
            limitPerPage = 8;
            getList();
          } else {
            limitPerPage = 6;
            getList();
          }
        })
      }, 0)

      const getList = () => {
        function showPage(whichPage) {
          if (whichPage < 1 || whichPage > totalPages) return false;
          currentPage = whichPage;
          $(".main__list__ul .main__list__item").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
          $(".pagination div").slice(1, -1).remove();
          $(".previous-page").toggleClass("disable", currentPage === 1);
          $(".next-page").toggleClass("disable", currentPage === totalPages);
          return true;
        }

        $(".card-content").show();
        showPage(1);

        $(document).on("click", ".pagination li.current-page:not(.active)", function () {
          return showPage(+$(this).text());
        });

        $(".next-page").on("click", function () {
          return showPage(currentPage + 1);
        });

        $(".previous-page").on("click", function () {
          return showPage(currentPage - 1);
        });
      }
      getList();
    });
  })
});
