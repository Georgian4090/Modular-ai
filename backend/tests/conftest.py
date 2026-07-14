import os

os.environ.setdefault("OPENAI_API_KEY", "test-key-for-pytest")
os.environ.setdefault("MODEL_NAME", "gpt-4o-mini")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")
