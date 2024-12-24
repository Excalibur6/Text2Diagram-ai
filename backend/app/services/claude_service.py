# app/services/claude_service.py
from anthropic import Anthropic
from app.config.settings import get_settings
from app.models.schemas import DiagramRequest
import re


class ClaudeService:
    def __init__(self):
        settings = get_settings()
        self.client = Anthropic(api_key=settings.anthropic_api_key)

    def _get_system_prompt(self, diagram_type: str) -> str:
        base_prompt = """You are an expert software architect specializing in creating diagrams.
        Always respond with valid Mermaid.js syntax.
        Only return the Mermaid code, no explanations or additional text."""

        prompts = {
            "uml": base_prompt
            + """
            Focus on creating clear UML diagrams that show:
            - Class relationships and inheritance
            - Attributes and methods
            - Proper UML notation and conventions""",
            "sequence": base_prompt
            + """
            Focus on creating sequence diagrams that show:
            - Clear actor/system interactions
            - Proper timing and order of operations
            - Message flows between components""",
            "class": base_prompt
            + """
            Focus on creating class diagrams that show:
            - Class attributes and methods
            - Relationships (inheritance, composition, aggregation)
            - Access modifiers and data types""",
            "architecture": base_prompt
            + """
            Focus on creating architecture diagrams that show:
            - System components and their relationships
            - Data flow between components
            - External systems and interfaces""",
            "flowchart": base_prompt
            + """
            Focus on creating flowcharts that show:
            - Clear process flows
            - Decision points and conditions
            - Start/end points and process steps""",
        }

        return prompts.get(diagram_type, base_prompt)

    def _extract_mermaid_code(self, response: str) -> str:
        # Look for code between mermaid tags or code blocks
        pattern = r"```mermaid\n(.*?)```"
        matches = re.findall(pattern, response, re.DOTALL)

        if matches:
            return matches[0].strip()

        # Fallback: try to find any code block
        pattern = r"```(.*?)```"
        matches = re.findall(pattern, response, re.DOTALL)

        if matches:
            return matches[0].strip()

        # If no code blocks found, return the raw response
        return response.strip()

    async def generate_diagram(self, request: DiagramRequest) -> str:
        system_prompt = self._get_system_prompt(request.diagram_type)

        user_prompt = f"""
        Create a {request.diagram_type} diagram using Mermaid.js syntax for the following requirement:
        
        {request.prompt}
        
        Additional context: {request.additional_context or 'None provided'}
        
        Requirements:
        1. Only return valid Mermaid.js code
        2. Follow best practices for {request.diagram_type} diagrams
        3. Keep the diagram clear and readable
        4. Use proper syntax and conventions
        
        Return only the Mermaid.js code without any explanations or additional text.
        """

        try:
            response = self.client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=4000,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}],
            )

            return self._extract_mermaid_code(response.content)
        except Exception as e:
            raise Exception(f"Error generating diagram: {str(e)}")
