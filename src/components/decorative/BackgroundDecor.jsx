export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top-left sage blob */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 animate-float"
        style={{
          background: 'radial-gradient(circle, var(--color-sage-300) 0%, transparent 70%)',
        }}
      />

      {/* Top-right citrus blob */}
      <div
        className="absolute -top-20 right-10 w-72 h-72 rounded-full opacity-15 animate-float"
        style={{
          background: 'radial-gradient(circle, var(--color-citrus-300) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />

      {/* Bottom-left lavender blob */}
      <div
        className="absolute bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 animate-float"
        style={{
          background: 'radial-gradient(circle, var(--color-lavender-300) 0%, transparent 70%)',
          animationDelay: '4s',
        }}
      />

      {/* Scattered food accents */}
      <div className="absolute top-[15%] right-[8%] text-3xl opacity-10 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
        🍋
      </div>
      <div className="absolute top-[45%] left-[5%] text-2xl opacity-8 animate-bounce-gentle" style={{ animationDelay: '1.5s' }}>
        🥕
      </div>
      <div className="absolute bottom-[25%] right-[15%] text-2xl opacity-10 animate-bounce-gentle" style={{ animationDelay: '2.5s' }}>
        🍅
      </div>
      <div className="absolute top-[70%] left-[12%] text-xl opacity-8 animate-bounce-gentle" style={{ animationDelay: '3s' }}>
        🌿
      </div>
    </div>
  );
}
