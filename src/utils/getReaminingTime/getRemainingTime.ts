export default function getRemainingTime(dateEnd: Date): string {
  const now = new Date().getTime();
  const end = dateEnd.getTime();
  const timeDiff = end - now;

  if (timeDiff <= 0) {
    return "Deadline has passed";
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

  let resultTime = "";

  if (days > 0) resultTime += `${days}d `;
  if (hours > 0) resultTime += `${hours}h `;
  if (minutes > 0) resultTime += `${minutes}m `;

  return resultTime.trim() || "Less than a minute remaining";
}

