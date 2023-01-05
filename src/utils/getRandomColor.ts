export const randomColor = () => {
  const r = (Math.floor(Math.random() * 255)).toString(16);
  const g = (Math.floor(Math.random() * 255)).toString(16);
  const b = (Math.floor(Math.random() * 255)).toString(16);
  const a = (Math.random()).toString(16).slice(2, 4);
  return `#` + r + g + b + a;
}