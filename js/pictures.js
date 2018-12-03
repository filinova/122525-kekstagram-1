'use strict';

// Для лайков
var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Для комментов
var getRandomComment = function () {
  var comment = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  return comment[Math.floor(Math.random() * comment.length)];
};

var getRandomCommentTwice = function () {
  return (getRandomComment() + getRandomComment());
};

var getComment = function () {
  return getRandomNum(0, 101) < 50 ? getRandomComment() : getRandomCommentTwice();
};

// Для description
var getRandomDescription = function () {
  var description = ['Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];
  return description[Math.floor(Math.random() * description.length)];
};

// Для url
var getUrl = function (k) {
  return 'photos/' + k + '.jpg';
};

var picturesData = [];
for (var i = 0; i <= 25; i++) {
  picturesData[i] = {};
  picturesData[i].url = getUrl(i);
  picturesData[i].likes = getRandomNum(15, 200);
  picturesData[i].comments = getComment();
  picturesData[i].description = getRandomDescription();
}

var picturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var pictures = document.querySelector('.pictures');
var getAllPictures = function (picData) {
  var elemPicture = picturesTemplate.cloneNode(true);
  elemPicture.querySelector('.picture__img').setAttribute('src', picData.url);
  elemPicture.querySelector('.picture__likes').textContent = picData.likes;
  elemPicture.querySelector('.picture__comments').textContent = picData.length;
  return elemPicture;
};

var fragment = document.createDocumentFragment();
for (var j = 1; i < picturesData.length; j++) {
  fragment.appendChild(getAllPictures(picturesData[j]));
}
pictures.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img').setAttribute('src', picturesData[1]);
bigPicture.querySelector('.likes-count').textContent = picturesData[1].likes;
bigPicture.querySelector('.comments-count').textContent = picturesData[1].comments.length;
bigPicture.querySelector('.social__caption').textContent = picturesData[1].description;

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

