import Link from 'next/link';
import { MessageCircle, Mail, FileText, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: '社区',
  description: '加入 Temporal 社区',
};

export default function Community() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold mb-4">社区</h1>
      <p className="text-xl text-gray-600 mb-8">
        加入全球 Temporal 开发者社区，获取帮助、分享经验和参与贡献。
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6">获取帮助</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="border-2 hover:border-blue-500 transition-colors cursor-pointer">
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Slack 社区</CardTitle>
            <CardDescription>
              加入我们的 Slack 工作空间，与数千名开发者实时交流
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="https://temporal.io/slack" target="_blank" rel="noopener noreferrer">
                加入 Slack
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-blue-500 transition-colors cursor-pointer">
          <CardHeader>
            <FileText className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Stack Overflow</CardTitle>
            <CardDescription>
              在 Stack Overflow 上提问和回答关于 Temporal 的问题
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="https://stackoverflow.com/questions/tagged/temporal" target="_blank" rel="noopener noreferrer">
                浏览问题
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-blue-500 transition-colors cursor-pointer">
          <CardHeader>
            <Mail className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>邮件列表</CardTitle>
            <CardDescription>
              订阅我们的邮件列表，获取最新动态和公告
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="https://groups.google.com/g/temporal-users" target="_blank" rel="noopener noreferrer">
                订阅邮件
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-blue-500 transition-colors cursor-pointer">
          <CardHeader>
            <Users className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>GitHub Discussions</CardTitle>
            <CardDescription>
              在 GitHub 上参与讨论，分享您的想法和经验
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="https://github.com/temporalio/temporal/discussions" target="_blank" rel="noopener noreferrer">
                参与讨论
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">贡献代码</h2>

      <Card className="my-8 bg-blue-50 border border-blue-200">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">如何贡献</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>Fork temporal/temporal 仓库</li>
            <li>创建您的特性分支</li>
            <li>编写测试确保功能正常</li>
            <li>提交 Pull Request 并描述您的改动</li>
            <li>等待社区反馈和审核</li>
          </ol>
          <Button className="mt-4" asChild>
            <Link href="/docs/resources/contributing">
              查看贡献指南
            </Link>
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold mt-12 mb-6">参与项目</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">文档翻译</CardTitle>
            <CardDescription className="text-sm">
              帮助将 Temporal 文档翻译成更多语言
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SDK 开发</CardTitle>
            <CardDescription className="text-sm">
              参与 Go、Java、Python 等 SDK 的开发
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">示例应用</CardTitle>
            <CardDescription className="text-sm">
              创建示例应用帮助其他开发者学习
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">社交媒体</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle>Twitter</CardTitle>
            <CardDescription>
              关注 @temporalio 获取最新动态和更新
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="https://twitter.com/temporalio" target="_blank" rel="noopener noreferrer">
                @temporalio
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>YouTube</CardTitle>
            <CardDescription>
              观看 Temporal 教程和会议视频
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="https://www.youtube.com/c/temporalio" target="_blank" rel="noopener noreferrer">
                <Video className="mr-2 h-4 w-4" />
                观看视频
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LinkedIn</CardTitle>
            <CardDescription>
              关注 Temporal 获取公司新闻和招聘信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="https://www.linkedin.com/company/temporal-io" target="_blank" rel="noopener noreferrer">
                关注公司
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>博客</CardTitle>
            <CardDescription>
              阅读技术博客深入了解 Temporal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="https://temporal.io/blog" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                阅读博客
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">社区活动</h2>

      <div className="space-y-4 my-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Temporal Community Meetings</CardTitle>
            <CardDescription>
              每周一次的社区会议，讨论项目进展和未来计划
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Temporal Conference</CardTitle>
            <CardDescription>
              年度 Temporal 会议，邀请行业专家分享最佳实践
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Office Hours</CardTitle>
            <CardDescription>
              定期的办公时间，直接与 Temporal 团队交流
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="my-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4">准备好加入了吗？</h3>
        <p className="text-gray-700 mb-4">
          我们欢迎任何程度的贡献者。无论您是修复一个 bug、改进文档还是分享您的使用经验，
          每个贡献都让 Temporal 社区变得更好。
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full justify-start">
            <Link href="https://temporal.io/slack" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              立即加入 Slack 社区
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full justify-start">
            <Link href="https://github.com/temporalio/temporal" target="_blank" rel="noopener noreferrer">
              访问 GitHub 仓库
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
