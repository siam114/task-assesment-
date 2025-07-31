export const formatDate = (date: Date | string) => {
  date = new Date(date);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const formatTime = (date: Date | string) => {
  date = new Date(date);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    // hour12: true
  };
  // const formattedTime = date.toLocaleDateString('en-US', options);
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedTime;
};
