export function msToMS(ms: number): string {
  let secondsRemaining = Math.floor(ms / 1000);
  secondsRemaining = secondsRemaining % 3600;
  const minutes = ("0" + Math.floor(secondsRemaining / 60)).slice(-2);
  const seconds = ("0" + (secondsRemaining % 60)).slice(-2);
  return minutes + ":" + seconds;
}
