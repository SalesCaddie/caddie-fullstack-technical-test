// default color map
const colors: Map<string, string> = new Map<string, string>([
  ['a', '#62c3fb'],
  ['b', '#6a955d'],
  ['c', '#b01dff'],
  ['d', '#349187'],
  ['e', '#3d5642'],
  ['f', '#36a5c7'],
  ['g', '#706a98'],
  ['h', '#20fd85'],
  ['i', '#03e137'],
  ['j', '#baacf1'],
  ['k', '#5359a5'],
  ['l', '#d79649'],
  ['m', '#49ba64'],
  ['n', '#0f75e7'],
  ['o', '#746a0e'],
  ['p', '#ebc71f'],
  ['q', '#cb4259'],
  ['r', '#5795c2'],
  ['s', '#032908'],
  ['t', '#839d26'],
  ['u', '#c74a3a'],
  ['v', '#3f20bc'],
  ['w', '#4a7717'],
  ['x', '#7c62ed'],
  ['y', '#2977b9'],
  ['z', '#1d9189'],
]);

export function getColorFromString(input: string): string | undefined {
  const char = input.toLowerCase().charAt(0);
  return colors.has(char) ? colors.get(char) : '';
}