export function convertMinutesToHoursString(minutesAmount: number): string {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;

  return `${_padZero(hours)}:${_padZero(minutes)}`;
}

export function convertHourStringToMinutes(hourString: string): number {
  const [hours, minutes] = hourString.split(":").map(Number);

  return hours * 60 + minutes;
}

/* -------------------------------------------------------------------------- */
/*                                   helpers                                  */
/* -------------------------------------------------------------------------- */
function _padZero(num: number): string {
  return String(num).padStart(2, "0");
}
