<a href="https://oauth.vk.com/authorize?client_id=51732152&display=page&redirect_uri=https://arizonec.github.io/WildBerry0-1/&scope=wall&response_type=token&v=5.131&state=123456" target="_blank">Ссылка на деплой</a>

Пришлось попотеть с полученим токена, но спасибо ребятам из группы, помогли решить проблему! Поэтому можно запустить только через ссылку выше.

Задание инетресное, поэтому хотелось бы уделить пару минут и рассказать, что и как сделал!

Вызываю функцию check, с условием, где проверяю, есть ли что то в хранилище. Если есть, то подгружаю от туда, в ином случае получаю данные из API, и сразу отрисовываю первые 10 элементов, вешаю observer для отслеживания скролла, и сохраняю все в localStorage.

Так же что бы не писать лишний код, решил сразу сделать 20 задание здесь, написал функцию localStorageSize, где смотрю на размер хранилища и отрисовываю элемент справа в нижнем углу на странице.
Когда в хранилище заканчивается место, то я удалаю первую половину постов и у меня освобождается половина памяти! Проверяю хранилище каждые 2 секунды.

Единственная ошибка, которую заметил, это то, что почему то при подгрузке из кэша, у меня начинают дублироваться посты, нагуглил, что это может быть из за спреда, изменил код, но проблема не ушла.
