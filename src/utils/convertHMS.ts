function convertHMS(duration: string) {
  const dur = Number(duration);
  const h = Math.floor(dur / 3600);
  const m = Math.floor((dur % 3600) / 60);
  const s = Math.floor((dur % 3600) % 60);

  const hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";
  return hDisplay + mDisplay;
}

export default convertHMS;
