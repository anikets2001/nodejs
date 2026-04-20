export function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Format Date -> October 26, 2024
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format Time -> 14:32 PM (your custom format)
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  // Keep 24-hour format but still show AM/PM (as per your example)
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}