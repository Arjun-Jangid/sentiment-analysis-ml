import "./App.css";
import { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";

interface SentimentResult {
  sentiment: string;
  positive_probability: number;
  negative_probability: number;
}

interface HistoryItem {
  id: number;
  review: string;
  sentiment: string;
  positive_probability: number;
  negative_probability: number;
}

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [shake, setShake] = useState(false);
  const [predictLoading, setPredictLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [limit, setLimit] = useState(10);
  const [showMenu, setShowMenu] = useState(false);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await fetch(`${API_URL}/history?limit=${limit}`);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await response.json();
      setHistory(data.items);
      setHasMore(data.has_more);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const predictSentiment = async () => {
    if (!review.trim()) {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);

      return;
    }

    try {
      setPredictLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setReview("");
      fetchHistory();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPredictLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      predictSentiment();
    }
  };

  const toggleHandler = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    fetchHistory();
  }, [limit]);

  return (
    <>
      <div className="main_section">
        <img className="menu" src="/menu.png" onClick={toggleHandler} />
        <aside
          id="menu_div"
          className={`history_section ${showMenu ? "open" : "close"}`}
        >
          <div className="history_container">
            <h2 className="history_label">History</h2>
            <div className="history_list">
              {historyLoading && history.length === 0 ? (
                <div className="history_loader_wrap">
                  <span className="loader large" aria-label="Loading" />
                </div>
              ) : (
                <>
                  {history.map((item) => (
                    <div key={item.id} className="history_item">
                      <p className="text">
                        <strong>Review:</strong> {item.review}
                      </p>
                      <p className="label">
                        <strong>Sentiment:</strong> {item.sentiment}
                      </p>
                      <p className="probability">
                        Positive - {item.positive_probability} | Negative -{" "}
                        {item.negative_probability}
                      </p>
                    </div>
                  ))}

                  {historyLoading && (
                    <div className="history_loader_wrap">
                      <span className="loader small" />
                    </div>
                  )}
                  {hasMore && !historyLoading && (
                    <button
                      className="show_more_btn"
                      disabled={historyLoading}
                      onClick={() => setLimit((prev) => prev + 10)}
                    >
                      Show More
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </aside>

        <div className="model_section">
          <h1 className="heading">Text Sentiment Classifier</h1>
          <div className={`input_container ${shake ? "shake" : ""}`}>
            <textarea
              className="sentiment_input"
              placeholder="Enter your review here…"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={5}
              spellCheck
            />
            <button
              className="btn"
              onClick={predictSentiment}
              disabled={predictLoading}
            >
              {predictLoading ? (
                <span className="loader small"></span>
              ) : (
                "Predict"
              )}
            </button>
          </div>
          <div className="sentiment_details_container">
            <p className="sentiment_text">{result?.sentiment || "Sentiment"}</p>
            <div className="sentiment_details">
              <p>Positive Probability - {result?.positive_probability}</p>
              <p>Negative Probability - {result?.negative_probability}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
