# app/utils/error_handler.py
from fastapi import Request
from fastapi.responses import JSONResponse
from anthropic import APIError


async def error_handler(request: Request, call_next):
    try:
        return await call_next(request)
    except APIError as e:
        return JSONResponse(
            status_code=500, content={"error": "Claude API error", "detail": str(e)}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": "Internal server error", "detail": str(e)},
        )
