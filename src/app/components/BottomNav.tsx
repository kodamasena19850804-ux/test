import { ListTodo, Gift, History, Calendar } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "tasks", label: "おてつだい", icon: ListTodo },
    { id: "rewards", label: "ごほうび", icon: Gift },
    { id: "calendar", label: "カレンダー", icon: Calendar },
    { id: "history", label: "きろく", icon: History },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-pink-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className={`size-5 ${isActive ? "fill-pink-200" : ""}`} />
              <span className="text-xs font-medium mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}