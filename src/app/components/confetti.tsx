"use client"

import { useEffect, useState } from "react"

interface Confetti {
id: number
left: number
delay: number
duration: number
rotation: number
color: string
}

export default function Confetti() {
const [confetti, setConfetti] = useState<Confetti[]>([])

useEffect(() => {
// Generate random confetti pieces
const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
    rotation: Math.random() * 360,
    color: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6348", "#FF94E1"][Math.floor(Math.random() * 6)],
}))

setConfetti(confettiPieces)

const timer = setTimeout(() => {
    setConfetti([])
}, 3500)

return () => clearTimeout(timer)
}, [])

return (
<>
    {confetti.map((piece) => (
    <div
        key={piece.id}
        className="fixed pointer-events-none"
        style={{
        left: `${piece.left}%`,
        top: "-10px",
        animation: `fall ${piece.duration}s linear ${piece.delay}s forwards`,
        }}
    >
        <div
        style={{
            width: "12px",
            height: "12px",
            backgroundColor: piece.color,
            borderRadius: "50%",
            transform: `rotate(${piece.rotation}deg)`,
            animation: `spin 0.5s linear infinite`,
        }}
        />
    </div>
    ))}

    <style jsx>{`
    @keyframes fall {
        to {
        transform: translateY(100vh) rotateZ(360deg);
        opacity: 0;
        }
    }
    @keyframes spin {
        from {
        transform: rotateZ(0deg);
        }
        to {
        transform: rotateZ(360deg);
        }
    }
    `}</style>
</>
)
}
