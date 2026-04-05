from typing import Optional, List
from pydantic import BaseModel

class SentimentRequest(BaseModel):
    brand_id: int
    reviews_text: str
    brand_name: Optional[str] = None

class ThemeItem(BaseModel):
    theme: str
    sentiment: str
    frequency: int
    example_quote: str

class TopWord(BaseModel):
    word: str
    count: int

class SentimentResponse(BaseModel):
    overall_score: float
    positive_pct: int
    neutral_pct: int
    negative_pct: int
    top_themes: List[ThemeItem]
    voice_of_customer_summary: str
    top_words: List[TopWord]
    recommendations: List[str]
