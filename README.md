# 📚 Nhóm 6 - E402 - Day 05

---

## 👥 Thành viên nhóm

1. **Phạm Minh Khang**  
   - MSSV: `2A202600417`

2. **Võ Thiên Phú**  
   - MSSV: `2A202600336`

3. **Nguyễn Anh Quân**  
   - MSSV: `2A202600132`

4. **Phan Dương Định**  
   - MSSV: `2A202600277`

5. **Đào Hồng Sơn**  
   - MSSV: `2A202600462`

6. **Phạm Đăng Phong**  
   - MSSV: `2A202600254`

---

## 📝 Ghi chú
- Nhóm: **6**
- Lớp: **E402**
- Buổi: **Day 05**

---

## 🚀 Run local

### Prerequisites
- [uv](https://github.com/astral-sh/uv) (for Backend)
- [bun](https://bun.sh/) (for Frontend)

### 1. Project structure & Env
Clone the repository and prepare your environment:
```bash
git clone <repo-url>
cd Nhom06-402-Day05

# Setup environment variables
cp .env.example .env
```
*(Update `.env` with your actual API keys and secrets)*

### 2. Run Backend
```bash
cd backend
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
# uv pip install -r requirements.txt (Assuming dependencies are specified)
# Run the FastAPI server
uvicorn main:app --reload
```

### 3. Run Frontend
```bash
cd frontend
bun install
bun run dev
```