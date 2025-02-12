// Utility functions
// export const formatTimestamp = (timestamp) => {
//   if (!timestamp) return "";
//   const diff = Math.floor((new Date() - new Date(timestamp)) / 1000);
//   if (diff < 60) return "Maintenant";
//   if (diff < 3600) return `il y a ${Math.floor(diff / 60)}h`;
//   if (diff < 86400) return `il y a ${Math.floor(diff / 3600)}h`;
//   return `${Math.floor(diff / 86400)}d ago`;
// };

export const renderContentWithLinks = (content) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="post-link"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export const isYouTubeLink = (url) => {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
};
