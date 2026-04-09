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

## 🚀 Cách chạy project (Local)

Project hiện tại là app Next.js monolithic nằm trong thư mục `vinmec-healthcare`.

### 1. Yêu cầu môi trường
- Node.js `>= 20`
- npm / pnpm / bun (ví dụ bên dưới dùng `npm`)

### 2. Cài dependencies
```bash
cd vinmec-healthcare
npm install
```

### 3. Cấu hình môi trường
```bash
cp .env.example .env
```

Cập nhật tối thiểu trong `.env`:
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (mặc định đã có: `gpt-4o-mini`)
- `DATABASE_URL` (mặc định dùng SQLite local: `file:../../database/dev.db`)
- `CRON_SECRET` (dùng cho endpoint cron reset task)

### 4. Khởi tạo database (Prisma)
```bash
npm run prisma:migrate
npm run prisma:generate
```

### 5. Chạy server dev
```bash
npm run dev
```

Mở trình duyệt:
- `http://localhost:3000`

Trang chính:
- Chat: `/chat`
- Today tasks: `/today`

### 6. Cron reset task theo ngày (tuỳ chọn)
Hệ thống đã có cơ chế reset task qua ngày trong server.  
Bạn cũng có thể trigger thủ công:

```bash
curl -X POST "http://localhost:3000/api/cron/daily-task-reset" \
  -H "Authorization: Bearer <CRON_SECRET>"
```
