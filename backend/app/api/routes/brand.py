from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.brand import Brand
from app.schemas.brand import BrandCreate, BrandResponse

router = APIRouter(prefix="/brand", tags=["brand"])

@router.post("/", response_model=BrandResponse)
def create_or_update_brand(brand_in: BrandCreate, db: Session = Depends(get_db)):
    # To keep it simple, we just create a new brand profile each save for this demo
    db_brand = Brand(
        name=brand_in.name,
        industry=brand_in.industry,
        audience=brand_in.audience,
        tones=brand_in.tones,
        keywords_include=brand_in.keywords_include,
        keywords_avoid=brand_in.keywords_avoid,
        campaign_goal=brand_in.campaign_goal,
        platforms=brand_in.platforms
    )
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand

@router.get("/{brand_id}", response_model=BrandResponse)
def get_brand(brand_id: int, db: Session = Depends(get_db)):
    db_brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if not db_brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return db_brand