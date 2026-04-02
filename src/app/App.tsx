import { useState, useEffect } from "react";
import { RewardHeader } from "./components/RewardHeader";
import { TaskList, Task } from "./components/TaskList";
import { RewardList, Reward } from "./components/RewardList";
import { HistoryList, HistoryItem } from "./components/HistoryList";
import { Calendar } from "./components/Calendar";
import { BottomNav } from "./components/BottomNav";
import { CelebrationEffect } from "./components/CelebrationEffect";
import { CongratulationsEffect } from "./components/CongratulatonsEffect";
import { toast, Toaster } from "sonner";
import myMelodyBg from "figma:asset/7058171fa1546a1efef252b6efcf4d7850b75af8.png";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-94d07ce3`;

const initialTasks: Task[] = [
  { id: "6", title: "※20時まで全部の宿題完了", points: 30, completed: false, emoji: "📚" },
  { id: "1", title: "おへやのおかたづけ", points: 10, completed: false, emoji: "🧹" },
  { id: "2", title: "しょっきあらい", points: 10, completed: false, emoji: "🍽️" },
  { id: "3", title: "せんたくものをたたむ", points: 10, completed: false, emoji: "👕" },
  { id: "4", title: "みおのめんどうをみる", points: 20, completed: false, emoji: "👶" },
  { id: "5", title: "ごみすて", points: 10, completed: false, emoji: "🗑️" },
  { id: "7", title: "先生の話よく聞く", points: 10, completed: false, emoji: "👂" },
  { id: "8", title: "皿洗い", points: 10, completed: false, emoji: "🍽️" },
  { id: "9", title: "妹の面倒見る", points: 10, completed: false, emoji: "👧" },
  { id: "10", title: "一日怒らない", points: 10, completed: false, emoji: "😊" },
  { id: "11", title: "うそついてない", points: 20, completed: false, emoji: "🤝" },
];

const initialRewards: Reward[] = [
  { id: "1", title: "アイスクリーム", points: 50, emoji: "🍦", claimed: false },
  { id: "2", title: "1時間テレビ見る", points: 300, emoji: "📺", claimed: false },
  { id: "3", title: "おもちゃを買う", points: 350, emoji: "🧸", claimed: false },
  { id: "4", title: "筆箱を買う", points: 350, emoji: "✏️", claimed: false },
  { id: "5", title: "自転車を買う", points: 400, emoji: "🚲", claimed: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [points, setPoints] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [specialRewardCount, setSpecialRewardCount] = useState(0);
  const [specialRewardDates, setSpecialRewardDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // API呼び出し関数
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`API Error (${endpoint}):`, errorData);
        throw new Error(errorData.error || "API request failed");
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      toast.error(`エラーが発生しました: ${error}`);
      throw error;
    }
  };

  // 初期データ読み込み
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // 全データを並列で取得
        const [
          tasksData,
          rewardsData,
          pointsData,
          historyData,
          dailyPointsData,
          specialCountData,
        ] = await Promise.all([
          apiCall("/tasks"),
          apiCall("/rewards"),
          apiCall("/points"),
          apiCall("/history"),
          apiCall("/daily-points"),
          apiCall("/special-reward-count"),
        ]);

        // タスクが空なら初期データを設定
        if (tasksData.tasks.length === 0) {
          for (const task of initialTasks) {
            await apiCall("/tasks", {
              method: "POST",
              body: JSON.stringify(task),
            });
          }
          const newTasks = await apiCall("/tasks");
          setTasks(newTasks.tasks);
        } else {
          setTasks(tasksData.tasks);
        }

        // 報酬が空なら初期データを設定
        if (rewardsData.rewards.length === 0) {
          for (const reward of initialRewards) {
            await apiCall("/rewards", {
              method: "POST",
              body: JSON.stringify(reward),
            });
          }
          const newRewards = await apiCall("/rewards");
          setRewards(newRewards.rewards);
        } else {
          setRewards(rewardsData.rewards);
        }

        setPoints(pointsData.points);
        setHistory(historyData.history);
        setSpecialRewardCount(specialCountData.count);

        // 日次ポイントから💮獲得日を抽出
        const dates = dailyPointsData.dailyPoints
          .filter((d: any) => d.points >= 80)
          .map((d: any) => d.date);
        setSpecialRewardDates(dates);

      } catch (error) {
        console.error("Failed to load data:", error);
        toast.error("データの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // タスク完了
  const handleCompleteTask = async (taskId: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      // サーバーでタスクを完了状態に更新
      await apiCall(`/tasks/${taskId}/complete`, { method: "POST" });

      // ポイント更新
      const newPoints = points + task.points;
      await apiCall("/points", {
        method: "POST",
        body: JSON.stringify({ points: newPoints }),
      });

      // 履歴追加
      const historyItem = {
        id: Date.now().toString(),
        type: "earn" as const,
        name: task.title,
        points: task.points,
        date: new Date().toISOString(),
      };
      await apiCall("/history", {
        method: "POST",
        body: JSON.stringify(historyItem),
      });

      // 日次ポイント更新
      const today = new Date().toISOString().split("T")[0];
      const dailyPointsData = await apiCall("/daily-points");
      const todayData = dailyPointsData.dailyPoints.find((d: any) => d.date === today);
      const todayPoints = (todayData?.points || 0) + task.points;

      await apiCall("/daily-points", {
        method: "POST",
        body: JSON.stringify({ date: today, points: todayPoints }),
      });

      // 💮判定
      if (todayPoints >= 80 && !specialRewardDates.includes(today)) {
        setSpecialRewardDates([...specialRewardDates, today]);
        const newCount = specialRewardCount + 1;
        setSpecialRewardCount(newCount);
        await apiCall("/special-reward-count", {
          method: "POST",
          body: JSON.stringify({ count: newCount }),
        });
        toast.success("💮を獲得しました！");
      }

      // UIを更新（タスクを完了状態に変更）
      setPoints(newPoints);
      setHistory([historyItem, ...history]);
      setTasks(tasks.map((t) => 
        t.id === taskId ? { ...t, completed: true } : t
      ));
      setShowCelebration(true);
      toast.success(`${task.points}ポイント獲得！`);

    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  // タスクを未完了に戻す
  const handleUncompleteTask = async (taskId: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      // タスクを未完了に戻す
      await apiCall(`/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({ completed: false }),
      });

      // UIを更新
      setTasks(tasks.map((t) => 
        t.id === taskId ? { ...t, completed: false } : t
      ));
      toast.success("タスクを未完了に戻しました");

    } catch (error) {
      console.error("Failed to uncomplete task:", error);
    }
  };

  // 報酬を獲得
  const handleClaimReward = async (rewardId: string) => {
    try {
      const reward = rewards.find((r) => r.id === rewardId);
      if (!reward || points < reward.points) return;

      // ポイント減算
      const newPoints = points - reward.points;
      await apiCall("/points", {
        method: "POST",
        body: JSON.stringify({ points: newPoints }),
      });

      // 履歴追加
      const historyItem = {
        id: Date.now().toString(),
        type: "spend" as const,
        name: reward.title,
        points: reward.points,
        date: new Date().toISOString(),
      };
      await apiCall("/history", {
        method: "POST",
        body: JSON.stringify(historyItem),
      });

      // UIを更新
      setPoints(newPoints);
      setHistory([historyItem, ...history]);
      setShowCongratulations(true);
      toast.success(`${reward.title}を獲得！`);

    } catch (error) {
      console.error("Failed to claim reward:", error);
    }
  };

  // タスクを追加
  const handleAddTask = async (title: string, points: number, emoji: string) => {
    try {
      const newTask = {
        id: Date.now().toString(),
        title,
        points,
        completed: false,
        emoji,
      };

      await apiCall("/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });

      setTasks([...tasks, newTask]);
      toast.success("タスクを追加しました");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // タスクを削除
  const handleDeleteTask = async (taskId: string) => {
    try {
      await apiCall(`/tasks/${taskId}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== taskId));
      toast.success("タスクを削除しました");
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // 報酬を追加
  const handleAddReward = async (title: string, points: number, emoji: string) => {
    try {
      const newReward = {
        id: Date.now().toString(),
        title,
        points,
        claimed: false,
        emoji,
      };

      await apiCall("/rewards", {
        method: "POST",
        body: JSON.stringify(newReward),
      });

      setRewards([...rewards, newReward]);
      toast.success("報酬を追加しました");
    } catch (error) {
      console.error("Failed to add reward:", error);
    }
  };

  // 報酬を削除
  const handleDeleteReward = async (rewardId: string) => {
    try {
      await apiCall(`/rewards/${rewardId}`, { method: "DELETE" });
      setRewards(rewards.filter((r) => r.id !== rewardId));
      toast.success("報酬を削除しました");
    } catch (error) {
      console.error("Failed to delete reward:", error);
    }
  };

  // 特別報酬をリセット
  const handleResetSpecialReward = async () => {
    try {
      const newCount = specialRewardCount - 5;
      await apiCall("/special-reward-count", {
        method: "POST",
        body: JSON.stringify({ count: newCount }),
      });
      setSpecialRewardCount(newCount);
      toast.success("特別報酬を獲得しました！");
    } catch (error) {
      console.error("Failed to reset special reward:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">💖</div>
          <p className="text-xl text-pink-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <Toaster position="top-center" richColors />
      <CelebrationEffect
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
      <CongratulationsEffect
        show={showCongratulations}
        onComplete={() => setShowCongratulations(false)}
      />
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        <RewardHeader points={points} userName="娘" />

        {/* 背景画像 */}
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none z-0"
          style={{ 
            backgroundImage: `url(${myMelodyBg})`,
            top: '160px'
          }}
        />

        <div className="overflow-y-auto relative z-10" style={{ height: "calc(100vh - 220px)" }}>
          {activeTab === "tasks" && (
            <TaskList
              tasks={tasks}
              onCompleteTask={handleCompleteTask}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onUncompleteTask={handleUncompleteTask}
            />
          )}
          {activeTab === "rewards" && (
            <RewardList
              rewards={rewards}
              points={points}
              onClaimReward={handleClaimReward}
              onAddReward={handleAddReward}
              onDeleteReward={handleDeleteReward}
            />
          )}
          {activeTab === "history" && <HistoryList history={history} />}
          {activeTab === "calendar" && (
            <Calendar
              history={history}
              specialRewardCount={specialRewardCount}
              specialRewardDates={specialRewardDates}
              onResetSpecialReward={handleResetSpecialReward}
            />
          )}
        </div>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}