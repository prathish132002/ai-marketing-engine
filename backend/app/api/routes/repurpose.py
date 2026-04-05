"""
Module 3: Content Repurposing API Routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.repurpose import RepurposeRequest, RepurposeResponse
from app.services.repurpose_service import process_transcript

router = APIRouter(prefix="/repurpose", tags=["repurpose"])

def _resolve_brand_context(req: RepurposeRequest, db: Session) -> dict:
    from app.models.brand import Brand

    brand = db.query(Brand).filter(Brand.id == req.brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail=f"Brand {req.brand_id} not found")

    return {
        "brand_name": req.brand_name or brand.name,
        "industry": req.industry or brand.industry,
        "audience": req.audience or brand.audience,
        "tones": req.tones or brand.tones,
        "keywords_include": req.keywords_include or brand.keywords_include,
        "keywords_avoid": req.keywords_avoid or brand.keywords_avoid,
        "campaign_goal": req.campaign_goal or brand.campaign_goal,
        "platforms": req.platforms or brand.platforms,
    }

@router.post("/", response_model=RepurposeResponse)
def repurpose(req: RepurposeRequest, db: Session = Depends(get_db)):
    """
    Generate extracted insights and a full content suite from a raw transcript.
    Fetches brand context from DB, merges with any inline overrides.
    """
    ctx = _resolve_brand_context(req, db)

    try:
        result = process_transcript(
            transcript=req.transcript,
            topic=req.topic,
            **ctx,
        )
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))

    return result