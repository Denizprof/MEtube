import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const VideoCard = ({ video, layout = 'grid' }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/watch?v=${video.id}`);
  };

  const handleChannelClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${video.channel.id}`);
  };

  if (layout === 'list') {
    return (
      <div 
        className="flex gap-4 p-2 hover:bg-accent rounded-lg cursor-pointer transition-colors"
        onClick={handleVideoClick}
      >
        <div className="relative flex-shrink-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-40 h-24 object-cover rounded-lg"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-1 line-clamp-2 leading-tight">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 mb-1">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-4 h-4 rounded-full cursor-pointer"
              onClick={handleChannelClick}
            />
            <span 
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={handleChannelClick}
            >
              {video.channel.name}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {video.views} • {video.uploadTime}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={handleVideoClick}
    >
      <div className="relative mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      
      <div className="flex gap-3">
        <img
          src={video.channel.avatar}
          alt={video.channel.name}
          className="w-9 h-9 rounded-full cursor-pointer hover:opacity-80"
          onClick={handleChannelClick}
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-1 line-clamp-2 leading-tight group-hover:text-blue-600">
            {video.title}
          </h3>
          <p 
            className="text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-1"
            onClick={handleChannelClick}
          >
            {video.channel.name}
          </p>
          <div className="text-sm text-muted-foreground">
            {video.views} • {video.uploadTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;