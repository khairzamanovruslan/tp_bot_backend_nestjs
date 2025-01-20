const linkToYandexMapsAnswer = (latitude: string, longitude: string) => {
  return `https://yandex.ru/maps/?pt=${longitude},${latitude}&z=18&l=map`;
};

const coordinateAnswer = (latitude: string, longitude: string) => {
  return `${latitude},${longitude}`;
};

export { linkToYandexMapsAnswer, coordinateAnswer };
