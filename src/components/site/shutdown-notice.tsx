import Link from 'next/link';

/**
 * 全局下架通知横幅 —— 固定吸顶、不可关闭、不随滚动消失。
 * 站点将于 2026 年 9 月 30 日正式下线。
 */
export function ShutdownNotice() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-10 flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md">
      <Link
        href="/sponsor"
        className="flex items-center gap-2 px-4 text-xs sm:text-sm font-medium text-center hover:underline"
      >
        <span aria-hidden="true">⚠️</span>
        <span className="truncate">
          由于维护成本压力，本站将于 2026 年 10 月 31 日正式下线，感谢支持 · 欢迎赞助 →
        </span>
      </Link>
    </div>
  );
}
