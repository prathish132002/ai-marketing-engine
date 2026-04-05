"""
Module 4: Ad Copy & A/B Testing API Routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.ads import AdCopyRequest, AdCopyResponse
from app.services.ads_service import generate_ad_variants

router = APIRouter(prefix="/ads", tags=["ads"])

def _resolve_brand_context(req: AdCopyRequest, db: Session) -> dict:
    from app.models.brand import Brand

    brand = db.query(Brand).filter(Brand.id == req.brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail=f"Brand {req.brand_id} not found")

    return {
        "brand_name": req.brand_name or brand.name,
        "tones": req.tones or brand.tones,
        "keywords_include": req.keywords_include or brand.keywords_include,
        "keywords_avoid": req.keywords_avoid or brand.keywords_avoid,
    }

@router.post("/generate", response_model=AdCopyResponse)
def generate_ads(req: AdCopyRequest, db: Session = Depends(get_db)):
    """
    Generate 5 distinct psychological ad variants.
    """
    ctx = _resolve_brand_context(req, db)

    try:
        result = generate_ad_variants(
            platform=req.platform,
            product=req.product,
            offer=req.offer,
            **ctx,
        )
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))

    return result