import moment from "moment";

function timeAgo(date) {
  const duration = moment.duration(moment().diff(date));
  const years = duration.years();
  const months = duration.months();
  const weeks = duration.weeks();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
}

export const fromWhen = (date) => {
  return timeAgo(moment(date));
};
