const timeOffset = [
  1_000, 60_000, 3600_000, 86400_000, 604800_000, 2592000_000,
];
const timeKey = ['초', '분', '시간', '일', '주'];

export const relativeTime = (_time: string) => {
  const time = new Date(Date.parse(_time));
  const diff = new Date().getTime() - time.getTime();
  const absDiff = Math.abs(diff);
  if (diff >= 86400_000 && diff < 86400_000 * 2) return '어제';
  if (diff <= -86400_000 && diff > -86400_000 * 2) return '내일';
  for (let i = 1; i < timeOffset.length; i++) {
    if (absDiff < timeOffset[i]) {
      return (
        Math.floor(absDiff / timeOffset[i - 1]) +
        timeKey[i - 1] +
        (diff > 0 ? ' 전' : ' 후')
      );
    }
  }
  return `${time.getFullYear()}.${zeroNumber(time.getMonth() + 1)}.${zeroNumber(
    time.getDate()
  )}`;
};

const zeroNumber = (value: number) => (value < 10 ? `0${value}` : `${value}`);
