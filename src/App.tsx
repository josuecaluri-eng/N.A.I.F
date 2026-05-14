import React, { useState, useEffect } from "react";
import {
  Plus,
  ChevronDown,
  ChevronUp,
  Save,
  Settings,
  Trash2,
} from "lucide-react";

const FONT = "-apple-system, sans-serif";

export default function App() {
  // =========================
  // HELPERS
  // =========================

  const createStage = (title = "Nova Etapa", color = "#90caf9") => ({
    id: Date.now() + Math.random(),

    title,

    color,

    open: true,

    tabs: {
      "Para Quem": "",
      Comunicação: "",
      Gerenciamento: "",
    },
  });

  const createFunnel = (name = "Novo Funil") => ({
    id: Date.now() + Math.random(),

    name,

    stages: [
      createStage("Descoberta", "#ff1744"),

      createStage("Reconhecimento", "#ffd600"),

      createStage("Interesse", "#c6d600"),

      createStage("Compra", "#8bc34a"),

      createStage("Fidelização", "#102a43"),
    ],
  });

  // =========================
  // INITIAL DATA
  // =========================

  const initialData = {
    selectedFunnelId: 1,

    systemBackground: "linear-gradient(135deg,#eceff1,#f8fafc,#e2e8f0)",

    funnels: [
      {
        id: 1,

        name: "Funil 1",

        stages: [
          createStage("Descoberta", "#ff1744"),

          createStage("Reconhecimento", "#ffd600"),

          createStage("Interesse", "#c6d600"),

          createStage("Compra", "#8bc34a"),

          createStage("Fidelização", "#102a43"),
        ],
      },
    ],
  };

  // =========================
  // STATES
  // =========================

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("ux-funnel-system");

      return saved ? JSON.parse(saved) : initialData;
    } catch {
      return initialData;
    }
  });

  const [selectedTab, setSelectedTab] = useState("Para Quem");

  // =========================
  // AUTO SAVE
  // =========================

  useEffect(() => {
    localStorage.setItem("ux-funnel-system", JSON.stringify(data));
  }, [data]);

  // =========================
  // CURRENT FUNNEL
  // =========================

  const funnel =
    data.funnels.find((f) => f.id === data.selectedFunnelId) || data.funnels[0];

  // =========================
  // FUNNEL ACTIONS
  // =========================

  const selectFunnel = (id) => {
    setData((prev) => ({
      ...prev,

      selectedFunnelId: id,
    }));
  };

  const addFunnel = () => {
    if (data.funnels.length >= 5) {
      alert("Máximo de 5 funis.");
      return;
    }

    const newFunnel = createFunnel(`Funil ${data.funnels.length + 1}`);

    setData((prev) => ({
      ...prev,

      funnels: [...prev.funnels, newFunnel],

      selectedFunnelId: newFunnel.id,
    }));
  };

  const removeFunnel = (id) => {
    if (data.funnels.length <= 1) {
      alert("Você precisa ter pelo menos 1 funil.");

      return;
    }

    const updatedFunnels = data.funnels.filter((f) => f.id !== id);

    setData((prev) => ({
      ...prev,

      funnels: updatedFunnels,

      selectedFunnelId: updatedFunnels[0]?.id || null,
    }));
  };

  const updateFunnelName = (id, value) => {
    setData((prev) => ({
      ...prev,

      funnels: prev.funnels.map((f) =>
        f.id === id
          ? {
              ...f,
              name: value,
            }
          : f
      ),
    }));
  };

  // =========================
  // STAGE ACTIONS
  // =========================

  const updateStage = (stageId, field, value) => {
    setData((prev) => ({
      ...prev,

      funnels: prev.funnels.map((f) => {
        if (f.id !== prev.selectedFunnelId) return f;

        return {
          ...f,

          stages: f.stages.map((s) =>
            s.id === stageId
              ? {
                  ...s,
                  [field]: value,
                }
              : s
          ),
        };
      }),
    }));
  };

  const updateTabText = (stageId, tab, value) => {
    setData((prev) => ({
      ...prev,

      funnels: prev.funnels.map((f) => {
        if (f.id !== prev.selectedFunnelId) return f;

        return {
          ...f,

          stages: f.stages.map((s) =>
            s.id === stageId
              ? {
                  ...s,

                  tabs: {
                    ...s.tabs,
                    [tab]: value,
                  },
                }
              : s
          ),
        };
      }),
    }));
  };

  const addStage = () => {
    setData((prev) => ({
      ...prev,

      funnels: prev.funnels.map((f) => {
        if (f.id !== prev.selectedFunnelId) return f;

        return {
          ...f,

          stages: [...f.stages, createStage()],
        };
      }),
    }));
  };

  const removeStage = (stageId) => {
    setData((prev) => ({
      ...prev,

      funnels: prev.funnels.map((f) => {
        if (f.id !== prev.selectedFunnelId) return f;

        return {
          ...f,

          stages: f.stages.filter((s) => s.id !== stageId),
        };
      }),
    }));
  };

  // =========================
  // SAVE BUTTON
  // =========================

  const saveSystem = () => {
    localStorage.setItem("ux-funnel-system", JSON.stringify(data));

    alert("Sistema salvo.");
  };

  // =========================
  // UI
  // =========================

  return (
    <div
      style={{
        minHeight: "100%",
        width: "200%",
        margin: 0,
        background: data.systemBackground,
        padding: 24,
        fontFamily: FONT,

        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <div
        style={{
          display: "grid",

          gridTemplateColumns: "320px 1fr 450px",

          gap: 20,
        }}
      >
        {/* ========================= */}
        {/* SIDEBAR */}
        {/* ========================= */}

        <div
          style={{
            background: "rgba(255,255,255,.7)",

            borderRadius: 30,

            padding: 24,

            backdropFilter: "blur(20px)",

            boxShadow: "0 10px 40px rgba(0,0,0,.08)",
          }}
        >
          <h1
            style={{
              fontSize: 36,

              marginBottom: 8,

              fontFamily: FONT,

              fontWeight: 800,
            }}
          >
            N.A.I.F
          </h1>

          <p
            style={{
              opacity: 0.6,

              lineHeight: 1.5,

              fontFamily: FONT,
            }}
          >
            Network UX, Automation, Intelligence & Funnel System
          </p>

          {/* SAVE */}
          <button
            onClick={saveSystem}
            style={{
              width: "100%",

              marginTop: 15,

              border: "none",

              background: "#102a43",

              color: "white",

              padding: 4,

              borderRadius: 10,

              cursor: "pointer",

              fontWeight: 700,

              fontSize: 15,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              gap: 10,

              fontFamily: FONT,
            }}
          >
            <Save size={18} />
            Salvar Sistema
          </button>

          {/* FUNNELS HEADER */}
          <div
            style={{
              marginTop: 35,

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: 32,
                marginBottom: 8,
                fontFamily: FONT,
                fontWeight: 800,
                margin: 0,

                fontFamily: '"apple-system",sans-serif',
              }}
            >
              Funis
            </h2>

            <button
              onClick={addFunnel}
              style={{
                border: "none",

                background: "#102a43",

                color: "white",

                width: 40,

                height: 40,

                borderRadius: 14,

                cursor: "pointer",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <Plus size={20} />
            </button>
          </div>

          {/* FUNNELS LIST */}
          <div
            style={{
              display: "flex",

              flexDirection: "column",

              gap: 12,

              marginTop: 15,
            }}
          >
            {data.funnels.map((f) => (
              <div
                key={f.id}
                onClick={() => selectFunnel(f.id)}
                style={{
                  background:
                    data.selectedFunnelId === f.id ? "#102a43" : "white",

                  color: data.selectedFunnelId === f.id ? "white" : "#111",

                  borderRadius: 18,

                  padding: 14,

                  cursor: "pointer",

                  border: "1px solid rgba(0,0,0,.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",

                    alignItems: "center",

                    gap: 10,
                  }}
                >
                  <input
                    value={f.name}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateFunnelName(f.id, e.target.value)}
                    style={{
                      flex: 1,

                      border: "none",

                      outline: "none",

                      background: "transparent",

                      color: "inherit",

                      fontWeight: 700,

                      fontSize: 16,

                      fontFamily: FONT,
                    }}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      removeFunnel(f.id);
                    }}
                    style={{
                      border: "none",

                      background: "transparent",

                      color: "inherit",

                      cursor: "pointer",

                      display: "flex",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BACKGROUND */}
          <div
            style={{
              marginTop: 35,
            }}
          >
            <h3
              style={{
                fontSize: 20,

                marginBottom: 8,

                fontFamily: FONT,

                fontWeight: 800,
              }}
            >
              Back Ground Colour
            </h3>

            <div
              style={{
                display: "flex",

                gap: 10,

                marginTop: 15,

                flexWrap: "wrap",
              }}
            >
              {[
                "linear-gradient(135deg,#eceff1,#f8fafc,#e2e8f0)",

                "linear-gradient(135deg,#0f172a,#1e293b,#111827)",

                "linear-gradient(135deg,#ede9fe,#dbeafe)",

                "linear-gradient(135deg,#dcfce7,#dbeafe)",
              ].map((bg) => (
                <button
                  key={bg}
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,

                      systemBackground: bg,
                    }))
                  }
                  style={{
                    width: 55,

                    height: 55,

                    borderRadius: 18,

                    border: "none",

                    background: bg,

                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* FUNNEL VIEW */}
        {/* ========================= */}

        <div
          style={{
            background: "rgba(255,255,255,.7)",

            borderRadius: 30,

            padding: 30,

            backdropFilter: "blur(20px)",

            boxShadow: "0 10px 40px rgba(0,0,0,.08)",
          }}
        >
          {/* TITLE + BUTTON */}
          <div
            style={{
              marginBottom: 30,

              display: "flex",

              flexDirection: "column",

              gap: 18,
            }}
          >
            <h1
              style={{
                fontSize: 38,

                margin: 0,

                fontFamily: FONT,

                fontWeight: 800,
              }}
            >
              {funnel?.name}
            </h1>

            <button
              onClick={addStage}
              style={{
                border: "none",

                background: "#102a43",

                color: "white",

                borderRadius: 18,

                padding: "16px 20px",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                gap: 10,

                cursor: "pointer",

                fontWeight: 700,

                width: "fit-content",

                fontSize: 16,

                fontFamily: FONT,
              }}
            >
              <Plus size={18} />
              Adicionar Etapa
            </button>
          </div>

          {/* STAGES */}
          <div
            style={{
              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              gap: 20,
            }}
          >
            {funnel?.stages?.map((stage, index) => (
              <div
                key={stage.id}
                style={{
                  width: `${100 - index * 10}%`,

                  height: 95,

                  background: stage.color,

                  borderRadius: "0 0 120px 120px",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  fontWeight: 800,

                  fontSize: 12,

                  color: stage.color === "#ffff" ? "#111" : "white",

                  boxShadow: "inset 0 10px 20px rgba(255,255,255,.2)",

                  fontFamily: FONT,
                }}
              >
                {stage.title}
              </div>
            ))}
          </div>
        </div>

        {/* ========================= */}
        {/* RIGHT PANEL */}
        {/* ========================= */}

        <div
          style={{
            background: "rgba(255,255,255,.7)",

            borderRadius: 30,

            padding: 22,

            backdropFilter: "blur(20px)",

            boxShadow: "0 10px 40px rgba(0,0,0,.08)",

            overflowY: "auto",

            maxHeight: "95vh",
          }}
        >
          <div
            style={{
              display: "flex",

              alignItems: "center",

              gap: 10,

              marginBottom: 25,
            }}
          >
            <Settings size={20} />

            <h2
              style={{
                fontSize: 25,

                marginBottom: 8,

                fontFamily: FONT,

                fontWeight: 800,
              }}
            >
              UX Designer Mode
            </h2>
          </div>

          {funnel?.stages?.map((stage) => (
            <div
              key={stage.id}
              style={{
                background: "white",

                borderRadius: 22,

                marginBottom: 20,

                overflow: "hidden",

                border: "1px solid rgba(0,0,0,.06)",
              }}
            >
              {/* HEADER */}
              <div
                onClick={() => updateStage(stage.id, "open", !stage.open)}
                style={{
                  padding: 18,

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "space-between",

                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",

                    alignItems: "center",

                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 18,

                      height: 18,

                      borderRadius: 999,

                      background: stage.color,
                    }}
                  />

                  <input
                    value={stage.title}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      updateStage(stage.id, "title", e.target.value)
                    }
                    style={{
                      border: "none",

                      outline: "none",

                      fontSize: 18,

                      fontWeight: 700,

                      fontFamily: FONT,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",

                    alignItems: "center",

                    gap: 10,
                  }}
                >
                  <input
                    type="color"
                    value={stage.color}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      updateStage(stage.id, "color", e.target.value)
                    }
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      removeStage(stage.id);
                    }}
                    style={{
                      border: "none",

                      background: "transparent",

                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>

                  {stage.open ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              {/* CONTENT */}
              {stage.open && (
                <div
                  style={{
                    padding: 20,

                    borderTop: "1px solid rgba(0,0,0,.05)",
                  }}
                >
                  {/* TABS */}
                  <div
                    style={{
                      display: "flex",

                      gap: 10,

                      marginBottom: 15,

                      flexWrap: "wrap",
                    }}
                  >
                    {["Para Quem", "Comunicação", "Gerenciamento"].map(
                      (tab) => (
                        <button
                          key={tab}
                          onClick={() => setSelectedTab(tab)}
                          style={{
                            border: "none",

                            padding: "10px 16px",

                            borderRadius: 14,

                            cursor: "pointer",

                            background:
                              selectedTab === tab ? "#102a43" : "#edf2f7",

                            color: selectedTab === tab ? "white" : "#111",

                            fontWeight: 600,

                            fontFamily: FONT,
                          }}
                        >
                          {tab}
                        </button>
                      )
                    )}
                  </div>

                  {/* TEXTAREA */}
                  <textarea
                    value={stage.tabs[selectedTab]}
                    onChange={(e) =>
                      updateTabText(stage.id, selectedTab, e.target.value)
                    }
                    placeholder="Digite informações..."
                    style={{
                      width: "100%",

                      height: 180,

                      borderRadius: 18,

                      border: "1px solid rgba(0,0,0,.08)",

                      padding: 10,

                      resize: "vertical",

                      outline: "none",

                      fontSize: 15,

                      fontFamily: FONT,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
