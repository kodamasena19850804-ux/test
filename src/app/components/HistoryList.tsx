import { Card } from "./ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface HistoryItem {
  id: string;
  type: "earned" | "spent" | "cancelled";
  title: string;
  points: number;
  date: Date;
  emoji: string;
}

interface HistoryListProps {
  history: HistoryItem[];
}

export function HistoryList({ history }: HistoryListProps) {
  const sortedHistory = [...history].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "さっき";
    if (hours < 24) return `${hours}時間前`;
    if (days === 1) return "昨日";
    if (days < 7) return `${days}日前`;
    return date.toLocaleDateString("ja-JP");
  };

  return (
    <div className="p-4 pb-20">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>ポイントのきろく</span>
        <span className="text-2xl">📊</span>
      </h2>
      {sortedHistory.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">まだきろくがありません</p>
          <p className="text-sm text-gray-400 mt-2">
            おてつだいをしてポイントをためよう！
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedHistory.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 font-bold ${
                    item.type === "earned" ? "text-green-600" : "text-purple-600"
                  }`}
                >
                  {item.type === "earned" ? (
                    <TrendingUp className="size-4" />
                  ) : (
                    <TrendingDown className="size-4" />
                  )}
                  <span>
                    {item.type === "earned" ? "+" : "-"}
                    {item.points}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}