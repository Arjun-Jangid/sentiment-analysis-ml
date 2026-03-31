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

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

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
  const [error, setError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      setHistoryError(null);
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
      setHistoryError("Failed to load history.");
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
      setError(null);
      setPredictLoading(true);
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      if (!response.ok) {
        throw new Error("Failed to predict sentiment. Please try again.");
      }

      const data = await response.json();
      setResult(data);
      fetchHistory();
      setReview("");
      // setLimit(10);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      console.error("Error:", error);
    } finally {
      setPredictLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {error && <div className="error_box">{error}</div>}

      <div className="main_section">
        <img
          className="menu"
          src="/menu.png"
          alt=""
          role="button"
          tabIndex={0}
          aria-label="Toggle history menu"
          onClick={toggleHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleHandler();
            }
          }}
        />
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
              ) : historyError ? (
                <p className="history_empty">
                  Unable to load history. Please try again.
                </p>
              ) : history.length === 0 ? (
                <p className="history_empty">No history yet.</p>
              ) : (
                <>
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="history_item"
                      onClick={() => setReview(item.review)}
                    >
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
                      type="button"
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
          <div className="chat_input_wrapper">
            <div className={`input_container ${shake ? "shake" : ""}`}>
              <textarea
                className="sentiment_input"
                placeholder="Enter your review here…"
                disabled={predictLoading}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={5}
                spellCheck
              />
              <button
                className={`send_btn ${predictLoading && "new_class"}`}
                onClick={predictSentiment}
                disabled={!review.trim() || predictLoading}
              >
                {predictLoading ? (
                  <span className="loader small"></span>
                ) : (
                  <img
                    className="send_icon"
                    src="/send.png"
                    alt="Send"
                    aria-label="Predict sentiment"
                  />
                )}
              </button>
            </div>
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
