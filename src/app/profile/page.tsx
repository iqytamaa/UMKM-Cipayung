"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { 
  User, 
  Phone, 
  Calendar, 
  Flame, 
  Gift, 
  CheckCircle, 
  Trophy, 
  Sparkles, 
  Star, 
  Zap, 
  Heart 
} from "lucide-react"
import Confetti from "@/app/components/confetti"
// 1. Import Hooks Bahasa
import { useLanguage } from "@/app/context/LanguageContext"

interface Mission {
  id: number
  titleKey: string // Ubah jadi key agar bisa ditranslate
  rewardPoints: number // Simpan angka saja agar fleksibel
  current: number
  target: number
  isClaimed: boolean
}

interface RewardItem {
  id: number
  nameKey: string // Ubah jadi key
  points: number
  available: number
  icon: React.ReactNode
  color: string
}

export default function ProfilePage() {
  // 2. Panggil Hooks Bahasa
  const { t } = useLanguage()

  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // 3. Data Misi menggunakan Key Terjemahan
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      titleKey: "profile_mission_1", // Key dari LanguageContext
      rewardPoints: 50,
      current: 3,
      target: 3,
      isClaimed: false,
    },
    {
      id: 2,
      titleKey: "profile_mission_2",
      rewardPoints: 100,
      current: 0,
      target: 1,
      isClaimed: false,
    },
    {
      id: 3,
      titleKey: "profile_mission_3",
      rewardPoints: 150,
      current: 1,
      target: 1,
      isClaimed: true,
    },
  ])

  // 4. Data Hadiah menggunakan Key Terjemahan
  const [rewards, setRewards] = useState<RewardItem[]>([
    {
      id: 1,
      nameKey: "profile_reward_1",
      points: 500,
      available: 3,
      icon: <Zap className="w-6 h-6" />,
      color: "from-amber-400 to-amber-600",
    },
    {
      id: 2,
      nameKey: "profile_reward_2",
      points: 300,
      available: 5,
      icon: <Gift className="w-6 h-6" />,
      color: "from-pink-400 to-pink-600",
    },
    {
      id: 3,
      nameKey: "profile_reward_3",
      points: 250,
      available: 10,
      icon: <Star className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 4,
      nameKey: "profile_reward_4",
      points: 400,
      available: 2,
      icon: <Heart className="w-6 h-6" />,
      color: "from-rose-400 to-rose-600",
    },
  ])

  const [totalPoints, setTotalPoints] = useState(1250)

  const handleClaim = (id: number, points: number) => {
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, isClaimed: true } : m)))
    setTotalPoints((prev) => prev + points)
    // Translate pesan alert
    alert(`${t('profile_reward_claimed')} ${points} ${t('profile_points')}`)
  }

  const handleClaimReward = (rewardId: number) => {
    setRewards((prev) => prev.map((r) => (r.id === rewardId ? { ...r, available: Math.max(0, r.available - 1) } : r)))

    const reward = rewards.find((r) => r.id === rewardId)
    if (reward) {
      setTotalPoints((prev) => Math.max(0, prev - reward.points))
      // Translate nama hadiah di alert
      alert(`✨ ${t('profile_reward_claimed')} ${t(reward.nameKey)}!`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* === BACKGROUND IMAGE (FULL PAGE) === */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 dark:opacity-80">
        <Image
          src="/Logo/bg.svg" 
          alt="Background Pattern"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      {/* Overlay gradient halus */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/80 via-white/50 to-white/80 dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-950/90 pointer-events-none"></div>

      {/* Dekorasi Blob */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

      {showConfetti && <Confetti />}

      <div className="max-w-6xl mx-auto space-y-8 space-x-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between mb-8">
          <div className="ml-4 md:ml-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {/* Translate Judul */}
              {t('profile_title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {/* Translate Subjudul */}
              {t('profile_welcome')}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-amber-400 dark:from-yellow-600 dark:to-amber-700 px-6 py-3 rounded-full border-2 border-yellow-500 dark:border-yellow-600 shadow-lg transform hover:scale-105 transition-transform">
            <Trophy className="w-6 h-6 text-yellow-900 dark:text-yellow-100 animate-bounce" />
            <span className="font-bold text-yellow-900 dark:text-yellow-100 text-lg">
              {totalPoints} {t('profile_points')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* === KOLOM KIRI: BIODATA USER === */}
          <div className="lg:col-span-1 space-y-6">
            {/* Kartu Profil */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 p-0 relative overflow-hidden group">
              
              {/* Header Kartu Profil */}
              <div className="absolute top-0 left-0 w-full h-32 z-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:from-blue-600 group-hover:to-pink-600 transition-all duration-500"></div>

              <div className="relative z-10 flex flex-col items-center mt-16 p-8 pt-0">
                {/* FOTO PROFIL */}
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                   <Image 
                        src="/Home/man-shop-owner.jpg" 
                        alt="Foto Profil Rizqy Ramadhan" 
                        fill 
                        className="object-cover"
                        sizes="128px"
                   />
                </div>
                
                <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white text-center">Rizqy Ramadhan</h2>
                <span className="px-4 py-1.5 mt-2 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-md">
                  ⭐ {t('profile_status_customer')}
                </span>
              </div>

              <div className="px-8 pb-8 space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:shadow-md transition-shadow border border-gray-100 dark:border-slate-600">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('profile_bio_gender')}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t('profile_gender_male')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:shadow-md transition-shadow border border-gray-100 dark:border-slate-600">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('profile_bio_age')}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">25</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:shadow-md transition-shadow border border-gray-100 dark:border-slate-600">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('profile_bio_phone')}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">0812-3456-7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === KOLOM KANAN: GAMIFIKASI & HADIAH === */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. DAILY LOGIN SECTION */}
            <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-56 h-56 bg-white opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black flex items-center gap-3">
                      <Flame className="w-10 h-10 text-yellow-200 animate-pulse drop-shadow-lg" fill="currentColor" />
                      {t('profile_daily_login')}
                    </h3>
                    <p className="text-orange-100 text-sm mt-2 font-medium">
                      {t('profile_login_desc')} 🔥
                    </p>
                  </div>
                  <div className="text-right bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                    <span className="block text-4xl font-black drop-shadow-lg">5</span>
                    <span className="text-xs text-orange-100 font-bold uppercase tracking-widest">{t('profile_streak')}</span>
                  </div>
                </div>

                {/* Indikator Hari */}
                <div className="flex justify-between items-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, index) => {
                    const status = index < 4 ? "past" : index === 4 ? "today" : "future"

                    return (
                      <div key={day} className="flex flex-col items-center gap-2">
                        <span className="text-xs font-bold text-orange-100">{day}</span>
                        <div
                          className={`
                          w-10 h-10 rounded-full flex items-center justify-center transition-all font-bold
                          ${status === "past" ? "bg-orange-600/60 text-yellow-200 shadow-lg" : ""}
                          ${status === "today" ? "bg-white text-orange-600 shadow-2xl scale-125 ring-4 ring-yellow-200/50 animate-pulse" : ""}
                          ${status === "future" ? "bg-black/20 text-white/40" : ""}
                        `}
                        >
                          {status === "past" ? "✓" : status === "today" ? "🔥" : "○"}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* 2. MISI HARIAN */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl text-white shadow-lg">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile_missions_title')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {t('profile_missions_desc')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {missions.map((mission) => {
                  const progressPercent = Math.min(100, (mission.current / mission.target) * 100)
                  const isCompleted = mission.current >= mission.target

                  return (
                    <div
                      key={mission.id}
                      className={`border-2 rounded-2xl p-5 transition-all duration-300 group hover:shadow-lg ${
                        isCompleted && !mission.isClaimed
                          ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700"
                          : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4
                            className={`font-bold text-lg ${mission.isClaimed ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-900 dark:text-white"}`}
                          >
                            {/* Translate Judul Misi */}
                            {t(mission.titleKey)}
                          </h4>
                          <div className="flex items-center gap-2 mt-2">
                            <Gift
                              size={16}
                              className={mission.isClaimed ? "text-gray-400" : "text-orange-500 animate-bounce"}
                            />
                            <span
                              className={`text-sm font-black ${mission.isClaimed ? "text-gray-400" : "text-orange-600 dark:text-orange-400"}`}
                            >
                              +{mission.rewardPoints} {t('profile_points')}
                            </span>
                          </div>
                        </div>
                        
                        {/* Tombol Aksi */}
                        {mission.isClaimed ? (
                          <button
                            disabled
                            className="px-5 py-2 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl cursor-default flex items-center gap-2 shadow-sm"
                          >
                            <CheckCircle size={16} /> {t('profile_btn_claimed')}
                          </button>
                        ) : isCompleted ? (
                          <button
                            onClick={() => handleClaim(mission.id, mission.rewardPoints)}
                            className="px-5 py-2 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center gap-2 animate-pulse"
                          >
                            <Gift size={16} /> {t('profile_btn_claim')}!
                          </button>
                        ) : (
                          <div className="px-5 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl">
                            {mission.current}/{mission.target}
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden border border-gray-300 dark:border-slate-600">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            mission.isClaimed
                              ? "bg-gray-400"
                              : isCompleted
                                ? "bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg"
                                : "bg-gradient-to-r from-blue-400 to-purple-600"
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl text-white shadow-lg animate-bounce">
                  <Star size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile_rewards_title')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {t('profile_rewards_desc')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`bg-gradient-to-br ${reward.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden group ${reward.available === 0 ? "opacity-60" : ""}`}
                  >
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">{reward.icon}</div>
                        <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold">
                          {t('profile_reward_remaining')}: {reward.available}
                        </span>
                      </div>

                      {/* Translate Nama Hadiah */}
                      <h4 className="text-lg font-bold mb-2">{t(reward.nameKey)}</h4>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trophy size={18} />
                          <span className="text-sm font-bold">{reward.points} {t('profile_points')}</span>
                        </div>

                        <button
                          onClick={() => handleClaimReward(reward.id)}
                          disabled={reward.available === 0 || totalPoints < reward.points}
                          className={`px-4 py-2 rounded-lg font-bold text-xs transition-all transform ${
                            reward.available === 0 || totalPoints < reward.points
                              ? "bg-white/20 text-white/50 cursor-not-allowed"
                              : "bg-white text-gray-900 hover:scale-110 shadow-lg hover:shadow-xl active:scale-95"
                          }`}
                        >
                          {totalPoints < reward.points ? t('profile_btn_short') : t('profile_btn_redeem')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Section */}
              <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700/30 dark:to-slate-700/30 rounded-xl border border-blue-200 dark:border-slate-700">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-bold">💡 {t('profile_tip')}</span> {t('profile_tip_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  )
}