/**
 * 赞助者名单 —— 单一事实来源。
 *
 * 新增赞助者时，在此数组追加一条记录，同时同步更新 README.md 中的赞助者表格。
 * 网站赞助页面（/sponsor）会自动读取本文件渲染名单。
 */
export interface Sponsor {
  /** 赞助者昵称 */
  name: string;
  /** 赞助金额（元） */
  amount?: number;
  /** 赞助日期，格式 YYYY-MM-DD */
  date: string;
  /** 留言（可选） */
  message?: string;
}

export const sponsors: Sponsor[] = [
  // 示例：
  // { name: '张三', amount: 50, date: '2026-09-15', message: '感谢维护中文文档！' },
];
