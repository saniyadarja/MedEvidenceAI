from fastapi import FastAPI
from pydantic import BaseModel
from pubmed_service import search_pubmed, fetch_paper_details
from evidence_engine import classify_paper
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchQuery(BaseModel):
    question: str


@app.get("/")
def home():
    return {"message": "MedEvidenceAI Running"}


@app.post("/analyze")
def analyze(query: ResearchQuery):

    paper_ids = search_pubmed(query.question)

    papers = fetch_paper_details(paper_ids)

    supporting_titles = []
    contradicting_titles = []
    neutral_titles = []

    for paper in papers:

        if not paper.get("abstract"):
            neutral_titles.append(paper["title"])
            continue

        result = classify_paper(
            query.question,
            paper["abstract"]
        )

        if result == "support":
            supporting_titles.append(paper["title"])

        elif result == "contradict":
            contradicting_titles.append(paper["title"])

        else:
            neutral_titles.append(paper["title"])

    support_count = len(supporting_titles)
    contradict_count = len(contradicting_titles)
    neutral_count = len(neutral_titles)

    total = support_count + contradict_count

    confidence = (
        round((support_count / total) * 100)
        if total > 0
        else 50
    )

    return {
        "question": query.question,
        "supporting_titles": supporting_titles,
        "contradicting_titles": contradicting_titles,
        "neutral_titles": neutral_titles,
        "support_count": support_count,
        "contradict_count": contradict_count,
        "neutral_count": neutral_count,
        "confidence": confidence,
        "research_gaps": [
            "Limited elderly studies",
            "Insufficient long-term follow-up"
        ]
    }