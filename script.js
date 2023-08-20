// window.location.href = 'https://!oauth.vk.com/authorize?client_id=51732152&display=page&redirect_uri=https://!arizonec.github.io/WildBerry0-1/&scope=wall&response_type=token&v=5.131&state=123456'
const token = window.location.hash.split("=")[1].split("&")[0];
const element = document.querySelector('.vk-widget-post:last-child');
const loader = document.querySelector('.loader');
const memory = document.querySelector('.memory__counter');


//! Установим области и переменные для работы виджета
const widget = document.querySelector('.vk-widget'); //! нашёл блок виджета
const postsList = document.querySelector('.vk-widget-posts'); //! блок постов
let offset = +localStorage.getItem("offset") ?? 0;
let posts = JSON.parse(localStorage.getItem("posts")) ?? []; //! массив постов для кэширования

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
    }, (r) => { //обрабатываем ответ от апи
    if (r.response) { //проверка пришло ли нам что либо
      const newPosts = r.response.items; //задаём как массив объектов пришедший с апи
      const html = newPosts //создаём новый массив при помощи метода map который вернёт нам вёрстку новых элементов для дальнейших действий
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
        .join(''); //соединяем верстку
      postsList.insertAdjacentHTML('beforeend', html); //добавляем посты в список
      posts = [...posts, ...newPosts]; //добавляем посты в массив для кэширования
      offset += count; //увеличиваем смещение //Устанавливаем слежку за последним элементом
      observer.observe(document.querySelector('.vk-widget-post:last-child'));
      saveData(offset, posts);
    }
  });
}

const options = {
    threshold: 0,
}

const callback = function(posts, observer) {
    posts.forEach(post => {
        if(post.isIntersecting) {
            loadPosts();
        }
    })
}

const observer = new IntersectionObserver(callback, options);

const saveData = (offset, posts) => {
    const oldPosts = JSON.parse(localStorage.getItem('posts')) ?? [];
    const newItems = JSON.stringify([...oldPosts, ...posts]);


    localStorage.setItem('posts', newItems);
    localStorage.setItem('offset', offset);
}

const loadFronData = () => {
    const dataPosts = localStorage.getItem('posts');
    const dataOffset = localStorage.getItem('offset');

    if(dataPosts && dataPosts.length !== 0) {
        posts = JSON.parse(dataPosts);
        offset = dataOffset ? parseInt(dataOffset) : 0;

        const html = posts
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
        ).join('');
        postsList.insertAdjacentHTML('beforeend', html);
        observer.observe(document.querySelector('.vk-widget-post:last-child'));
    }
}

function check() {
    const dataPosts = localStorage.getItem('posts');
    if (dataPosts && dataPosts.length !== 0) {
        loadFronData();
    } else {
        loadPosts();
    }
}

const localStorageSize = () => {
    let dataSize = JSON.stringify(localStorage).length;
    if(dataSize > 0) {
        memory.innerHTML = `${5242880 - dataSize} / 5242880`;
    } else {
        memory.innerHTML = `0 / 5242880`;
    }
    
    if(dataSize > 5242880) {
        localStorage.remove('posts');
        localStorage.offset('posts');
    }
}

check();
setInterval(localStorageSize, 2000);