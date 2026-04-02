import { Card } from "./ui/card";
import { ChefHat, Gamepad2, Book, Car, Music, Smile } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "おりょうりがとくい",
    description: "パパのオムライスは世界一！ホットケーキもふわふわでおいしいよ🥞",
    emoji: "👨‍🍳",
  },
  {
    icon: Gamepad2,
    title: "いっぱいあそんでくれる",
    description: "こうえんでおにごっこしたり、ゲームをいっしょにしたり。いつも楽しい！🎮",
    emoji: "🎪",
  },
  {
    icon: Book,
    title: "えほんをよんでくれる",
    description: "ねるまえにおもしろいこえでえほんをよんでくれるよ📚",
    emoji: "📖",
  },
  {
    icon: Car,
    title: "どこでもつれてってくれる",
    description: "どうぶつえんや水族館、いろんなところにドライブ🚗",
    emoji: "🎡",
  },
  {
    icon: Music,
    title: "うたがじょうず",
    description: "おふろでいっしょにうたをうたうと、とっても楽しいよ🎵",
    emoji: "🎤",
  },
  {
    icon: Smile,
    title: "いつもえがお",
    description: "パパのえがおをみると、わたしもげんきになれる😊",
    emoji: "💗",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            パパのできること 🌈
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            パパはいろんなことができるよ！ぜんぶ大好き💕
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 bg-white border-2 border-pink-100"
            >
              <div className="text-5xl mb-4 text-center">{feature.emoji}</div>
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="size-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}