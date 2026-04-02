import { Button } from "./ui/button";
import { Heart } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-white text-8xl">💝</div>
        <div className="absolute bottom-10 right-10 text-white text-8xl">🎀</div>
        <div className="absolute top-1/2 left-1/4 text-white text-6xl">✨</div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            パパ、いつもありがとう！ 💕
          </h2>
          <p className="text-lg md:text-xl text-pink-50 mb-8 leading-relaxed">
            パパがいてくれるから、まいにちが楽しいよ。
            これからもずっとずっといっしょにいてね！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-xl px-12 py-8 bg-white text-pink-600 hover:bg-pink-50 shadow-2xl hover:shadow-white/50 font-bold transition-all hover:scale-110 animate-bounce hover:animate-none"
            >
              パパだいすき！
              <Heart className="ml-2 size-7 fill-pink-600" />
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl mb-2">∞</div>
              <div className="text-pink-50 font-medium">パパがすき</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl mb-2">100%</div>
              <div className="text-pink-50 font-medium">せかいいち</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl mb-2">💖</div>
              <div className="text-pink-50 font-medium">ありがとう</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}