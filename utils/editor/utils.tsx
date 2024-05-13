export function all<T>(list: T[], func: (value: T) => boolean) {
  for (let value of list) if (!func(value)) return false;
  return true;
}

export function any<T>(list: T[], func: (value: T) => boolean) {
  for (let value of list) if (func(value)) return true;
  return false;
}

export const key = (key: string, s: any) => `${key}${JSON.stringify(s)}`;

export const noText = () => <>&nbsp;</>;

export const localDate = (date: Date) =>
  `${date.getFullYear()}.${('0' + (date.getMonth() + 1)).slice(-2)}.${(
    '0' + date.getDate()
  ).slice(-2)}`;

export const localDateTime = (date: Date) =>
  `${date.getFullYear()}.${('0' + (date.getMonth() + 1)).slice(-2)}.${(
    '0' + date.getDate()
  ).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${(
    '0' + date.getMinutes()
  ).slice(-2)}`;

export const memberCount = (minMember: number, maxMember: number) =>
  minMember === maxMember ? `${minMember}` : `${minMember}~${maxMember}`;
