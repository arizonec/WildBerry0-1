// window.location.href = 'https://!oauth.vk.com/authorize?client_id=51732152&display=page&redirect_uri=https://!arizonec.github.io/WildBerry0-1/&scope=wall&response_type=token&v=5.131&state=123456'
const token = window.location.hash.split("=")[1].split("&")[0];
const element = document.querySelector('.vk-widget-post:last-child');
const loader = document.querySelector('.loader');


//! Установим области и переменные для работы виджета
const widget = document.querySelector('.vk-widget'); //! нашёл блок виджета
const postsList = document.querySelector('.vk-widget-posts'); //! блок постов
let offset = 0; //! смещение для загрузки следующей партии постов
let posts = []; //! массив постов для кэширования

//! Загрузка постов из VK API
function loadPosts() { //! объявляем функцию загрузки постов
    const count = 10; //! количество постов для загрузки

    VK.Api.call('wall.get', { //! запрос использует ключевые слова VK.Api.call для вызова метода получения постов первый аргумент это метод вызова второй параметры
        owner_id: -41152133,
        domain: 'spacex',
        count: count,
    offset: offset,
    access_token: token,
    v: 5.131
    }, (r) => { //! обрабатываем ответ от апи
    if (r.response) { //! проверка пришло ли нам что либо
      const newPosts = r.response.items; //! задаём как массив объектов пришедший с апи
      const html = newPosts //! создаём новый массив при помощи метода map который вернёт нам вёрстку новых элементов для дальнейших действий
        .map(
          (p) => `
          <li class="vk-widget-post">
            <div class="vk-widget-post-title">${p.text}</div>
            <img class=ImgAll src=${p.attachments[0]['photo']?.sizes[4].url}
            <div class='vk-widget-statistics'>
            <div class='likes'>
            Нравится: ${p.likes.count}
            </div>
            <div class='comments'></div>
            Комментарии: ${p.comments.count}
            </div>
            <div class="vk-widget-post-date">${new Date(
                p.date * 1000
              ).toLocaleDateString()}
            </div>
          </li>
        `
        )
        .join(''); //! соединяем верстку
      postsList.insertAdjacentHTML('beforeend', html); //! добавляем посты в список
      posts = posts.concat(newPosts); //! добавляем посты в массив для кэширования
      offset += count; //! увеличиваем смещение //! Устанавливаем слежку за последним элементом
    }
  });
}

loadPosts();

const options = {
    threshold: 0,
}

// const observer = new IntersectionObserver(posts => {
//     posts.forEach(post => {
//         if(post.isIntersecting) {
//             loadPosts();
//         }
//     })
// });

const callback = function(posts, observer) {
    posts.forEach(post => {
        if(post.isIntersecting) {
            loadPosts();
        }
    })
}

const observer = new IntersectionObserver(callback, options);
observer.observe(loader);

