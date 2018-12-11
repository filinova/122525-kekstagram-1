'use strict';

var KEYCODE_ESC = 27;
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
for (var i = 0; i <= 24; i++) {
  picturesData[i] = {};
  picturesData[i].url = getUrl(i + 1);
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
for (var j = 0; j < picturesData.length; j++) {
  fragment.appendChild(getAllPictures(picturesData[j]));
}
pictures.appendChild(fragment);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

var uploadFile = document.querySelector('#upload-file');
var closePopup = document.querySelector('.img-upload__cancel');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var bigPictureCancel = document.querySelector('.big-picture__cancel');
var pinEffect = document.querySelector('.effect-level__pin');
var effectValueNumber = 100;

// Загрузка фото с котиком
uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
});

//  Присвоение значения инпуту при нажатии на ползунок
pinEffect.addEventListener('mouseup', function () {
  // console.log(document.querySelector('.effect-level__value').value);
});

var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

var effectValue = document.querySelector('.effect-level__value');

var originalEffect = document.querySelector('.effects__preview--none');
var chromeEffect = document.querySelector('.effects__preview--chrome');
var sepiaEffect = document.querySelector('.effects__preview--sepia');
var marvinEffect = document.querySelector('.effects__preview--marvin');
var phobosEffect = document.querySelector('.effects__preview--phobos');
var heatEffect = document.querySelector('.effects__preview--heat');


originalEffect.addEventListener('click', function () {
  imgPreview.removeAttribute('class');
  imgPreview.classList.add('effects__preview--none');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
});

chromeEffect.addEventListener('click', function () {
  imgPreview.removeAttribute('class');
  imgPreview.classList.add('effects__preview--chrome');
  effectValue.value = effectValueNumber;
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
});

sepiaEffect.addEventListener('click', function () {
  imgPreview.removeAttribute('class');
  imgPreview.classList.add('effects__preview--sepia');
  effectValue.value = effectValueNumber;
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
});

marvinEffect.addEventListener('click', function () {
  imgPreview.removeAttribute('class');
  imgPreview.classList.add('effects__preview--marvin');
  effectValue.value = effectValueNumber;
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
});

phobosEffect.addEventListener('click', function () {
  imgPreview.removeAttribute('class');
  imgPreview.classList.add('effects__preview--phobos');
  effectValue.value = effectValueNumber;
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
});

heatEffect.addEventListener('click', function () {
  imgPreview.removeAttribute('class');
  imgPreview.classList.add('effects__preview--heat');
  effectValue.value = effectValueNumber;
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
});

// Функция открытия большого окна
var getBigPicture = function (data) { // добавили параметр дата
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').setAttribute('src', data.url);
  bigPicture.querySelector('img').setAttribute('alt', data.description);
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;
};

var nodeList = document.querySelectorAll('.picture');
var overlayPhoto = document.querySelector('.overlay');

nodeList.forEach(function (item, index) {
  item.addEventListener('click', function () {
    overlayPhoto.classList.remove('hidden');
    getBigPicture(picturesData[index]);// рендер и передача данных из массива картинок picturesData
  });
});

// Событие на закрытие окна
closePopup.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');
});

bigPictureCancel.addEventListener('click', function () {
  overlayPhoto.classList.add('hidden');
});
// Событие на закрытие по клавише esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    uploadOverlay.classList.add('hidden');
    overlayPhoto.classList.add('hidden');
  }
});
