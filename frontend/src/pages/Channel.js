import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bell, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';

const Channel = () => {
  const { channelId } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Find channel info from first video of that channel
  const channelVideos = mockVideos.filter(v => v.channel.id === channelId);
  const channelInfo = channelVideos[0]?.channel;

  if (!channelInfo) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">Channel not found</h2>
      </div>
    );
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Channel banner */}
      <div className="relative h-32 md:h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-lg"></div>
      
      {/* Channel info */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <img
            src={channelInfo.avatar}
            alt={channelInfo.name}
            className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-background -mt-12 md:-mt-16"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{channelInfo.name}</h1>
              <CheckCircle className="w-6 h-6 text-gray-500" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-muted-foreground mb-4">
              <span>{channelInfo.subscribers}</span>
              <span className="hidden md:inline">•</span>
              <span>{channelVideos.length} videos</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
              Welcome to {channelInfo.name}'s official channel! Here you'll find the best music, 
              entertainment, and exclusive content. Subscribe and ring the bell to never miss an upload!
            </p>
            
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
        </div>

        {/* Channel tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {channelVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="shorts" className="mt-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No shorts available</p>
            </div>
          </TabsContent>
          
          <TabsContent value="playlists" className="mt-8">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No playlists available</p>
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="mt-8">
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">
                  This is the official YouTube channel for {channelInfo.name}. 
                  Join us for amazing content, music, and entertainment!
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Stats</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Joined: January 1, 2015</p>
                  <p>{channelVideos.length} videos</p>
                  <p>{channelInfo.subscribers}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Channel;