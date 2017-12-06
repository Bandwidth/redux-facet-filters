const COLORS = ['orange', 'blue', 'yellow'];
export default () => Array(50).fill(0).map(() => ({
  number: Math.floor(Math.random() * 100),
  color: COLORS[Math.floor(Math.random() * 3)]
}));
