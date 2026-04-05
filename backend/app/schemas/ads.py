from typing import Optional, List
from pydantic import BaseModel

class AdCopyRequest(BaseModel):
    brand_id: int
    product: str
    offer: str
    platform: str = "Meta Ads"
    
    brand_name: Optional[str] = None
    tones: Optional[List[str]] = None
    keywords_include: Optional[List[str]] = None
    keywords_avoid: Optional[List[str]] = None

class AdVariant(BaseModel):
    id: str
    tone_label: str
    headline: str
    body: str
    cta: str
    status: str

class AdCopyResponse(BaseModel):
    variants: List[AdVariant]
