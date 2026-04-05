"""
Pydantic schemas for Module 3 — Content Repurposing.
"""
from typing import Optional, List
from pydantic import BaseModel
from app.schemas.content import ContentGenerationResponse

class RepurposeRequest(BaseModel):
    brand_id: int
    transcript: str
    topic: Optional[str] = "Repurposed Content"
    brand_name: Optional[str] = None
    industry: Optional[str] = None
    audience: Optional[str] = None
    tones: Optional[list[str]] = None
    keywords_include: Optional[list[str]] = None
    keywords_avoid: Optional[list[str]] = None
    campaign_goal: Optional[str] = None
    platforms: Optional[list[str]] = None


class RepurposeExtraction(BaseModel):
    main_thesis: str
    key_insights: List[str]
    memorable_quotes: List[str]
    call_to_action_ideas: List[str]


class RepurposeResponse(BaseModel):
    extraction: RepurposeExtraction
    generated_content: ContentGenerationResponse
