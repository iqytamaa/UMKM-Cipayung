"useclient"

import{useState,useEffect}from"react"

export default function CustomPointer() {
const [position,setPosition] = useState({ x: -100, y: -100 })

useEffect(() => {
const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
}

window.addEventListener("mousemove", handleMouseMove)

return () => {
      window.removeEventListener("mousemove", handleMouseMove)
}
}, [])

return (
<div
      className="hidden md:block fixed w-8 h-8 rounded-full border-2 border-blue-400 pointer-events-none"
      style={{
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
      }}
>
      <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse pointer-events-none"></div>
</div>
)
}