FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files (copying everything in the context to /app/backend)
COPY . ./backend

# Expose port 8000
EXPOSE 8000

# Set PYTHONPATH so that 'backend' module is findable
ENV PYTHONPATH=/app

# Run uvicorn pointing to backend.main:app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
