import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Github, Star, Users, ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { sponsors } from '@/data/sponsors';

export const metadata = {
  title: '赞助支持',
  description: '支持 Temporal 中文文档站的持续运营与维护',
};

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-10 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Temporal</span>
            <span className="text-sm text-gray-500 ml-1">中文文档</span>
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 transition-colors hover:text-gray-900">
              首页
            </Link>
            <Link
              href="/docs/quickstart/what-is-temporal"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              文档
            </Link>
            <Link href="/docs/sdk/java" className="text-gray-600 transition-colors hover:text-gray-900">
              SDK
            </Link>
            <Link
              href="/docs/resources/sample-apps"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              示例
            </Link>
            <Link href="/sponsor" className="text-gray-900 transition-colors hover:text-gray-900">
              赞助
            </Link>
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/ymstar/temporal-docs-cn"
                target="_blank"
                rel="noopener noreferrer"
                title="查看源码"
              >
                <Github className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link
                href="https://docs.temporal.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4 mr-2" />
                官方文档
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative container px-4 py-20 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-pink-200 fill-pink-200" />
              <span>感谢您的支持</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              赞助支持
            </h1>
            <p className="text-xl font-light text-pink-100 mb-8">
              让 Temporal 中文文档继续走下去
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-pink-100 leading-relaxed">
              本站是个人维护的 Temporal 中文文档翻译项目，一直免费开放给中文开发者社区。
              随着访问量持续增长，Vercel 部署成本也在上涨。
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-pink-100 leading-relaxed">
              如果这个站点对您有帮助，欢迎赞助支持，让项目能持续运营和维护。
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-pink-50 text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                asChild
              >
                <Link href="#donate">
                  <Heart className="mr-2 h-5 w-5" />
                  立即赞助
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="border-2 border-white text-white hover:bg-white/10 text-base px-8 py-6 transform hover:-translate-y-1 transition-all"
                asChild
              >
                <Link
                  href="https://github.com/ymstar/temporal-docs-cn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Star className="mr-2 h-5 w-5" />
                  GitHub Star
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
      </section>

      {/* 爱发电赞助 */}
      <section className="py-20 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                爱发电赞助
              </h2>
              <p className="text-lg text-gray-600">
                点击下方按钮，通过爱发电支持本项目（支持按月持续赞助）
              </p>
            </div>

            <Card className="overflow-hidden border-2 hover:border-pink-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-full max-w-[640px] mx-auto">
                  <iframe
                    src="https://afdian.com/leaflet?slug=aimoney"
                    width="100%"
                    height="200"
                    scrolling="no"
                    frameBorder="0"
                    className="w-full"
                    title="爱发电赞助"
                  />
                </div>
                <div className="text-center mt-4">
                  <Button variant="outline" asChild>
                    <a
                      href="https://afdian.com/a/aimoney"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      前往爱发电主页
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                扫码赞助
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                微信或支付宝扫码，金额随意，每一份支持都很重要
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* 微信 */}
              <Card className="overflow-hidden border-2 hover:border-green-400 transition-colors">
                <CardHeader className="items-center text-center pb-4">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-2">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-green-600" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.47 0 9.5c0 2.212 1.17 4.193 3.002 5.553L2.5 17.5l3.9-2.1c.7.2 1.5.3 2.3.3h.2c-.1-.4-.2-.9-.2-1.3 0-3.6 3.2-6.5 7.2-6.5h.5c-.5-3.4-3.8-5.7-7.7-5.7zM5.5 7.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm6 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
                      <path d="M24 14.5c0-3.3-3.1-6-7-6s-7 2.7-7 6 3.1 6 7 6c.7 0 1.4-.1 2-.3l3 1.6-.5-2.4c1.5-1.1 2.5-2.8 2.5-4.9zm-9.5-.5c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm5 0c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">微信赞助</CardTitle>
                  <CardDescription>扫一扫，感谢支持</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                  <div className="relative w-56 h-72 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src="/wechat.png"
                      alt="微信收款码"
                      fill
                      className="object-contain"
                      sizes="224px"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 支付宝 */}
              <Card className="overflow-hidden border-2 hover:border-blue-400 transition-colors">
                <CardHeader className="items-center text-center pb-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-2">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-600" fill="currentColor">
                      <path d="M5.2 0c-2.8 0-5.2 2.4-5.2 5.2v13.6c0 2.8 2.4 5.2 5.2 5.2h13.6c2.8 0 5.2-2.4 5.2-5.2V5.2c0-2.8-2.4-5.2-5.2-5.2H5.2zm10.8 13.4c-.5-.2-1.1-.5-1.7-.7-1.3-.5-2.7-.9-4.1-.9-1.1 0-2.1.2-3 .6.4-2.1 1.6-3.6 3.2-3.6 1.5 0 2.8 1.4 3.2 3.4-.5-.1-1-.2-1.5-.2-2.8 0-5 2-5 4.5 0 1.3.6 2.4 1.5 3.2-.4.6-.6 1.3-.6 2 0 .4.1.7.2 1-1.2-.8-2-2.1-2-3.6 0-2.5 2.2-4.5 5-4.5.5 0 1 .1 1.5.2.1.5.2 1 .4 1.4-1.7.4-3 1.8-3 3.5 0 .7.2 1.3.6 1.8-.4.5-.6 1.1-.6 1.7 0 1.7 1.4 3 3.2 3 .8 0 1.5-.3 2-.7.5.4 1.2.7 2 .7 1.8 0 3.2-1.3 3.2-3 0-.6-.2-1.2-.6-1.7.4-.5.6-1.1.6-1.8 0-1.7-1.3-3.1-3-3.5.2-.4.3-.9.4-1.4.5-.1 1-.2 1.5-.2 2.8 0 5 2 5 4.5 0 1.5-.8 2.8-2 3.6.1-.3.2-.6.2-1 0-.7-.2-1.4-.6-2 .9-.8 1.5-1.9 1.5-3.2 0-2.5-2.2-4.5-5-4.5-.5 0-1 .1-1.5.2-.4-2-1.7-3.4-3.2-3.4-1.6 0-2.8 1.5-3.2 3.6.9-.4 1.9-.6 3-.6 1.4 0 2.8.4 4.1.9.6.2 1.2.5 1.7.7z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">支付宝赞助</CardTitle>
                  <CardDescription>扫一扫，感谢支持</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                  <div className="relative w-56 h-72 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src="/alipay.jpg"
                      alt="支付宝收款码"
                      fill
                      className="object-contain"
                      sizes="224px"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors List */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                赞助者名单
              </h2>
              <p className="text-xl text-gray-600">
                感谢每一位支持者的慷慨赞助
              </p>
            </div>

            {sponsors.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">赞助者</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">金额</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">日期</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-900">留言</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sponsors.map((s, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{s.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {s.amount ? `¥${s.amount}` : '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{s.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{s.message ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 px-6 rounded-xl border-2 border-dashed border-gray-200 bg-white">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  等待第一位赞助者的加入 🙏
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  赞助后您的名字将出现在这里和 GitHub README 中
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Other Ways to Contribute */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                其他支持方式
              </h2>
              <p className="text-xl text-gray-600">
                无法赞助？还有许多方式可以支持项目
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-yellow-400">
                <CardHeader>
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-2xl">GitHub Star</CardTitle>
                  <CardDescription className="text-base">
                    给项目点个 Star，让更多人发现这个中文文档站
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href="https://github.com/ymstar/temporal-docs-cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-700 font-semibold text-base inline-flex items-center group"
                  >
                    前往 Star
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-blue-400">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <Github className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">贡献翻译</CardTitle>
                  <CardDescription className="text-base">
                    提交 PR 改进翻译质量，或帮忙翻译未完成的页面
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href="https://github.com/ymstar/temporal-docs-cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold text-base inline-flex items-center group"
                  >
                    参与贡献
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-green-400">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">分享传播</CardTitle>
                  <CardDescription className="text-base">
                    把本站分享给身边使用 Temporal 的开发者朋友
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href="/docs/quickstart/what-is-temporal"
                    className="text-green-600 hover:text-green-700 font-semibold text-base inline-flex items-center group"
                  >
                    浏览文档
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <span className="text-2xl font-bold">Temporal 中文文档</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  社区维护的 Temporal 中文翻译项目，帮助中文开发者更好地理解和使用 Temporal。
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/ymstar/temporal-docs-cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="查看源码"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://community.temporal.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Users className="h-6 w-6" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">快速链接</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/docs/quickstart/what-is-temporal" className="hover:text-white transition-colors">
                      快速开始
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/develop/workflows" className="hover:text-white transition-colors">
                      开发指南
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/sdk/java" className="hover:text-white transition-colors">
                      Java SDK
                    </Link>
                  </li>
                  <li>
                    <Link href="/sponsor" className="hover:text-white transition-colors">
                      赞助支持
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">项目资源</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="https://github.com/ymstar/temporal-docs-cn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Github className="h-4 w-4" />
                      项目源码
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/ymstar/temporal-docs-cn/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Users className="h-4 w-4" />
                      问题反馈
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">官方资源</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="https://docs.temporal.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Globe className="h-4 w-4" />
                      官方文档
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/temporalio/temporal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <Github className="h-4 w-4" />
                      Temporal 官方仓库
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://temporal.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      官方网站
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2026 Temporal 中文文档 · 社区翻译项目
              </p>
              <p className="text-gray-500 text-sm">
                本文档为社区维护的中文翻译版本
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
