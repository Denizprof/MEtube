import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Filter } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search_query') || '';
  const [filteredVideos, setFilteredVideos] = useState([]);
  
  useEffect(() => {
    if (query) {
      const results = mockVideos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channel.name.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVideos(results);
    }
  }, [query]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            About {filteredVideos.length} results for "{query}"
          </p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No results found</h2>
          <p className="text-muted-foreground">
            Try different keywords or remove search filters
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;