export default function getImageURL(name: string) {
  return new URL(`../../assets/chess-pieces/${name}`, import.meta.url).href;
}
