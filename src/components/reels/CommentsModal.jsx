import { Send, X } from 'lucide-react';
import { useState } from 'react';

export function CommentsModal({ item, onClose, onOpenAuthor }) {
  const [text, setText] = useState('');
  const [comments, setComments] = useState(item.commentsList);

  const submitComment = (event) => {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;

    setComments((current) => [...current, ['Вы', value, 'сейчас']]);
    setText('');
  };

  return (
    <div
      className="modal-backdrop-enter fixed inset-0 z-[80] flex items-end justify-center bg-black/35 md:items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="modal-panel-enter modal-safe-panel max-h-[88dvh] w-full max-w-[430px] overflow-hidden rounded-t-[22px] bg-white p-3 min-[390px]:p-4 md:rounded-[22px]"
      >
        <div className="flex items-center justify-between border-b pb-3">
          <b>Комментарии · {item.comments}</b>
          <button type="button" onClick={onClose} aria-label="Закрыть комментарии">
            <X />
          </button>
        </div>

        <div className="max-h-[min(430px,58dvh)] space-y-5 overflow-y-auto py-5">
          {comments.map((comment, index) => {
            const isAuthor = index === 1;
            const canOpenAuthor = isAuthor && item.authorId;
            return (
              <div key={`${comment[0]}-${index}`} className="flex gap-3">
                <button
                  type="button"
                  aria-label={canOpenAuthor ? `Открыть страницу автора ${item.author}` : undefined}
                  onClick={() => canOpenAuthor && onOpenAuthor?.(item.authorId)}
                  className={canOpenAuthor ? 'h-fit transition hover:opacity-75' : 'h-fit cursor-default'}
                >
                  <img
                    src={isAuthor ? item.avatar : '/images/img-000.jpg'}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </button>
                <div>
                  <div className="text-[12px]">
                    <b>{comment[0]}</b> <span className="ml-2 text-[#999]">{comment[2]}</span>
                  </div>
                  <p className="mt-1 text-[13px]">{comment[1]}</p>
                  <button type="button" className="mt-1 text-[11px] text-[#999]">
                    Ответить
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={submitComment} className="flex gap-2 border-t pt-3">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Добавьте комментарий..."
            className="h-10 flex-1 rounded-full bg-[#f5f5f5] px-4 text-sm outline-none"
          />
          <button
            type="submit"
            aria-label="Отправить комментарий"
            className="grid h-10 w-10 place-items-center rounded-full bg-[#f2d400]"
          >
            <Send size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}
