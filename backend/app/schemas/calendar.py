from typing import Optional, List
from pydantic import BaseModel

class CalendarRequest(BaseModel):
    brand_id: int
    month: str
    brand_name: Optional[str] = None
    platforms: Optional[List[str]] = None
    campaign_goal: Optional[str] = None

class CalendarSuggestionItem(BaseModel):
    day: int
    platform: str
    content_type: str
    topic: str
    best_time: str

class CalendarResponse(BaseModel):
    suggestions: List[CalendarSuggestionItem]
