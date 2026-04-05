"""
Module 5: Sentiment Analysis Route.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.sentiment import SentimentRequest, SentimentResponse
from app.services.sentiment_service import analyze_sentiment

router = APIRouter(prefix="/sentiment", tags=["sentiment"])

@router.post("/analyze", response_model=SentimentResponse)
def analyze(req: SentimentRequest, db: Session = Depends(get_db)):
    from app.models.brand import Brand

    brand = db.query(Brand).filter(Brand.id == req.brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail=f"Brand {req.brand_id} not found")

    brand_name_to_use = req.brand_name or brand.name

    try:
        result = analyze_sentiment(
            reviews_text=req.reviews_text,
            brand_name=brand_name_to_use
        )
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))

    return result