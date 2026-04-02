import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Star, Lock } from "lucide-react";

export interface Reward {
  id: string;
  title: string;
  points: number;
  emoji: string;
  claimed: boolean;
}

interface RewardListProps {
  rewards: Reward[];
  currentPoints: number;
  onClaimReward: (rewardId: string) => void;
}

export function RewardList({
  rewards,
  currentPoints,
  onClaimReward,
}: RewardListProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>ごほうび</span>
        <span className="text-2xl">🎁</span>
      </h2>
      <div className="space-y-3">
        {rewards.map((reward) => {
          const canClaim = currentPoints >= reward.points && !reward.claimed;
          const isLocked = currentPoints < reward.points;

          return (
            <Card
              key={reward.id}
              className={`p-4 transition-all ${
                reward.claimed
                  ? "bg-gray-100 border-gray-300 opacity-60"
                  : isLocked
                  ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
                  : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-md"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-3xl">{reward.emoji}</span>
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        reward.claimed ? "line-through text-gray-500" : "text-gray-900"
                      }`}
                    >
                      {reward.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="size-4 fill-purple-400 text-purple-400" />
                      <span className="text-sm font-semibold text-purple-600">
                        {reward.points}ポイント
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => onClaimReward(reward.id)}
                  disabled={!canClaim}
                  size="sm"
                  className={
                    reward.claimed
                      ? "bg-gray-400"
                      : canClaim
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                      : "bg-gray-300"
                  }
                >
                  {reward.claimed ? (
                    "もらった！"
                  ) : isLocked ? (
                    <>
                      <Lock className="size-4 mr-1" />
                      ロック
                    </>
                  ) : (
                    "もらう！"
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
