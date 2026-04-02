import { Button } from "./ui/button";
import { Heart, Sparkles } from "lucide-react";
import heroImage from "figma:asset/29ee41ad067b8d11ccd1513394e9dd1a7e6b0b3e.png";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-pink-50 via-purple-50 to-white py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-yellow-300 text-6xl">✨</div>
        <div className="absolute top-20 right-20 text-pink-300 text-5xl">💕</div>
        <div className="absolute bottom-20 left-1/4 text-purple-300 text-4xl">🌟</div>
        <div className="absolute top-1/3 right-10 text-pink-300 text-5xl">💖</div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-pink-200 text-pink-800 px-4 py-2 rounded-full mb-6">
              <Sparkles className="size-4" />
              <span className="font-semibold">世界一のパパ</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              わたしたちの
              <span className="text-pink-500">だいすきなパパ</span>
              💝
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              いつもやさしくて、おもしろくて、かっこいい！
              そんなパパのすごいところをみんなにしょうかいします✨
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-10 py-7 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-2xl hover:shadow-pink-500/50 animate-pulse hover:animate-none transition-all hover:scale-105 font-bold">
                パパのすごいところ
                <Heart className="ml-2 size-6 fill-white animate-bounce" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={heroImage}
                alt="パパと娘たち"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}