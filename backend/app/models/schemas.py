# app/models/schemas.py
from pydantic import BaseModel
from typing import Optional, List


class DiagramRequest(BaseModel):
    prompt: str
    diagram_type: str  # e.g., "uml", "sequence", "class", "architecture", "flowchart"
    additional_context: Optional[str] = None


class DiagramResponse(BaseModel):
    mermaid_code: str
    diagram_type: str
    prompt: str
