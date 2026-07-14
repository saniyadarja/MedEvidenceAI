def classify_paper(question, abstract):

    if abstract is None:
        return "neutral"

    text = str(abstract).lower()

    positive_words = [
        "safe",
        "effective",
        "beneficial",
        "improved",
        "reduced risk",
        "significant improvement"
    ]

    negative_words = [
        "harmful",
        "risk",
        "adverse",
        "toxicity",
        "increased mortality",
        "contraindicated"
    ]

    positive_score = sum(word in text for word in positive_words)
    negative_score = sum(word in text for word in negative_words)

    if positive_score > negative_score:
        return "support"

    if negative_score > positive_score:
        return "contradict"

    return "neutral"