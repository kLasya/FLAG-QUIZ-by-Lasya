import { useState } from "react";

const countries = [
  { name: "United States", image: "https://flagcdn.com/w320/us.png" },
  { name: "Canada", image: "https://flagcdn.com/w320/ca.png" },
  { name: "Mexico", image: "https://flagcdn.com/w320/mx.png" },
  { name: "Panama", image: "https://flagcdn.com/w320/pa.png" },
  { name: "Haiti", image: "https://flagcdn.com/w320/ht.png" },
  { name: "Jamaica", image: "https://flagcdn.com/w320/jm.png" },
  { name: "Peru", image: "https://flagcdn.com/w320/pe.png" },
  { name: "Dominican Republic", image: "https://flagcdn.com/w320/do.png" },
  { name: "Cuba", image: "https://flagcdn.com/w320/cu.png" },
  { name: "India", image: "https://flagcdn.com/w320/in.png" },
  { name: "Japan", image: "https://flagcdn.com/w320/jp.png" },
  { name: "Brazil", image: "https://flagcdn.com/w320/br.png" },
  { name: "Greenland", image: "https://flagcdn.com/w320/gl.png" },
  { name: "El Salvador", image: "https://flagcdn.com/w320/sv.png" },
];

export default function FlagQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState({});
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const country = countries[current];
  const total = countries.length;

  const options = [
    country,
    ...countries
      .filter((c) => c.name !== country.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3),
  ].sort(() => Math.random() - 0.5);

  function handleAnswer(correct) {
    setResults((prev) => ({
      ...prev,
      [current]: correct ? "correct" : "wrong",
    }));
  }

  function goNext() {
    if (current < total - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  }

  function goPrev() {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setResults({});
    setDone(false);
    setScore(0);
  }

  const correctCount = Object.values(results).filter((v) => v === "correct").length;
  const wrongCount = Object.values(results).filter((v) => v === "wrong").length;

  if (done) {
    return (
      <div style={styles.page}>
        <div style={styles.resultCard}>
          <div style={{ fontSize: 60 }}>🏆</div>
          <h1 style={styles.resultTitle}>Quiz Complete!</h1>

          <div style={styles.scoreRow}>
            <div style={{ ...styles.scoreBadge, background: "#22c55e22", border: "2px solid #22c55e" }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>{correctCount}</span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>Correct</span>
            </div>

            <div style={{ ...styles.scoreBadge, background: "#ef444422", border: "2px solid #ef4444" }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#ef4444" }}>{wrongCount}</span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>Wrong</span>
            </div>
          </div>

          <div style={styles.breakdown}>
            {countries.map((c, i) => (
              <div key={c.name} style={styles.breakdownRow}>
                <img src={c.image} alt={`${c.name} flag`} style={styles.smallFlag} />
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{c.name}</span>
                <span style={{ fontSize: 20 }}>
                  {results[i] === "correct" ? "✅" : results[i] === "wrong" ? "❌" : "—"}
                </span>
              </div>
            ))}
          </div>

          <button style={styles.restartBtn} onClick={restart}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span style={{ fontSize: 20, fontWeight: 700 }}>🌍 Flag Quiz</span>
        <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 600 }}>
          {current + 1} / {total}
        </span>
      </div>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${((current + 1) / total) * 100}%` }} />
      </div>

      <div style={styles.card}>
        <div style={styles.cardInner}>
          <img src={country.image} alt="Guess this flag" style={styles.flagImage} />

          <div style={styles.scoreText}>
            Score: {score} / {total}
          </div>

          <div style={styles.optionsGrid}>
            {options.map((option) => {
              const isCorrect = option.name === country.name;
              const isSelected = selected === option.name;

              let buttonStyle = styles.optionBtn;

              if (selected) {
                if (isCorrect) {
                  buttonStyle = { ...styles.optionBtn, ...styles.correctOption };
                } else if (isSelected) {
                  buttonStyle = { ...styles.optionBtn, ...styles.wrongOption };
                }
              }

              return (
                <button
                  key={option.name}
                  style={buttonStyle}
                  disabled={selected !== null}
                  onClick={() => {
                    setSelected(option.name);

                    if (isCorrect) {
                      setScore(score + 1);
                      handleAnswer(true);
                    } else {
                      handleAnswer(false);
                    }
                  }}
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={styles.navRow}>
        <button style={styles.navBtn} onClick={goPrev} disabled={current === 0}>
          ← Prev
        </button>

        <button style={{ ...styles.navBtn, ...styles.nextBtn }} onClick={goNext}>
          {current === total - 1 ? "Finish 🏁" : "Next →"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#f1f5f9",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 420,
    marginBottom: 12,
  },
  progressBar: {
    width: "100%",
    maxWidth: 420,
    height: 6,
    background: "#334155",
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #facc15, #f97316)",
    borderRadius: 99,
    transition: "width 0.4s ease",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#1e293b",
    border: "2px solid #334155",
    borderRadius: 24,
    minHeight: 360,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    boxShadow: "0 8px 32px #0008",
  },
  cardInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: "32px 24px",
    width: "100%",
  },
  flagImage: {
    width: 250,
    maxWidth: "85%",
    borderRadius: 14,
    boxShadow: "0 12px 30px #0007",
  },
  scoreText: {
    color: "#facc15",
    fontSize: 18,
    fontWeight: 800,
  },
  optionsGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  optionBtn: {
    padding: "12px 10px",
    borderRadius: 12,
    border: "2px solid #334155",
    background: "#0f172a",
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: 800,
    cursor: "pointer",
  },
  correctOption: {
    background: "#22c55e",
    borderColor: "#22c55e",
    color: "#052e16",
  },
  wrongOption: {
    background: "#ef4444",
    borderColor: "#ef4444",
    color: "#fff",
  },
  navRow: {
    display: "flex",
    gap: 16,
    width: "100%",
    maxWidth: 420,
  },
  navBtn: {
    flex: 1,
    padding: "12px 0",
    borderRadius: 12,
    border: "2px solid #334155",
    background: "#1e293b",
    color: "#f1f5f9",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  nextBtn: {
    background: "linear-gradient(135deg, #facc15, #f97316)",
    color: "#0f172a",
    border: "none",
  },
  resultCard: {
    background: "#1e293b",
    border: "2px solid #334155",
    borderRadius: 24,
    padding: "36px 28px",
    maxWidth: 420,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 8px 40px #0009",
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 800,
    margin: 0,
    color: "#facc15",
  },
  scoreRow: {
    display: "flex",
    gap: 20,
  },
  scoreBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "14px 28px",
    borderRadius: 16,
    gap: 4,
  },
  breakdown: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    borderTop: "1px solid #334155",
    paddingTop: 16,
  },
  breakdownRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "4px 0",
  },
  smallFlag: {
    width: 42,
    height: 28,
    objectFit: "cover",
    borderRadius: 5,
    boxShadow: "0 4px 10px #0005",
  },
  restartBtn: {
    marginTop: 8,
    padding: "12px 32px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #facc15, #f97316)",
    color: "#0f172a",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
  },
};