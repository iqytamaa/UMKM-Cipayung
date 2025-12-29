"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom" 
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface BackgroundAudioPlayerProps {
  src: string
}

export default function BackgroundAudioPlayer({ src }: BackgroundAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [mounted, setMounted] = useState(false) 

  useEffect(() => {
    setMounted(true) 
    
    const audio = audioRef.current
    if (audio) {
        audio.volume = volume;
        
        const playPromise = audio.play()
        if (playPromise !== undefined) {
            playPromise
            .then(() => {
                setIsPlaying(true)
            })
            .catch((error) => {
                console.log("Autoplay dicegah browser:", error)
                setIsPlaying(false)
            })
        }
    }
  }, [volume])

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => console.log("Audio play failed:", error))
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return

    const newVolume = Number.parseFloat(e.target.value)
    audioRef.current.volume = newVolume
    setVolume(newVolume)

    if (newVolume > 0 && isMuted) {
      audioRef.current.muted = false
      setIsMuted(false)
    }
    if (newVolume === 0 && !isMuted) {
      audioRef.current.muted = true
      setIsMuted(true)
    }
  }

  if (!mounted) return null;

  const playerContent = (
    <div className="fixed bottom-6 right-6 z-[9999] animate-fade-in-up">
      {/* Audio Element (Hidden) */}
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />

      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl -z-10 animate-rgb-border
        ${isPlaying ? "scale-110 opacity-80" : "scale-95 opacity-40"} 
        transition-all duration-1000`}
      ></div>

      {/* Main Player Box (Full Width Always) */}
      <div className="relative flex items-center gap-3 p-2 pl-3 pr-4 bg-slate-900/90 backdrop-blur-md rounded-full border border-cyan-500/30 shadow-2xl transition-all hover:bg-slate-800/90">
        
        {/* Tombol Play/Pause */}
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Divider Kecil */}
        <div className="w-px h-6 bg-white/10 mx-1"></div>

        {/* Kontrol Volume & Mute (Selalu Terlihat) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>

      {/* CSS Lokal */}
      <style jsx>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            animation-delay: 1s;
        }
        @keyframes rgb-border {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .animate-rgb-border {
          animation: rgb-border 6s linear infinite;
        }
      `}</style>
    </div>
  );

  return createPortal(playerContent, document.body);
}