/**
 * EmptyState — Displays a message when there is no data.
 *
 * @param {string} icon       - Emoji or icon character
 * @param {string} title      - Heading text
 * @param {string} message    - Description text
 * @param {React.ReactNode} action - Optional CTA element
 */
export default function EmptyState({
  icon = '📦',
  title = 'Nothing here yet',
  message = '',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="text-6xl mb-5 animate-bounce-gentle">{icon}</div>
      <h3 className="text-xl font-display font-semibold text-bark-700 mb-2">
        {title}
      </h3>
      {message && (
        <p className="text-bark-400 max-w-sm text-sm leading-relaxed mb-6">
          {message}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
