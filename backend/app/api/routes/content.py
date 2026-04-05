"""
Module 2: Content Generation Hub — API Routes.
Routes are thin: parse request → call service → return response.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.content import (
    ContentGenerationRequest,
    ContentGenerationResponse,
    ContentRefinementRequest,
    ContentRefinementResponse,
)
from app.services.content_service import generate_content_suite, refine_content

router = APIRouter(prefix="/content", tags=["content"])


def _resolve_brand_context(req: ContentGenerationRequest, db: Session) -> dict:
    """
    Fetch brand context from DB if not provided inline.
    Falls back to inline values when provided (useful for quick testing).
    """
    from app.models.brand import Brand  # local import to avoid circular deps

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


@router.post("/generate", response_model=ContentGenerationResponse)
def generate(req: ContentGenerationRequest, db: Session = Depends(get_db)):
    """
    Generate a full content suite for a given topic.
    Fetches brand context from DB, merges with any inline overrides.
    """
    ctx = _resolve_brand_context(req, db)

    try:
        result = generate_content_suite(
            topic=req.topic,
            **ctx,
        )
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))

    return result


@router.post("/refine", response_model=ContentRefinementResponse)
def refine(req: ContentRefinementRequest):
    """
    Refine a single piece of content with a natural-language instruction.
    Does not need DB access — brand context is passed inline.
    """
    try:
        result = refine_content(
            original_copy=req.original_copy,
            refinement_instruction=req.refinement_instruction,
            brand_name=req.brand_name,
            tones=req.tones,
            platform=req.platform,
        )
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))

    return result