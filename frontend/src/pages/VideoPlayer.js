import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, Bell, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Textarea } from '../components/ui/textarea';
import VideoCard from '../components/VideoCard';
import { mockVideos, mockComments } from '../data/mockData';

const VideoPlayer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoId = searchParams.get('v');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const currentVideo = mockVideos.find(v => v.id === videoId) || mockVideos[0];
  const relatedVideos = mockVideos.filter(v => v.id !== currentVideo.id).slice(0, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  const handleChannelClick = () => {
    navigate(`/channel/${currentVideo.channel.id}`);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main video section */}
        <div className="flex-1">
          {/* Video player */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={currentVideo.title}
            />
          </div>

          {/* Video title */}
          <h1 className="text-xl font-semibold mb-4 leading-tight">
            {currentVideo.title}
          </h1>

          {/* Channel info and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={currentVideo.channel.avatar}
                alt={currentVideo.channel.name}
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
                onClick={handleChannelClick}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 
                    className="font-medium cursor-pointer hover:text-blue-600"
                    onClick={handleChannelClick}
                  >
                    {currentVideo.channel.name}
                  </h3>
                  <CheckCircle className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentVideo.channel.subscribers}
                </p>
              </div>
              <Button
                onClick={handleSubscribe}
                className={`px-6 ${
                  isSubscribed 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                <Bell className={`w-4 h-4 mr-2 ${isSubscribed ? 'fill-current' : ''}`} />
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-secondary rounded-full">
                <Button variant="ghost" size="sm" className="rounded-l-full px-4">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  1.2K
                </Button>
                <Separator orientation="vertical" className="h-6 my-auto" />
                <Button variant="ghost" size="sm" className="rounded-r-full px-4">
                  <ThumbsDown className="w-4 h-4" />
                </Button>
              </div>
              
              <Button variant="secondary" size="sm" className="rounded-full px-4">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button variant="secondary" size="sm" className="rounded-full px-4">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              
              <Button variant="ghost" size="sm" className="rounded-full">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Video description */}
          <div className="bg-secondary rounded-lg p-4 mb-8">
            <div className="flex items-center gap-4 mb-2 text-sm font-medium">
              <span>{currentVideo.views}</span>
              <span>{currentVideo.uploadTime}</span>
            </div>
            <div className={`text-sm ${showFullDescription ? '' : 'line-clamp-3'}`}>
              {currentVideo.description}
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 p-0 text-sm font-medium"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Show less' : 'Show more'}
            </Button>
          </div>

          {/* Comments section */}
          <div className="space-y-6">
            <div className="flex items-center gap-8">
              <h2 className="text-lg font-medium">{mockComments.length} Comments</h2>
            </div>

            {/* Add comment */}
            <div className="flex gap-4">
              <img
                src="https://github.com/shadcn.png"
                alt="Your avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border-0 border-b border-border rounded-none resize-none focus:ring-0 focus:border-blue-500"
                  rows={1}
                />
                {commentText && (
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm" onClick={() => setCommentText('')}>
                      Cancel
                    </Button>
                    <Button size="sm">Comment</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-6">
              {mockComments.map((comment) => (
                <div key={comment.id} className="space-y-3">
                  <div className="flex gap-4">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mb-2">{comment.comment}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="p-0">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0">
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm p-0">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="ml-14 flex gap-4">
                      <img
                        src={reply.avatar}
                        alt={reply.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{reply.user}</span>
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="text-sm mb-2">{reply.comment}</p>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="p-0">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {reply.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="p-0">
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar with related videos */}
        <div className="lg:w-96 space-y-3">
          <h2 className="font-medium mb-4">Related Videos</h2>
          {relatedVideos.map((video) => (
            <VideoCard key={video.id} video={video} layout="list" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;