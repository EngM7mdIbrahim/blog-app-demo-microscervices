const images = {
  1: "avatar_0.png",
  2: "avatar_1.jpg",
  3: "avatar_4.webp",
  4: "avatar_6.webp",
  5: "avatat_2.png",
  6: "avatat_3.png",
};

export default function getImage() {
  return `images/${images[Math.floor(Math.random() * (6 - 1 + 1)) + 1]}`;
};
