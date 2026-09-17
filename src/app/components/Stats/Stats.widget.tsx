import * as React from "react";
import imgE from "@/imports/e.png";
import { API_ENDPOINT } from "@/app/utils/constants";
import { SnackbarType } from "../Snackbar/Snackbar";
import Snackbar from "../Snackbar/Snackbar.widget";

interface StatData {
  id: number;
  value: string;
  label: string;
}

const DEFAULT_STATS: StatData[] = [
  {
    id: 1,
    value: "2,500+",
    label: "Happy Clients",
  },
  {
    id: 2,
    value: "3,800+",
    label: "Projects Done",
  },
  {
    id: 3,
    value: "10+",
    label: "Years Active",
  },
  {
    id: 4,
    value: "24/7",
    label: "Emergency Line",
  },
];

export const Stat: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [stats, setStats] = React.useState<StatData[]>(DEFAULT_STATS);

  const [loading, setLoading] = React.useState(true);

  const [savingId, setSavingId] = React.useState<number | null>(null);

  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    type: SnackbarType;
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  // =====================================================
  // LOAD STATS FROM BACKEND
  // =====================================================

  const loadStats = React.useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_ENDPOINT}/api/stats`);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load statistics");
      }

      setStats(result.stats);
    } catch (error) {
      console.error("GET STATS ERROR:", error);

      setSnackbar({
        open: true,
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to load statistics.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Load when component mounts
  React.useEffect(() => {
    loadStats();
  }, [loadStats]);

  // =====================================================
  // UPDATE STAT VALUE
  // =====================================================

  const saveStat = async (id: number, value: string) => {
    const cleanValue = value.trim();

    if (!cleanValue) {
      setSnackbar({
        open: true,
        type: "warning",
        message: "Statistic value cannot be empty.",
      });

      return;
    }

    try {
      setSavingId(id);

      const response = await fetch(`${API_ENDPOINT}/api/stats/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: cleanValue,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update statistic");
      }

      // Update frontend with the value returned by backend
      setStats((currentStats) =>
        currentStats.map((stat) => (stat.id === id ? result.stat : stat))
      );

      setSnackbar({
        open: true,
        type: "success",
        message: "Statistic updated successfully.",
      });
    } catch (error) {
      console.error("UPDATE STAT ERROR:", error);

      setSnackbar({
        open: true,
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update statistic.",
      });
    } finally {
      setSavingId(null);
    }
  };

  // =====================================================
  // UPDATE LOCAL INPUT VALUE
  // =====================================================

  const updateLocalValue = (id: number, value: string) => {
    setStats((currentStats) =>
      currentStats.map((stat) =>
        stat.id === id
          ? {
              ...stat,
              value,
            }
          : stat
      )
    );
  };

  return (
    <>
      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
        onClose={() =>
          setSnackbar((current) => ({
            ...current,
            open: false,
          }))
        }
      />
      <img
        src={imgE}
        alt="Grand Waters facility"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,10,28,0.88) 0%, rgba(21,88,203,0.70) 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#4e8ef7] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
            Trusted Since 2012
          </p>

          <h2 className="font-black text-white text-3xl lg:text-5xl leading-tight">
            Grand Waters by the Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const isSaving = savingId === stat.id;

            return (
              <div
                key={stat.id}
                className="relative text-center px-4 py-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                {isAdmin ? (
                  <div className="space-y-3">
                    {/* VALUE — EDITABLE */}
                    <input
                      value={stat.value}
                      disabled={isSaving}
                      onChange={(e) =>
                        updateLocalValue(stat.id, e.target.value)
                      }
                      onBlur={() => saveStat(stat.id, stat.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                      className="
                        w-full
                        text-center
                        font-black
                        text-3xl
                        bg-transparent
                        border-b
                        border-[#4e8ef7]/60
                        focus:border-[#4e8ef7]
                        focus:outline-none
                        text-[#4e8ef7]
                        pb-1
                        transition
                        disabled:opacity-50
                      "
                    />

                    {/* LABEL — STATIC */}
                    <div className="w-full text-center text-sm font-semibold text-gray-300 pb-1">
                      {stat.label}
                    </div>

                    <div
                      className={`
                        absolute
                        bottom-3
                        left-0
                        right-0
                        text-center
                        text-[10px]
                        text-gray-400
                        font-medium
                        transition-opacity
                        duration-150
                        pointer-events-none
                        ${isSaving ? "opacity-100" : "opacity-0"}
                    `}
                    >
                      Saving...
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="font-black text-4xl lg:text-5xl mb-2"
                      style={{ color: "#4e8ef7" }}
                    >
                      {stat.value}
                    </div>

                    <div className="text-gray-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Stat;
