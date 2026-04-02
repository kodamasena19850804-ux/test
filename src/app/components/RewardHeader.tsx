import { Star, Gift, Heart } from "lucide-react";
import myMelodyImage from "figma:asset/97aa099cbd941f2870420c6eef465f7abdc0ff15.png";

interface RewardHeaderProps {
  points: number;
  userName: string;
}

export function RewardHeader({ points, userName }: RewardHeaderProps) {
  // レインボー色の配列
  const rainbowColors = [
    '#ff0000', // 赤
    '#ff7f00', // オレンジ
    '#ffff00', // 黄色
    '#00ff00', // 緑
    '#0000ff', // 青
    '#4b0082', // 藍
    '#9400d3', // 紫
    '#ff69b4', // ピンク
    '#ffd700', // ゴールド
    '#ffffff', // 白
  ];

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
      {/* ラメアニメーション（多め + レインボー） */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="sparkle-container">
          {Array.from({ length: 80 }).map((_, i) => {
            const color = rainbowColors[i % rainbowColors.length];
            return (
              <div
                key={i}
                className="sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1.5 + Math.random() * 2.5}s`,
                  background: `radial-gradient(circle, ${color}, transparent)`,
                  boxShadow: `0 0 8px ${color}, 0 0 15px ${color}`,
                  width: `${3 + Math.random() * 5}px`,
                  height: `${3 + Math.random() * 5}px`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* マイメロディ背景画像（より目立つ） */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${myMelodyImage})` }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">おつかれさま！</p>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {/* 目立つハート */}
              <span className="relative inline-block">
                <Heart className="size-9 fill-pink-200 text-pink-200 animate-pulse absolute -top-1 -left-1" />
                <Heart className="size-9 fill-red-400 text-red-400 animate-heartbeat" />
              </span>
              {userName}ちゃん
            </h1>
          </div>
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm animate-bounce-slow">
            <Gift className="size-8" />
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="size-6 fill-yellow-300 text-yellow-300 animate-spin-slow" />
              <span className="text-lg font-medium">ポイント</span>
            </div>
            <div className="text-4xl font-bold animate-scale-in">{points}</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1) translateY(-10px);
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.15);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .sparkle {
          position: absolute;
          border-radius: 50%;
          animation: sparkle 3s infinite;
          filter: blur(1px);
        }

        .sparkle-container {
          position: absolute;
          inset: 0;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}