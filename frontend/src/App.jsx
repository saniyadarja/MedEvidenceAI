import { useState } from "react";
import "./App.css";
import { analyzeResearch } from "./api";

function App() {

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const data = await analyzeResearch(question);

      setResult(data);

    } catch (error) {
      console.error(error);
      alert("Failed to fetch research results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <section className="hero">
        <div className="hero-content">
          <h1>MedEvidenceAI</h1>

          <h2>
            AI-Powered Evidence Verification &
            Clinical Support Analysis
          </h2>

          <p>
            Analyze published medical research papers,
            identify contradictions, discover research gaps,
            and generate evidence-based clinical insights.
          </p>

          <button
            onClick={() =>
              document
                .querySelector(".research")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Research
          </button>
        </div>
      </section>

      <section className="stats">

        <div className="card">
          <h1>10M+</h1>
          <p>Published Papers</p>
        </div>

        <div className="card">
          <h1>500K+</h1>
          <p>Clinical Trials</p>
        </div>

        <div className="card">
          <h1>95%</h1>
          <p>Evidence Accuracy</p>
        </div>

        <div className="card">
          <h1>24/7</h1>
          <p>AI Analysis</p>
        </div>

      </section>

      <section className="features">

        <h1>Why MedEvidenceAI?</h1>

        <div className="feature-grid">

          <div className="feature-card">
            <h2>Evidence Verification</h2>
            <p>Verify claims using published research papers.</p>
          </div>

          <div className="feature-card">
            <h2>Contradiction Detection</h2>
            <p>Find conflicting scientific findings instantly.</p>
          </div>

          <div className="feature-card">
            <h2>Research Gap Discovery</h2>
            <p>Identify areas lacking sufficient research.</p>
          </div>

          <div className="feature-card">
            <h2>Confidence Scoring</h2>
            <p>AI-generated confidence based on evidence.</p>
          </div>

        </div>

      </section>

      <section className="research">

        <h1>Research Evidence Analyzer</h1>

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a medical research question..."
        />

        <button onClick={handleAnalyze}>
          Analyze Evidence
        </button>

        {loading && (
          <h2 style={{ marginTop: "30px" }}>
            Analyzing Research Papers...
          </h2>
        )}

        {
result && (

<div className="result-container">

  <div className="confidence-card">
    <h2>Confidence Score</h2>
    <h1>{result.confidence}%</h1>
  </div>

  <div className="support-card">

    <h2>
      Supporting Evidence
      ({result.support_count})
    </h2>

    <ul>
      {
      result.supporting_titles?.map(
      (title,index)=>(
        <li key={index}>{title}</li>
      ))
      }
    </ul>

  </div>

  <div className="contradict-card">

    <h2>
      Contradicting Evidence
      ({result.contradict_count})
    </h2>

    <ul>
      {
      result.contradicting_titles?.map(
      (title,index)=>(
        <li key={index}>{title}</li>
      ))
      }
    </ul>

  </div>

  <div className="gap-card">

    <h2>Research Gaps</h2>

    <ul>
      {
      result.research_gaps?.map(
      (gap,index)=>(
        <li key={index}>{gap}</li>
      ))
      }
    </ul>

  </div>

</div>

)
}

      </section>

      <section className="workflow">

        <h1>How It Works</h1>

        <div className="steps">
          <div>Ask Question</div>
          <div>Search PubMed</div>
          <div>Analyze Papers</div>
          <div>Generate Evidence Report</div>
        </div>

      </section>

      <footer>
        <h2>MedEvidenceAI</h2>

        <p>
          AI-Powered Clinical Evidence Verification Platform
        </p>
      </footer>

    </div>
  );
}

export default App;