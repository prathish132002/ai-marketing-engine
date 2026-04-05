from typing import List, Optional
from pydantic import BaseModel

class BrandCreate(BaseModel):
    name: str
    industry: str
    audience: str
    tones: List[str]
    keywords_include: List[str]
    keywords_avoid: List[str]
    campaign_goal: str
    platforms: List[str]

class BrandResponse(BrandCreate):
    id: int

    class Config:
        from_attributes = True
