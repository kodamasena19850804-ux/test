import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-pink-100 to-purple-100 text-gray-700 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="size-8 text-pink-500 fill-pink-500" />
            <div className="text-3xl font-bold text-pink-600">パパ自慢サイト</div>
            <Heart className="size-8 text-pink-500 fill-pink-500" />
          </div>
          <p className="text-gray-700 font-medium text-lg">
            むすめたちより 💕
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-3xl mx-auto">
          <div className="text-center bg-white/50 rounded-xl p-6">
            <div className="text-4xl mb-2">🎂</div>
            <p className="text-sm font-medium text-gray-700">
              パパのたんじょうび<br />おめでとう！
            </p>
          </div>
          <div className="text-center bg-white/50 rounded-xl p-6">
            <div className="text-4xl mb-2">👨‍👧‍👧</div>
            <p className="text-sm font-medium text-gray-700">
              いつもいっしょに<br />いてくれてありがとう
            </p>
          </div>
          <div className="text-center bg-white/50 rounded-xl p-6">
            <div className="text-4xl mb-2">🌟</div>
            <p className="text-sm font-medium text-gray-700">
              パパはわたしたちの<br />ヒーローだよ！
            </p>
          </div>
        </div>
        
        <div className="border-t border-pink-200 pt-8 text-center">
          <p className="text-gray-600 font-medium">
            Made with 💗💗💗 by むすめたち
          </p>
          <p className="text-sm text-gray-500 mt-2">© 2026 パパ、だいすき！</p>
        </div>
      </div>
    </footer>
  );
}