export function SideAction({ Icon, count = null, active = false, onClick = () => {}, label }) {
  return (
    <button onClick={onClick} title={label} className="side-action-motion flex min-w-[38px] flex-col items-center gap-1 text-[#555]">
      <span
        className={`grid h-[38px] w-[38px] min-[390px]:h-[42px] min-[390px]:w-[42px] place-items-center rounded-full transition ${
          active ? 'bg-[#f2d400]' : 'bg-[#f7f7f4] hover:bg-[#eee]'
        }`}
      >
        <Icon size={18} className="min-[390px]:h-[19px] min-[390px]:w-[19px]" />
      </span>
      {count != null && <span className="text-[9px] min-[390px]:text-[11px]">{count.toLocaleString('ru-RU')}</span>}
    </button>
  );
}
