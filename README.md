# ⛅️ WEATHER APP

![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?logo=javascript&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)
![GitHub top language](https://img.shields.io/github/languages/top/tilvlur/weather-app?color=%233178c6&label=TypeScript&logo=typescript)
![React](https://img.shields.io/badge/React-17.0.2-2dd5f0?logo=react)
![Redux](https://img.shields.io/badge/Redux-4.1.2-724eb1?logo=redux)
![React Router](https://img.shields.io/badge/React_Router-6.2.2-d53d47?logo=reactrouter)
![HTML5](https://img.shields.io/badge/-HTML5-e9452d?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-0058dd?logo=css3)
![SASS](https://img.shields.io/badge/-SASS-cf6492?logo=sass&logoColor=white)
![API OpenWeather](https://img.shields.io/badge/API-OpenWeather-f56a52)
![API Mapbox](https://img.shields.io/badge/API-Mapbox-orange?logo=mapbox)
![API IPGeolocation](https://img.shields.io/badge/API-IP_Geolocation-blue)
![ESLint](https://img.shields.io/badge/-ESLint-413bb7?logo=eslint)
![Stylelint](https://img.shields.io/badge/-Stylelint-blue?logo=stylelint)
![Prettier](https://img.shields.io/badge/-Prettier-2f4750?logo=prettier)
![Git](https://img.shields.io/badge/-Git-fc3332?logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/-NPM-gray?logo=npm)
![Yarn](https://img.shields.io/badge/-Yarn-008db4?logo=yarn&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-006d1a?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

### [🌏](https://weather-app.ittim.ru) [Сайт приложения](https://weather-app.ittim.ru)

## Описание

Веб-приложение прогноза погоды.

1) На главной странице автоматически определяется местоположение пользователя и показывается текущая погода для данного местоположения:

![task1Gif](./readme_assets/task1.gif)

2) Выбор города возможен в текстовом инпуте с автозаполнением:

![task2Gif](./readme_assets/task2.gif)

3) Кнопка "Save place" в правом верхнем углу добавляет город в список сохранённых городов:

![task3Gif](./readme_assets/task3.gif)

4) Клик по блоку сохранённого города открывает новый путь (например: "/moscow"), содержащий подробную информацию о погоде в этом городе:

![task4Gif](./readme_assets/task4.gif)

5) Навигационные ссылки в шапке приложения показывают подробную погоду на сегодня, на завтра или на всю неделю:

![task5Gif](./readme_assets/task5.gif)

6) На страницах "Today" и "Tomorrow" отображается карта с маркером выбранного города. По клику на маркер выводится окошко с информацией о погоде в данный момент.

![task6Gif](./readme_assets/task6.gif)

## Работа с приложением

### 💻 Установка

```
npm i
```

### ⏯ Запуск

```
npm start
```
Приложение будет запущено в режиме разработки.\
Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.\

⚠️ Для работы приложения необходимо создать файл `.env.local` и в данном файле создать переменные с API-токенами. Имена переменных есть в файле `.env-examples️` ⚠️

### 👷 Сборка

```
npm run build
```
Данная команда создаст и сохранит оптимизированную сборку приложения в папке `build`.

### 👨‍⚕️ Проверка кода на ошибки и их исправление

Проверка:

```
npm run lint
```

Исправление:

```
npm run lint:fix
```

## License

Copyright © 2022 Timur Khrustalyov. All rights reserved.\
License: [MIT](LICENSE)
