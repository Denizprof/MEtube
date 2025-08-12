import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';
import { Button } from '../components/ui/button';

const categories = [
  'All', 'Music', 'Gaming', 'Sports', 'News', 'Movies', 'Live', 'Fashion', 'Learning', 'Technology'
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredVideos = selectedCategory === 'All' 
    ? mockVideos 
    : mockVideos.filter(video => 
        video.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        video.channel.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <div className="p-6">
      {/* Category filters */}
      <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            className={`whitespace-nowrap transition-colors ${
              selectedCategory === category 
                ? 'bg-foreground text-background hover:bg-foreground/90' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Load more section */}
      <div className="flex justify-center mt-12">
        <Button variant="outline" size="lg" className="px-8">
          Load More Videos
        </Button>
      </div>
    </div>
  );
};

export default Home;