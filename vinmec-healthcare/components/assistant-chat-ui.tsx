"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Role = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  time: string;
};

const quickPrompts = [
  "Nhắc tôi uống thuốc lúc 20:00 tối nay",
  "Tôi bị chóng mặt nhẹ thì nên làm gì?",
  "Khi nào tôi cần đi cấp cứu ngay?",
  "Tóm tắt lịch uống thuốc trong ngày giúp tôi",
];

const cannedReplies = [
  "Mình đã ghi nhận. Bạn có muốn mình tạo nhắc lịch uống thuốc lặp lại mỗi ngày không?",
  "Bạn mô tả rất rõ. Mình khuyên bạn theo dõi thêm 30 phút và ghi lại mức độ triệu chứng theo thang 1-10.",
  "Nếu có khó thở, đau ngực, nói khó hoặc lơ mơ, bạn nên đến cơ sở y tế gần nhất ngay lập tức.",
  "Mình có thể nhắc bạn theo ba mốc: sáng, chiều và tối. Bạn muốn xác nhận khung giờ cụ thể không?",
];

function nowLabel() {
  return new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return String(Date.now()) + String(Math.random()).slice(2);
}

export function AssistantChatUi() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Chào bạn, mình là Vinmec AI Assistant. Mình hỗ trợ nhắc thuốc, theo dõi triệu chứng và gợi ý bước xử lý an toàn.",
      time: nowLabel(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomAnchorRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(function () {
    return input.trim().length > 0 && !isTyping;
  }, [input, isTyping]);

  const forceScrollToBottom = () => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
    bottomAnchorRef.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    const frameId = window.requestAnimationFrame(forceScrollToBottom);
    const timeoutId = window.setTimeout(forceScrollToBottom, 120);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [messages, isTyping]);

  const sendMessage = (content: string) => {
    const safeContent = content.trim();
    if (!safeContent || isTyping) return;

    setMessages(function (prev) {
      return prev.concat({
        id: createId(),
        role: "user",
        content: safeContent,
        time: nowLabel(),
      });
    });
    setInput("");
    setIsTyping(true);

    window.setTimeout(function () {
      const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
      setMessages(function (prev) {
        return prev.concat({
          id: createId(),
          role: "assistant",
          content: reply,
          time: nowLabel(),
        });
      });
      setIsTyping(false);
    }, 850);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[1fr_1.6fr]">
      <aside className="glass-panel animate-in p-5 sm:p-6 lg:sticky lg:top-24 lg:h-fit">
        <p className="eyebrow">Kênh hỗ trợ cá nhân</p>
        <h1 className="serif-title mt-2 text-2xl leading-tight text-[var(--color-primary-deep)] sm:text-3xl">
          Trò chuyện với AI Assistant
        </h1>
        <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">
          Mục tiêu của trợ lý là giúp bạn hiểu nhanh việc cần làm, ưu tiên an toàn,
          và giảm cảm giác quá tải khi theo dõi điều trị tại nhà.
        </p>

        <div className="mt-5 rounded-2xl border border-emerald-900/10 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
            Gợi ý nhanh
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Nhờ nhắc thuốc đúng giờ theo toa</li>
            <li>Mô tả triệu chứng để nhận hướng dẫn bước đầu</li>
            <li>Hỏi dấu hiệu nào cần đến cơ sở y tế ngay</li>
          </ul>
        </div>
      </aside>

      <div className="glass-panel animate-in relative flex h-[calc(100vh-7.5rem)] min-h-[70vh] min-w-0 flex-col overflow-hidden [animation-delay:120ms]">
        <div className="border-b border-emerald-900/10 bg-white px-4 py-3 sm:px-5">
          <p className="text-sm font-semibold text-[var(--color-primary-deep)]">
            Hội thoại hiện tại
          </p>
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,#f8fcf9_0%,#f0f7f3_46%,#f8fcf9_100%)] p-4 sm:p-5"
        >
          {messages.map((message) => {
            const isUser = message.role === "user";
            const wrapper = ["flex", isUser ? "justify-end" : "justify-start"].join(" ");
            const bubble = [
              "max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[72%]",
              isUser
                ? "bg-[var(--color-primary)] text-white"
                : "border border-emerald-900/10 bg-white text-slate-800",
            ].join(" ");
            const timeClass = ["mt-1 text-[11px]", isUser ? "text-emerald-100" : "text-slate-400"].join(" ");

            return (
              <div key={message.id} className={wrapper}>
                <div className={bubble}>
                  <p>{message.content}</p>
                  <p className={timeClass}>{message.time}</p>
                </div>
              </div>
            );
          })}

          {isTyping ? (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-emerald-900/10 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm">
                Trợ lý đang soạn câu trả lời...
              </div>
            </div>
          ) : null}
          <div ref={bottomAnchorRef} />
        </div>

        <div className="border-t border-emerald-900/10 bg-white/95 p-3 backdrop-blur-sm sm:p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                disabled={isTyping}
                className="rounded-full border border-emerald-900/15 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              aria-label="Nội dung câu hỏi"
              className="h-11 flex-1 rounded-2xl border border-emerald-900/20 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="h-11 rounded-2xl bg-[var(--color-primary)] px-5 text-sm font-semibold text-white transition hover:opacity-90 focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
