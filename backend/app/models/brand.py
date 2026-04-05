from sqlalchemy import Column, Integer, String, JSON
from app.api.deps import Base

class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    industry = Column(String)
    audience = Column(String)
    tones = Column(JSON)             # list of tone strings
    keywords_include = Column(JSON)  # list of keywords
    keywords_avoid = Column(JSON)    # list of keywords
    campaign_goal = Column(String)
    platforms = Column(JSON)         # list of platforms
