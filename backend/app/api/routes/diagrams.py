# app/api/routes/diagrams.py
from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import DiagramRequest, DiagramResponse
from app.services.claude_service import ClaudeService

router = APIRouter()
claude_service = ClaudeService()


@router.post("/generate", response_model=DiagramResponse)
async def generate_diagram(request: DiagramRequest):
    try:
        mermaid_code = await claude_service.generate_diagram(request)
        return DiagramResponse(
            mermaid_code=mermaid_code,
            diagram_type=request.diagram_type,
            prompt=request.prompt,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
