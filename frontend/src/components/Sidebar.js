import React from 'react';
import { Home, TrendingUp, UserCheck, Library, History, Video, Clock, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { useSidebar } from '../context/SidebarContext';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarItems = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Trending', icon: TrendingUp, path: '/trending' },
  { name: 'Subscriptions', icon: UserCheck, path: '/subscriptions' },
  { name: 'Library', icon: Library, path: '/library' },
  { name: 'History', icon: History, path: '/history' },
  { name: 'Your videos', icon: Video, path: '/videos' },
  { name: 'Watch later', icon: Clock, path: '/watchlater' },
  { name: 'Liked videos', icon: ThumbsUp, path: '/liked' }
];

const Sidebar = () => {
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  if (isCollapsed) {
    return (
      <aside className="hidden md:flex w-20 flex-col py-4 bg-background border-r border-border">
        {sidebarItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.name}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-16 rounded-none hover:bg-accent ${
                isActive ? 'bg-accent' : ''
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
            </Button>
          );
        })}
      </aside>
    );
  }

  return (
    <aside className="hidden md:flex w-60 flex-col py-4 bg-background border-r border-border">
      <div className="px-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full justify-start gap-6 py-2 px-3 hover:bg-accent ${
                isActive ? 'bg-accent' : ''
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border px-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2 px-3">
          Subscriptions
        </h3>
        <div className="space-y-1">
          {['Tech Channel', 'Music World', 'Gaming Hub'].map((channel) => (
            <Button
              key={channel}
              variant="ghost"
              className="w-full justify-start gap-3 py-2 px-3 hover:bg-accent"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <span className="truncate">{channel}</span>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;