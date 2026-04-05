"""
Pydantic schemas for Module 2 — Content Generation Hub.
"""
from typing import Optional
from pydantic import BaseModel


# ── Request ───────────────────────────────────────────────────────────────────

class ContentGenerationRequest(BaseModel):
    brand_id: int
    topic: str
    # Brand context is fetched from DB via brand_id, but can be overridden:
    brand_name: Optional[str] = None
    industry: Optional[str] = None
    audience: Optional[str] = None
    tones: Optional[list[str]] = None
    keywords_include: Optional[list[str]] = None
    keywords_avoid: Optional[list[str]] = None
    campaign_goal: Optional[str] = None
    platforms: Optional[list[str]] = None


class ContentRefinementRequest(BaseModel):
    original_copy: str
    refinement_instruction: str
    brand_name: str
    tones: list[str]
    platform: str


# ── Sub-schemas ───────────────────────────────────────────────────────────────

class LinkedInVariant(BaseModel):
    id: str
    copy: str
    hook: str
    cta: str
    character_count: int


class LinkedInContent(BaseModel):
    variants: list[LinkedInVariant]


class InstagramContent(BaseModel):
    caption: str
    hashtags: list[str]
    character_count: int


class TwitterPost(BaseModel):
    id: str
    copy: str
    character_count: int


class TwitterContent(BaseModel):
    posts: list[TwitterPost]


class VideoScript(BaseModel):
    hook: str
    body: str
    cta: str
    full_script: str
    word_count: int


class VideoScripts(BaseModel):
    thirty_sec: VideoScript
    sixty_sec: VideoScript


class EmailNewsletter(BaseModel):
    subject_line: str
    preview_text: str
    body: str
    cta_button_text: str


class BlogSection(BaseModel):
    heading: str
    key_points: list[str]


class BlogOutline(BaseModel):
    title: str
    meta_description: str
    sections: list[BlogSection]
    estimated_word_count: int


class GoogleAd(BaseModel):
    headline_1: str
    headline_2: str
    headline_3: str
    description_1: str
    description_2: str


class SeoMeta(BaseModel):
    title: str
    meta_description: str
    focus_keyword: str
    secondary_keywords: list[str]
    og_title: str
    og_description: str


# ── Full Response ─────────────────────────────────────────────────────────────

class ContentGenerationResponse(BaseModel):
    topic: str
    brand_name: str
    linkedin: LinkedInContent
    instagram: InstagramContent
    twitter: TwitterContent
    video_scripts: VideoScripts
    email_newsletter: EmailNewsletter
    blog_outline: BlogOutline
    google_ad: GoogleAd
    seo_meta: SeoMeta


class ContentRefinementResponse(BaseModel):
    refined_copy: str
    character_count: int
    changes_made: str
