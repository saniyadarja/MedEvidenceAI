import requests
import xml.etree.ElementTree as ET

BASE_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"


def search_pubmed(query, max_results=20):

    response = requests.get(
        f"{BASE_URL}/esearch.fcgi",
        params={
            "db": "pubmed",
            "term": query,
            "retmax": max_results,
            "retmode": "json"
        }
    )

    data = response.json()

    return data["esearchresult"]["idlist"]


def fetch_paper_details(pubmed_ids):

    if not pubmed_ids:
        return []

    ids = ",".join(pubmed_ids)

    response = requests.get(
        f"{BASE_URL}/efetch.fcgi",
        params={
            "db": "pubmed",
            "id": ids,
            "retmode": "xml"
        }
    )

    root = ET.fromstring(response.text)

    papers = []

    for article in root.findall(".//PubmedArticle"):

        title_element = article.find(".//ArticleTitle")

        abstract_element = article.find(".//AbstractText")

        title = (
            title_element.text
            if title_element is not None
            else "No Title"
        )

        abstract = (
            abstract_element.text
            if abstract_element is not None
            else ""
        )

        papers.append({
            "title": title,
            "abstract": abstract
        })

    return papers