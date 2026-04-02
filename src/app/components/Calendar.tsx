import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { HistoryItem } from "./HistoryList";

interface CalendarProps {
  history: HistoryItem[];
  specialRewardCount: number;
  specialRewardDates: string[];
  onClaimSpecialReward: () => void;
  onUpdateSpecialRewardCount: (count: number) => void;
  onUpdateSpecialRewardDates: (dates: string[]) => void;
}

export function Calendar({ 
  history, 
  specialRewardCount, 
  specialRewardDates,
  onClaimSpecialReward,
  onUpdateSpecialRewardCount,
  onUpdateSpecialRewardDates
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calculate points earned per day
  const getPointsForDate = (date: number) => {
    const targetDate = new Date(year, month, date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    let earned = 0;
    let spent = 0;

    history.forEach((item) => {
      const itemDate = new Date(item.date);
      if (itemDate >= startOfDay && itemDate <= endOfDay) {
        if (item.type === "earned") {
          earned += item.points;
        } else if (item.type === "cancelled") {
          earned -= item.points;
        } else if (item.type === "spent") {
          spent += item.points;
        }
      }
    });

    return { earned, spent, net: earned - spent };
  };

  // Check if a date has a 💮 (80+ points)
  const hasSpecialReward = (date: number) => {
    const dateStr = `${year}-${month + 1}-${date}`;
    return specialRewardDates.includes(dateStr);
  };

  // Update special reward dates based on daily points
  useEffect(() => {
    const newDates: string[] = [];
    for (let date = 1; date <= daysInMonth; date++) {
      const { earned } = getPointsForDate(date);
      const dateStr = `${year}-${month + 1}-${date}`;
      if (earned >= 80) {
        newDates.push(dateStr);
      }
    }
    
    // Update only if changed
    const currentMonthDates = specialRewardDates.filter(d => {
      const [y, m] = d.split('-').map(Number);
      return y === year && m === month + 1;
    });
    
    const otherMonthDates = specialRewardDates.filter(d => {
      const [y, m] = d.split('-').map(Number);
      return y !== year || m !== month + 1;
    });
    
    const combinedDates = [...otherMonthDates, ...newDates];
    
    if (JSON.stringify(currentMonthDates.sort()) !== JSON.stringify(newDates.sort())) {
      onUpdateSpecialRewardDates(combinedDates);
      onUpdateSpecialRewardCount(combinedDates.length % 5);
    }
  }, [history, year, month, daysInMonth]);

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  const getColorClass = (points: number) => {
    if (points === 0) return "bg-gray-50";
    if (points < 20) return "bg-green-100";
    if (points < 40) return "bg-green-200";
    if (points < 60) return "bg-green-300";
    return "bg-green-400";
  };

  // Check if special reward is available (5 💮 collected)
  const isSpecialRewardAvailable = specialRewardDates.length % 5 === 0 && specialRewardDates.length > 0;

  const handleSpecialRewardClick = () => {
    if (isSpecialRewardAvailable) {
      onClaimSpecialReward();
    }
  };

  return (
    <div className="p-4 pb-20">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevMonth}
            className="hover:bg-pink-100"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <h2 className="text-xl font-bold text-gray-900">
            {year}年 {month + 1}月
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            className="hover:bg-pink-100"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`text-center text-xs font-semibold py-2 ${
                index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : "text-gray-600"
              }`}
            >
              {day}
            </div>
          ))}

          {Array.from({ length: startDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const date = index + 1;
            const { earned, spent } = getPointsForDate(date);
            const isToday =
              new Date().getDate() === date &&
              new Date().getMonth() === month &&
              new Date().getFullYear() === year;
            const hasReward = hasSpecialReward(date);

            return (
              <div
                key={date}
                className={`aspect-square border rounded-lg p-1 flex flex-col items-center justify-center text-xs ${
                  isToday
                    ? "border-pink-500 border-2 bg-pink-50"
                    : "border-gray-200"
                } ${getColorClass(earned)}`}
              >
                <div
                  className={`font-semibold mb-1 ${
                    isToday ? "text-pink-600" : "text-gray-700"
                  }`}
                >
                  {date}
                  {hasReward && <span className="ml-0.5">💮</span>}
                </div>
                {earned > 0 && (
                  <div className="flex items-center gap-0.5 bg-white/80 px-1 rounded">
                    <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-bold text-green-600">
                      +{earned}
                    </span>
                  </div>
                )}
                {spent > 0 && (
                  <div className="text-[10px] text-purple-600 font-semibold bg-white/80 px-1 rounded mt-0.5">
                    -{spent}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            今月のせいせき 📊
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="text-xs text-gray-600 mb-1">かせいだポイント</div>
              <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                {history
                  .filter(
                    (item) =>
                      new Date(item.date).getMonth() === month &&
                      new Date(item.date).getFullYear() === year
                  )
                  .reduce((sum, item) => {
                    if (item.type === "earned") {
                      return sum + item.points;
                    } else if (item.type === "cancelled") {
                      return sum - item.points;
                    }
                    return sum;
                  }, 0)}
              </div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="text-xs text-gray-600 mb-1">つかったポイント</div>
              <div className="text-2xl font-bold text-purple-600">
                {history
                  .filter(
                    (item) =>
                      item.type === "spent" &&
                      new Date(item.date).getMonth() === month &&
                      new Date(item.date).getFullYear() === year
                  )
                  .reduce((sum, item) => sum + item.points, 0)}
              </div>
            </Card>
          </div>

          {/* 特別ごほうび */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              とくべつごほうび 🎁
            </h3>
            <Card 
              className={`p-3 border-2 transition-all duration-300 cursor-pointer ${
                isSpecialRewardAvailable 
                  ? "bg-gradient-to-br from-red-50 to-red-100 border-red-400 hover:shadow-lg" 
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={handleSpecialRewardClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📺</span>
                  <div>
                    <div className={`text-sm font-bold ${
                      isSpecialRewardAvailable ? "text-red-600" : "text-gray-500"
                    }`}>
                      1時間テレビ見る
                    </div>
                    <div className="text-xs text-gray-600">
                      💮を5こあつめよう！
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl">
                    {Array.from({ length: specialRewardDates.length % 5 }).map((_, i) => (
                      <span key={i}>💮</span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {specialRewardDates.length % 5} / 5
                  </div>
                </div>
              </div>
            </Card>
            <div className="mt-2 text-xs text-gray-600 bg-blue-50 p-2 rounded">
              ℹ️ 1日に80ポイントいじょうかせぐと💮がもらえるよ！
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs">
            <span className="text-gray-600">ポイントの色:</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-100 border border-gray-300 rounded"></div>
              <span className="text-gray-500">すこし</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-300 border border-gray-300 rounded"></div>
              <span className="text-gray-500">たくさん</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-400 border border-gray-300 rounded"></div>
              <span className="text-gray-500">すごい！</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
