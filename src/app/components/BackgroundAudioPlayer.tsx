"use client"

import type React from "react"
import { useState, useRef } from "react"
// [TAMBAH] Impor ikon 'Music'
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface BackgroundAudioPlayerProps {
  src: string
}

export default function BackgroundAudioPlayer({ src }: BackgroundAudioPlayerProps) {
  // State untuk play/pause, mute, dan volume
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)

  const audioRef = useRef<HTMLAudioElement>(null)

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

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />

      <div className="fixed bottom-4 right-4 z-40">
        {/* [UBAH] Glow effect sekarang beranimasi RGB terus-menerus */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl -z-10 animate-rgb-border
          ${
            // Efek 'bernapas' (pulse) tetap ada saat 'isPlaying'
            isPlaying ? "scale-105 opacity-80" : "scale-95 opacity-50"
          } 
          transition-all duration-1000`}
        ></div>

        {/* [UBAH] Kotak pemutar utama juga diberi animasi 'animate-rgb-border' */}
        <div className="relative p-1.5 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl text-white shadow-2xl border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 animate-rgb-border">
          

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="p-1.5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:scale-110 active:scale-95"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:text-cyan-300"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Volume Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={`w-16 h-1.5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full appearance-none accent-cyan-400 cursor-pointer hover:accent-cyan-300 transition-all ${
                isMuted ? "opacity-50" : ""
              }`}
            />

            {/* Volume percentage */}
            <span
              className={`text-[0.6rem] text-cyan-300/70 w-7 text-right transition-all ${
                isMuted ? "opacity-50" : ""
              }`}
            >
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Animated border glow (efek hover ini tidak perlu diubah) */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      {/* [UBAH] CSS untuk animasi 'rgb-border' baru (lebih lambat) */}
      <style jsx global>{`
        @keyframes rgb-border {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
        .animate-rgb-border {
          /* Animasi berputar 6 detik, linear, dan tak terbatas */
          animation: rgb-border 6s linear infinite;
        }
      `}</style>
    </>
  )
}