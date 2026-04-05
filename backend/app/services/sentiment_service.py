"""
Sentiment Analysis Service — Module 5.
"""
from app.core.claude import call_claude
from app.core.prompts import SENTIMENT_ANALYSIS_PROMPT, sentiment_prompt
from app.schemas.sentiment import SentimentResponse

def analyze_sentiment(
    reviews_text: str,
    brand_name: str,
) -> SentimentResponse:
    
    user_prompt = sentiment_prompt(reviews_text=reviews_text, brand_name=brand_name)

    raw = call_claude(
        system_prompt=SENTIMENT_ANALYSIS_PROMPT,
        user_prompt=user_prompt,
        max_tokens=2500,
    )

    return SentimentResponse(**raw)
