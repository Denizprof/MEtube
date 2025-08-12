import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import SearchResults from './pages/SearchResults';
import Channel from './pages/Channel';
import { SidebarProvider } from './context/SidebarContext';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="youtube-theme">
      <SidebarProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/watch" element={<VideoPlayer />} />
                  <Route path="/results" element={<SearchResults />} />
                  <Route path="/channel/:channelId" element={<Channel />} />
                </Routes>
              </main>
            </div>
            <Toaster />
          </div>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;