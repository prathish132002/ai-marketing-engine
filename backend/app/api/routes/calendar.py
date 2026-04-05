"""
Module 6: Content Calendar Route.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.calendar import CalendarRequest, CalendarResponse
from app.services.calendar_service import generate_calendar

router = APIRouter(prefix="/calendar", tags=["calendar"])

@router.post("/generate", response_model=CalendarResponse)
def generate(req: CalendarRequest, db: Session = Depends(get_db)):
    from app.models.brand import Brand

    brand = db.query(Brand).filter(Brand.id == req.brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail=f"Brand {req.brand_id} not found")

    brand_name_to_use = req.brand_name or brand.name
    platforms_to_use = req.platforms or brand.platforms
    campaign_goal_to_use = req.campaign_goal or brand.campaign_goal

    try:
        result = generate_calendar(
            brand_name=brand_name_to_use,
            platforms=platforms_to_use,
            campaign_goal=campaign_goal_to_use,
            month=req.month
        )
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))

    return result